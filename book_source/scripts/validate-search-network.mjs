#!/usr/bin/env node
import {spawn, execSync} from 'node:child_process';
import {setTimeout as wait} from 'node:timers/promises';
import {chromium} from 'playwright';

const origin = 'http://127.0.0.1:4173';

async function waitForServer(url, timeoutMs = 45000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url, {method: 'GET'});
      if (response.ok) return;
    } catch {
      // keep polling
    }
    await wait(500);
  }
  throw new Error('Timed out waiting for local server');
}

function startServer() {
  const server = spawn('npm', ['run', 'serve', '--', '--port', '4173', '--host', '127.0.0.1'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: false,
    detached: true,
  });

  server.stdout.on('data', (chunk) => {
    process.stdout.write(`[serve] ${chunk}`);
  });
  server.stderr.on('data', (chunk) => {
    process.stderr.write(`[serve] ${chunk}`);
  });

  return server;
}

function clearPort(port) {
  try {
    const output = execSync(`lsof -ti tcp:${port}`).toString().trim();
    if (!output) return;
    for (const pid of output.split(/\s+/)) {
      try {
        process.kill(Number(pid), 'SIGTERM');
      } catch {
        // ignore
      }
    }
  } catch {
    // no process bound to port
  }
}

function stopServer(server) {
  if (!server || server.killed) return;
  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch {
    // ignore
  }
}

async function run() {
  clearPort(4173);
  const server = startServer();
  try {
    await waitForServer(origin);

    const browser = await chromium.launch({headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();

    const nonOriginRequests = new Set();
    page.on('request', (request) => {
      const url = request.url();
      if (url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('about:')) {
        return;
      }
      if (!url.startsWith(origin)) {
        nonOriginRequests.add(url);
      }
    });

    await page.goto(`${origin}/docs/generated/pre-module/home-landing-page`, {waitUntil: 'networkidle'});

    const input = page.locator('.navbar__search-input');
    await input.first().fill('robot');
    await page.keyboard.press('Enter');
    await wait(1500);

    const result = {
      nonOriginRequestCount: nonOriginRequests.size,
      nonOriginRequests: [...nonOriginRequests],
    };

    console.log(JSON.stringify(result, null, 2));

    await browser.close();

    if (result.nonOriginRequestCount > 0) {
      process.exit(1);
    }
  } finally {
    stopServer(server);
  }
}

run().catch((error) => {
  console.error(`[search-network] ${error.message}`);
  process.exit(1);
});
