#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(process.cwd(), '..');
const bookRoot = process.cwd();
const structurePath = path.join(repoRoot, 'docs', 'structure.md');
const docsRoot = path.join(bookRoot, 'docs');
const generatedRoot = path.join(docsRoot, 'generated');
const sidebarPath = path.join(bookRoot, 'sidebars.ts');
const moduleMapPath = path.join(bookRoot, '.generated', 'module-map.json');

const requiredSection = '### 4) Course Chapter Map (Recommended)';

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function classifyChapter(title) {
  const value = title.toLowerCase();
  if (value.includes('capstone')) return 'capstone';
  if (value.includes('guided lab')) return 'lab';
  if (value.includes('assessment') || value.includes('mini-project')) return 'assessment';
  return 'chapter';
}

function parseStructure(content) {
  const lines = content.split(/\r?\n/);
  const modules = [];
  let inCourseMap = false;
  let current = null;
  let chapterCounter = 0;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.includes(requiredSection)) {
      inCourseMap = true;
      continue;
    }

    if (!inCourseMap) {
      continue;
    }

    if (line.startsWith('#### Home / Landing Page')) {
      current = {
        module_id: 'pre-module',
        module_title: 'Home / Landing Page (Pre-Module)',
        module_order: 0,
        chapters: [],
      };
      modules.push(current);
      continue;
    }

    const moduleMatch = line.match(/^#### Module\s+(\d+):\s+(.+)$/);
    if (moduleMatch) {
      current = {
        module_id: `module-${moduleMatch[1]}`,
        module_title: moduleMatch[2].trim(),
        module_order: Number(moduleMatch[1]),
        chapters: [],
      };
      modules.push(current);
      continue;
    }

    if (line.startsWith('### 5) Final Capstone')) {
      current = {
        module_id: 'module-capstone',
        module_title: 'Final Capstone',
        module_order: 5,
        chapters: [],
      };
      modules.push(current);
      continue;
    }

    const chapterMatch = line.match(/^-\s+\*\*(.+?)\*\*/);
    if (!chapterMatch || !current) {
      continue;
    }

    const chapterTitle = chapterMatch[1].trim();
    if (chapterTitle.startsWith('Section ')) {
      continue;
    }

    chapterCounter += 1;
    const chapterOrder = current.chapters.length + 1;
    const chapterSlug = slugify(chapterTitle);
    current.chapters.push({
      chapter_id: `${current.module_id}-chapter-${chapterOrder}`,
      chapter_title: chapterTitle,
      chapter_order: chapterOrder,
      slug: `/generated/${current.module_id}/${chapterSlug}`,
      type: classifyChapter(chapterTitle),
      global_order: chapterCounter,
    });
  }

  return modules.filter((module) => module.chapters.length > 0);
}

function ensureCleanGeneratedDocs() {
  fs.rmSync(generatedRoot, {recursive: true, force: true});
  fs.mkdirSync(generatedRoot, {recursive: true});
}

function writeChapterDoc(moduleEntry, chapter) {
  const moduleDir = path.join(generatedRoot, moduleEntry.module_id);
  fs.mkdirSync(moduleDir, {recursive: true});

  const filePath = path.join(moduleDir, `${chapter.chapter_order.toString().padStart(2, '0')}-${slugify(chapter.chapter_title)}.md`);
  const frontmatter = [
    '---',
    `title: "${chapter.chapter_title.replace(/"/g, '\\"')}"`,
    `slug: ${chapter.slug}`,
    `module_id: ${moduleEntry.module_id}`,
    `chapter_id: ${chapter.chapter_id}`,
    `sidebar_position: ${chapter.chapter_order}`,
    `description: "Placeholder scaffold for ${chapter.chapter_title.replace(/"/g, '\\"')}"`,
    'difficulty: intermediate',
    'prerequisites: []',
    'duration_minutes: 60',
    'code_repo_url: https://github.com/masoomtariq/Hakathon_1',
    'status: placeholder',
    `module_order: ${moduleEntry.module_order}`,
    `chapter_order: ${chapter.chapter_order}`,
    '---',
    '',
  ].join('\n');

  const content = [
    `# ${chapter.chapter_title}`,
    '',
    '## Learning Objectives',
    '- Define the scope and expected outcome for this chapter.',
    '- Connect this chapter to the larger Physical AI pathway.',
    '- Prepare implementation notes for future content expansion.',
    '',
    '## Core Content',
    'This chapter is currently scaffolded as placeholder content and will be expanded with full theory, diagrams, and implementation detail.',
    '',
    '## Practical Segment',
    'Add one practical workflow paragraph or code snippet in the full content phase.',
    '',
    '## Summary',
    'Transition to the next chapter after replacing this placeholder section with finalized content.',
    '',
  ].join('\n');

  fs.writeFileSync(filePath, `${frontmatter}${content}`, 'utf-8');

  return path.relative(bookRoot, filePath).replace(/\\/g, '/').replace(/^docs\//, '').replace(/\.md$/, '');
}

function writeSidebar(modules) {
  const sidebar = [
    "import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';",
    '',
    'const sidebars: SidebarsConfig = {',
    "  tutorialSidebar: [{type: 'autogenerated', dirName: 'generated'}],",
    '};',
    '',
    'export default sidebars;',
    '',
  ].join('\n');

  fs.writeFileSync(sidebarPath, sidebar, 'utf-8');
}

function writeModuleMap(modules) {
  const outputDir = path.dirname(moduleMapPath);
  fs.mkdirSync(outputDir, {recursive: true});
  fs.writeFileSync(moduleMapPath, JSON.stringify({modules}, null, 2), 'utf-8');
}

function main() {
  if (!fs.existsSync(structurePath)) {
    throw new Error(`Missing canonical structure source: ${structurePath}`);
  }

  const structure = fs.readFileSync(structurePath, 'utf-8');
  const modules = parseStructure(structure);

  if (modules.length === 0) {
    throw new Error('No modules were parsed from docs/structure.md.');
  }

  ensureCleanGeneratedDocs();

  for (const moduleEntry of modules) {
    for (const chapter of moduleEntry.chapters) {
      writeChapterDoc(moduleEntry, chapter);
    }
  }

  writeSidebar(modules);
  writeModuleMap(modules);

  const totalChapters = modules.reduce((acc, moduleEntry) => acc + moduleEntry.chapters.length, 0);
  console.log(`Generated ${totalChapters} chapter docs across ${modules.length} modules.`);
}

main();
