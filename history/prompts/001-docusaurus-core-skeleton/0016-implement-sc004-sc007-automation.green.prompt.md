---
id: 0016
title: implement sc004 sc007 automation
stage: green
date: 2026-02-22
surface: agent
model: GPT-5.3-Codex
feature: 001-docusaurus-core-skeleton
branch: 001-docusaurus-core-skeleton
user: masoomtariq
command: /sp.implement
labels: ["validation", "sc-004", "sc-007", "automation"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - book_source/package.json
 - book_source/scripts/validate-links.mjs
 - book_source/scripts/validate-search-network.mjs
 - book_source/scripts/generate-scaffold.mjs
 - history/prompts/001-docusaurus-core-skeleton/0016-implement-sc004-sc007-automation.green.prompt.md
tests:
 - npm run build:scaffold
 - npm run validate:links
 - npm run validate:search-network
 - npx playwright install chromium
 - apt install required chromium runtime libs
---

## Prompt

Continue now with SC-004 + SC-007 automation next

## Response snapshot

Implemented SC-004 automation via a new link validator that checks internal markdown links and chapter frontmatter `code_repo_url` reachability. Implemented SC-007 automation via a Playwright-based network assertion script that serves the built site locally, performs a search query, and fails if any non-origin request is observed.

## Outcome

- ✅ Impact: Added executable pass/fail checks for two previously missing success criteria.
- 🧪 Tests: SC-004 now reports `brokenInternalLinks: 0` and `brokenCodeRepoLinks: 0`; SC-007 now reports `nonOriginRequestCount: 0`.
- 📁 Files: Added two validator scripts and wired npm commands; hardened network-check process cleanup.
- 🔁 Next prompts: Implement SC-008 (contrast) and SC-010 computed-style assertion, then finalize remaining release-gate evidence.
- 🧠 Reflection: Runtime dependency issues were resolved by installing Chromium system libraries and removing stale-port flakiness in the validator.

## Evaluation notes (flywheel)

- Failure modes observed: Initial link checks failed due generated 404 `code_repo_url` placeholders; Playwright initially failed due missing shared libraries and stale server port conflicts.
- Graders run and results (PASS/FAIL): SC-004 PASS, SC-007 PASS.
- Prompt variant (if applicable): sc004-sc007-v1
- Next experiment (smallest change to try): Add accessibility route contrast script covering `/`, `/docs`, `/blog` to close SC-008.
