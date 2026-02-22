#!/usr/bin/env node
import {spawn, execSync} from 'node:child_process';
import {setTimeout as wait} from 'node:timers/promises';
import {chromium} from 'playwright';

const origin = 'http://127.0.0.1:4173';

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
    // ignore
  }
}

function startServer() {
  const server = spawn('npm', ['run', 'serve', '--', '--port', '4173', '--host', '127.0.0.1'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: false,
    detached: true,
  });

  server.stdout.on('data', (chunk) => process.stdout.write(`[serve] ${chunk}`));
  server.stderr.on('data', (chunk) => process.stderr.write(`[serve] ${chunk}`));

  return server;
}

function stopServer(server) {
  if (!server || server.killed) return;
  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch {
    // ignore
  }
}

async function waitForServer(url, timeoutMs = 45000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // keep waiting
    }
    await wait(500);
  }
  throw new Error('Timed out waiting for local server');
}

async function run() {
  clearPort(4173);
  const server = startServer();

  try {
    await waitForServer(origin);

    const browser = await chromium.launch({headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${origin}/`, {waitUntil: 'networkidle'});

    const result = await page.evaluate(() => {
      const sample = document.querySelector('.urdu-sample');
      if (!sample) {
        return {found: false, computedFontFamily: null, valid: false};
      }

      const computedFontFamily = window.getComputedStyle(sample).fontFamily;
      return {
        found: true,
        computedFontFamily,
        valid: computedFontFamily.toLowerCase().includes('noto nastaliq urdu'),
      };
    });

    console.log(JSON.stringify(result, null, 2));

    await browser.close();

    if (!result.found || !result.valid) {
      process.exit(1);
    }
  } finally {
    stopServer(server);
  }
}

run().catch((error) => {
  console.error(`[urdu-font] ${error.message}`);
  process.exit(1);
});
