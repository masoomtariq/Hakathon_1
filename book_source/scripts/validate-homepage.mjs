#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const pagePath = path.join(process.cwd(), 'src', 'pages', 'index.tsx');
const content = fs.readFileSync(pagePath, 'utf-8');
const expected = ['Hero', 'Book Summary', 'Learning Outcomes', 'Quotes', 'Module Cards', 'Reading/Learning Path'];

let last = -1;
let missing = [];
let orderMismatchCount = 0;

for (const section of expected) {
  const at = content.indexOf(section);
  if (at === -1) {
    missing.push(section);
    continue;
  }
  if (at < last) {
    orderMismatchCount += 1;
  }
  last = at;
}

const result = {
  isValid: missing.length === 0 && orderMismatchCount === 0,
  missingSections: missing,
  orderMismatchCount,
};

console.log(JSON.stringify(result, null, 2));
if (!result.isValid) {
  process.exit(1);
}
