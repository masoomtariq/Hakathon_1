#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const docsRoot = path.join(process.cwd(), 'docs', 'generated');
const mdFiles = [];

if (!fs.existsSync(docsRoot)) {
  console.error('[links] Missing generated docs. Run npm run build:scaffold first.');
  process.exit(1);
}

for (const moduleName of fs.readdirSync(docsRoot)) {
  const modulePath = path.join(docsRoot, moduleName);
  if (!fs.statSync(modulePath).isDirectory()) continue;
  for (const fileName of fs.readdirSync(modulePath)) {
    if (fileName.endsWith('.md') || fileName.endsWith('.mdx')) {
      mdFiles.push(path.join(modulePath, fileName));
    }
  }
}

const slugSet = new Set();
const docsByPath = new Set(mdFiles.map((p) => p.replace(/\\/g, '/')));
const brokenInternal = [];
const brokenCodeRepo = [];

for (const filePath of mdFiles) {
  const parsed = matter.read(filePath);
  if (parsed.data.slug) {
    slugSet.add(String(parsed.data.slug));
    slugSet.add(`/docs${String(parsed.data.slug)}`);
  }
}

const linkRegex = /\[[^\]]*\]\(([^)]+)\)/g;

function isIgnoredLink(link) {
  return (
    link.startsWith('mailto:') ||
    link.startsWith('tel:') ||
    link.startsWith('#') ||
    link.startsWith('javascript:') ||
    link.startsWith('data:')
  );
}

function normalizeInternalTarget(baseFile, link) {
  const cleaned = link.split('#')[0].split('?')[0];

  if (cleaned.startsWith('/')) {
    return {type: 'route', value: cleaned};
  }

  const target = path.resolve(path.dirname(baseFile), cleaned);
  const candidates = [target, `${target}.md`, `${target}.mdx`, path.join(target, 'index.md'), path.join(target, 'index.mdx')];
  return {type: 'file', value: candidates.map((p) => p.replace(/\\/g, '/'))};
}

async function checkCodeRepo(url, filePath) {
  try {
    const response = await fetch(url, {method: 'HEAD', redirect: 'follow'});
    if (response.ok) return;

    const fallback = await fetch(url, {method: 'GET', redirect: 'follow'});
    if (!fallback.ok) {
      brokenCodeRepo.push(`${path.relative(process.cwd(), filePath)} -> ${url} (${fallback.status})`);
    }
  } catch (error) {
    brokenCodeRepo.push(`${path.relative(process.cwd(), filePath)} -> ${url} (${error.message})`);
  }
}

for (const filePath of mdFiles) {
  const parsed = matter.read(filePath);
  const body = parsed.content;

  if (parsed.data.code_repo_url) {
    await checkCodeRepo(String(parsed.data.code_repo_url), filePath);
  }

  let match;
  while ((match = linkRegex.exec(body)) !== null) {
    const link = match[1].trim();
    if (isIgnoredLink(link)) continue;

    if (/^https?:\/\//i.test(link)) {
      continue;
    }

    const normalized = normalizeInternalTarget(filePath, link);
    if (normalized.type === 'route') {
      if (!slugSet.has(normalized.value)) {
        brokenInternal.push(`${path.relative(process.cwd(), filePath)} -> ${link}`);
      }
      continue;
    }

    const exists = normalized.value.some((candidate) => docsByPath.has(candidate) || fs.existsSync(candidate));
    if (!exists) {
      brokenInternal.push(`${path.relative(process.cwd(), filePath)} -> ${link}`);
    }
  }
}

const result = {
  brokenInternalLinks: brokenInternal.length,
  brokenCodeRepoLinks: brokenCodeRepo.length,
};

console.log(JSON.stringify(result, null, 2));

if (brokenInternal.length > 0 || brokenCodeRepo.length > 0) {
  console.error('[links] Broken links detected');
  for (const item of brokenInternal) {
    console.error(`- internal: ${item}`);
  }
  for (const item of brokenCodeRepo) {
    console.error(`- code_repo_url: ${item}`);
  }
  process.exit(1);
}
