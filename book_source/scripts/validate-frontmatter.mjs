#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const docsRoot = path.join(process.cwd(), 'docs', 'generated');
const required = [
  'title',
  'slug',
  'module_id',
  'chapter_id',
  'sidebar_position',
  'description',
  'difficulty',
  'prerequisites',
  'duration_minutes',
  'code_repo_url',
];

if (!fs.existsSync(docsRoot)) {
  console.error('[frontmatter] Missing generated docs directory. Run npm run build:scaffold first.');
  process.exit(1);
}

const files = [];
for (const moduleName of fs.readdirSync(docsRoot)) {
  const modulePath = path.join(docsRoot, moduleName);
  if (!fs.statSync(modulePath).isDirectory()) continue;
  for (const fileName of fs.readdirSync(modulePath)) {
    if (fileName.endsWith('.md') || fileName.endsWith('.mdx')) {
      files.push(path.join(modulePath, fileName));
    }
  }
}

const errors = [];
for (const filePath of files) {
  const parsed = matter.read(filePath);
  const missing = required.filter((key) => parsed.data[key] === undefined);
  if (missing.length > 0) {
    errors.push(`${path.relative(process.cwd(), filePath)} -> missing: ${missing.join(', ')}`);
  }

  if (parsed.data.status === 'placeholder' && !String(parsed.content).toLowerCase().includes('placeholder')) {
    errors.push(`${path.relative(process.cwd(), filePath)} -> status is placeholder but body is not marked as placeholder content`);
  }
}

if (errors.length > 0) {
  console.error('[frontmatter] Validation failed');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`[frontmatter] Validation passed for ${files.length} generated chapter files.`);
