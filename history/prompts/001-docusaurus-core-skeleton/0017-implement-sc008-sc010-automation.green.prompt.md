---
id: 0017
title: implement sc008 sc010 automation
stage: green
date: 2026-02-22
surface: agent
model: GPT-5.3-Codex
feature: 001-docusaurus-core-skeleton
branch: 001-docusaurus-core-skeleton
user: masoomtariq
command: /sp.implement
labels: ["validation", "sc-008", "sc-010", "playwright"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - book_source/package.json
 - book_source/scripts/validate-contrast.mjs
 - book_source/scripts/validate-urdu-font.mjs
 - history/prompts/001-docusaurus-core-skeleton/0017-implement-sc008-sc010-automation.green.prompt.md
tests:
 - npm run build:scaffold
 - npm run build
 - npm run validate:contrast
 - npm run validate:urdu-font
---

## Prompt

Now Implement the SC-008 and SC-010

## Response snapshot

Implemented SC-008 with a route-based contrast validator that serves the built site and measures body-text contrast on `/`, `/docs/generated/pre-module/home-landing-page`, and `/blog`, failing below WCAG AA ratio 4.5. Implemented SC-010 with a computed-style validator asserting `.urdu-sample` resolves to `Noto Nastaliq Urdu` in the browser.

## Outcome

- ✅ Impact: Added executable automation for two remaining onboarding/accessibility/font success criteria.
- 🧪 Tests: Contrast check passed on all three required routes; Urdu computed-style assertion passed.
- 📁 Files: Added two validator scripts and wired package commands.
- 🔁 Next prompts: Implement remaining criteria (blog three-block contract and onboarding trial evidence) and run full validation bundle.
- 🧠 Reflection: Reusing robust local-serve + Playwright patterns kept new checks deterministic and aligned with existing validators.

## Evaluation notes (flywheel)

- Failure modes observed: None in this implementation cycle.
- Graders run and results (PASS/FAIL): SC-008 PASS, SC-010 PASS.
- Prompt variant (if applicable): sc008-sc010-v1
- Next experiment (smallest change to try): Add one CI task wrapper that runs all `validate:*` checks in sequence.
