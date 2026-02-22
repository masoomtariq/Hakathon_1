#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const moduleMapPath = path.join(process.cwd(), '.generated', 'module-map.json');
const docsRoot = path.join(process.cwd(), 'docs', 'generated');

if (!fs.existsSync(moduleMapPath)) {
  console.error('[structure] Missing module map. Run npm run build:scaffold first.');
  process.exit(1);
}

const {modules} = JSON.parse(fs.readFileSync(moduleMapPath, 'utf-8'));
const expected = modules.flatMap((moduleEntry) =>
  moduleEntry.chapters.map((chapter) => `${moduleEntry.module_id}/${chapter.chapter_id}`),
);

const observedEntries = [];
for (const moduleName of fs.readdirSync(docsRoot)) {
  const modulePath = path.join(docsRoot, moduleName);
  if (!fs.statSync(modulePath).isDirectory()) continue;
  for (const fileName of fs.readdirSync(modulePath)) {
    if (!fileName.endsWith('.md') && !fileName.endsWith('.mdx')) continue;
    const parsed = matter.read(path.join(modulePath, fileName));
    observedEntries.push({
      key: `${parsed.data.module_id}/${parsed.data.chapter_id}`,
      moduleOrder: Number(parsed.data.module_order ?? 9999),
      chapterOrder: Number(parsed.data.chapter_order ?? 9999),
    });
  }
}

const observed = observedEntries
  .sort((a, b) => (a.moduleOrder - b.moduleOrder) || (a.chapterOrder - b.chapterOrder))
  .map((entry) => entry.key);

const missing = expected.filter((value) => !observed.includes(value));
const duplicates = observed.filter((value, index) => observed.indexOf(value) !== index);

let orderingMismatches = 0;
const expectedOrder = expected.join('|');
const observedOrder = observed.join('|');
if (expectedOrder !== observedOrder) {
  orderingMismatches = 1;
}

const coveragePercent = Number(((observed.length / expected.length) * 100).toFixed(2));

console.log(JSON.stringify({
  coveragePercent,
  expectedCount: expected.length,
  observedCount: observed.length,
  orderingMismatches,
  missingCount: missing.length,
  duplicateCount: [...new Set(duplicates)].length,
}, null, 2));

if (missing.length > 0 || duplicates.length > 0 || orderingMismatches > 0 || coveragePercent !== 100) {
  process.exit(1);
}
