#!/usr/bin/env node
import {spawn, execSync} from 'node:child_process';
import {setTimeout as wait} from 'node:timers/promises';
import {chromium} from 'playwright';

const origin = 'http://127.0.0.1:4173';
const routes = ['/', '/docs/generated/pre-module/home-landing-page', '/blog'];

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

function toLinear(channel) {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance([r, g, b]) {
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function parseRgb(value) {
  const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function contrastRatio(foreground, background) {
  const l1 = luminance(foreground);
  const l2 = luminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

async function run() {
  clearPort(4173);
  const server = startServer();

  try {
    await waitForServer(origin);

    const browser = await chromium.launch({headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();

    const failures = [];
    const details = [];

    for (const route of routes) {
      await page.goto(`${origin}${route}`, {waitUntil: 'networkidle'});

      const data = await page.evaluate(() => {
        const probe = document.querySelector('main p, article p, .theme-doc-markdown p');
        if (!probe) {
          return {missing: true};
        }

        let backgroundNode = probe;
        while (backgroundNode) {
          const bg = window.getComputedStyle(backgroundNode).backgroundColor;
          if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
            return {
              missing: false,
              color: window.getComputedStyle(probe).color,
              background: bg,
            };
          }
          backgroundNode = backgroundNode.parentElement;
        }

        return {
          missing: false,
          color: window.getComputedStyle(probe).color,
          background: window.getComputedStyle(document.body).backgroundColor,
        };
      });

      if (data.missing) {
        failures.push({route, reason: 'No paragraph probe found'});
        continue;
      }

      const fg = parseRgb(data.color);
      const bg = parseRgb(data.background);
      if (!fg || !bg) {
        failures.push({route, reason: `Unable to parse colors: fg=${data.color} bg=${data.background}`});
        continue;
      }

      const ratio = contrastRatio(fg, bg);
      details.push({route, ratio: Number(ratio.toFixed(2)), fg: data.color, bg: data.background});
      if (ratio < 4.5) {
        failures.push({route, reason: `Contrast ratio ${ratio.toFixed(2)} below WCAG AA 4.5`});
      }
    }

    const result = {
      routeCount: routes.length,
      failureCount: failures.length,
      details,
      failures,
    };

    console.log(JSON.stringify(result, null, 2));

    await browser.close();

    if (failures.length > 0) {
      process.exit(1);
    }
  } finally {
    stopServer(server);
  }
}

run().catch((error) => {
  console.error(`[contrast] ${error.message}`);
  process.exit(1);
});
