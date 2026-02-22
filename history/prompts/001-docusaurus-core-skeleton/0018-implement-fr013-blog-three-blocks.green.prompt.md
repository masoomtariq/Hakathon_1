---
id: 0018
title: implement fr013 blog three blocks
stage: green
date: 2026-02-22
surface: agent
model: GPT-5.3-Codex
feature: 001-docusaurus-core-skeleton
branch: 001-docusaurus-core-skeleton
user: masoomtariq
command: /sp.implement
labels: ["fr-013", "blog", "theme-override", "three-block-contract"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - book_source/src/theme/BlogListPage/index.tsx
 - history/prompts/001-docusaurus-core-skeleton/0018-implement-fr013-blog-three-blocks.green.prompt.md
tests:
 - npm run typecheck
 - npm run build
 - grep data-block markers in build/blog/index.html
 - grep onboarding_post_in_top_five in build/blog/index.html
---

## Prompt

Now proceed to FR-013

## Response snapshot

Implemented a custom BlogListPage theme override to satisfy FR-013 with exactly three blocks on `/blog`: `hero`, `post_list`, and `author_links`. The page renders top five posts and shows an onboarding visibility indicator based on a user-authored onboarding/get-started post.

## Outcome

- ✅ Impact: FR-013 blog landing contract is implemented with exact required blocks and order.
- 🧪 Tests: Typecheck/build passed; static output confirms one each of `hero`, `post_list`, and `author_links`; onboarding top-five indicator is `true`.
- 📁 Files: Added one theme override file and this PHR.
- 🔁 Next prompts: Optional dedicated FR-013 validator script and cleanup of blog warnings (tags/truncation).
- 🧠 Reflection: Theme override provided a minimal, targeted implementation without expanding scope.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): FR-013 implementation checks PASS.
- Prompt variant (if applicable): fr013-minimal-v1
- Next experiment (smallest change to try): Add `validate:blog-conformance` script to codify three-block/author/onboarding checks.
