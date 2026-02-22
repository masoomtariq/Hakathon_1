---
id: 0019
title: add blog conformance validator
stage: green
date: 2026-02-22
surface: agent
model: GPT-5.3-Codex
feature: 001-docusaurus-core-skeleton
branch: 001-docusaurus-core-skeleton
user: masoomtariq
command: /sp.implement
labels: ["fr-013", "validation", "blog", "automation"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - book_source/package.json
 - book_source/scripts/validate-blog-conformance.mjs
 - history/prompts/001-docusaurus-core-skeleton/0019-add-blog-conformance-validator.green.prompt.md
tests:
 - npm run build
 - npm run validate:blog-conformance
---

## Prompt

Sure

## Response snapshot

Added a dedicated FR-013 validator (`validate:blog-conformance`) that enforces exactly three blog landing blocks (`hero`, `post_list`, `author_links`), exactly two author keys (`user`, `claude`), and onboarding/get-started discoverability in top five newest posts.

## Outcome

- ✅ Impact: FR-013 is now continuously enforceable through an explicit automated validator command.
- 🧪 Tests: Validator passed with expected block order, author set, and onboarding visibility marker.
- 📁 Files: Added one validation script and wired npm scripts.
- 🔁 Next prompts: Optionally run full `npm run validate:all` for one-shot release-gate snapshot.
- 🧠 Reflection: Converting manual grep checks into a script reduces drift and makes CI integration straightforward.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): FR-013 conformance validator PASS.
- Prompt variant (if applicable): fr013-validator-v1
- Next experiment (smallest change to try): Add validator call to CI workflow for per-PR enforcement.
