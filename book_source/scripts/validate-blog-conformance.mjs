#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const blogHtmlPath = path.join(root, 'build', 'blog', 'index.html');
const authorsPath = path.join(root, 'blog', 'authors.yml');
const blogDir = path.join(root, 'blog');

function fail(message) {
  console.error(`[blog-conformance] ${message}`);
  process.exit(1);
}

if (!fs.existsSync(blogHtmlPath)) {
  fail('Missing build/blog/index.html. Run npm run build first.');
}
if (!fs.existsSync(authorsPath)) {
  fail('Missing blog/authors.yml.');
}

const html = fs.readFileSync(blogHtmlPath, 'utf-8');
const authorsYaml = fs.readFileSync(authorsPath, 'utf-8');

const markerMatches = [...html.matchAll(/data-block="([^"]+)"/g)].map((m) => m[1]);
const expected = ['hero', 'post_list', 'author_links'];

if (markerMatches.length !== 3) {
  fail(`Expected exactly 3 block markers, found ${markerMatches.length}.`);
}
if (markerMatches.join('|') !== expected.join('|')) {
  fail(`Block order mismatch. Expected ${expected.join(' -> ')}, found ${markerMatches.join(' -> ')}.`);
}

const authorKeys = [...authorsYaml.matchAll(/^(\w+):\s*$/gm)].map((m) => m[1]);
const uniqueAuthorKeys = [...new Set(authorKeys)];
if (uniqueAuthorKeys.length !== 2 || !uniqueAuthorKeys.includes('user') || !uniqueAuthorKeys.includes('claude')) {
  fail(`Author map must contain exactly [user, claude]. Found: ${uniqueAuthorKeys.join(', ') || 'none'}.`);
}

if (!html.includes('onboarding_post_in_top_five: true')) {
  fail('Onboarding post discoverability marker is not true on /blog page.');
}

const postFiles = [];
for (const entry of fs.readdirSync(blogDir, {withFileTypes: true})) {
  if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
    postFiles.push(path.join(blogDir, entry.name));
  }
}
for (const entry of fs.readdirSync(blogDir, {withFileTypes: true})) {
  if (entry.isDirectory()) {
    const indexMd = path.join(blogDir, entry.name, 'index.md');
    const indexMdx = path.join(blogDir, entry.name, 'index.mdx');
    if (fs.existsSync(indexMd)) postFiles.push(indexMd);
    if (fs.existsSync(indexMdx)) postFiles.push(indexMdx);
  }
}

const posts = postFiles.map((filePath) => {
  const parsed = matter.read(filePath);
  const authors = Array.isArray(parsed.data.authors) ? parsed.data.authors : [parsed.data.authors].filter(Boolean);
  return {
    filePath,
    title: String(parsed.data.title ?? ''),
    slug: String(parsed.data.slug ?? ''),
    date: new Date(String(parsed.data.date ?? '1970-01-01')).getTime(),
    authors,
  };
});

const topFive = posts.sort((a, b) => b.date - a.date).slice(0, 5);
const onboardingFound = topFive.some((post) => {
  const title = post.title.toLowerCase();
  const slug = post.slug.toLowerCase();
  const hasUser = post.authors.includes('user');
  return hasUser && (title.includes('get started') || title.includes('onboarding') || slug.includes('get-started') || slug.includes('onboarding'));
});

if (!onboardingFound) {
  fail('Did not detect a user-authored onboarding/get-started post in top five newest posts.');
}

console.log(
  JSON.stringify(
    {
      blocks: markerMatches,
      authors: uniqueAuthorKeys,
      onboardingPostInTopFive: true,
      status: 'pass',
    },
    null,
    2,
  ),
);
