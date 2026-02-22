---
id: 0001
title: define core skeleton success criteria
stage: spec
date: 2026-02-21
surface: agent
model: GPT-5.3-Codex
feature: 001-docusaurus-core-skeleton
branch: 001-docusaurus-core-skeleton
user: masoomtariq
command: /sp.specify
labels: ["docusaurus", "spec", "metadata", "scaffold"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-docusaurus-core-skeleton/spec.md
 - specs/001-docusaurus-core-skeleton/checklists/requirements.md
 - history/prompts/001-docusaurus-core-skeleton/0001-define-core-skeleton-success-criteria.spec.prompt.md
tests:
 - Spec quality validation checklist completed (manual review)
 - Placeholder/clarification marker scan: pass
---

## Prompt

Initializing Book with Docusaurus Book Scaffold and Module & Chapter Metadata Support

Constraints, invariants, non-goals
Constraints
Module/chapter map is the single source of truth for generated docs and sidebar.
Docusaurus project root is book_source/.
Required implementation locations:
Search plugin config: book_source/docusaurus.config.ts
Theme overrides: book_source/src/css/custom.css
Homepage: book_source/src/pages/index.tsx
Fonts: book_source/static/fonts
Font setup script: book_source/scripts/setup-fonts.sh
Full setup script: book_source/scripts/setup.sh
Must run in Ubuntu 24.04 devcontainer and CI.
Invariants
100% chapter coverage from map.
0 broken internal links at build time.
All required frontmatter fields present for all chapters.
Dark mode is default (not optional-only).
Local (self-hosted) search is enabled; no external search SaaS dependency.
Non-goals
Final chapter writing completeness/quality.
Premium visual polish beyond defined six homepage sections.
External hosting/deployment architecture changes (unless separately scoped).
Success Criteria (measurable)
1) Docusaurus scaffold + map generation
 cd book_source && npm ci && npm run build passes on clean clone.
 100% modules/chapters from map generate markdown pages.
 Sidebar order matches map exactly (0 mismatches).
 Every chapter has required frontmatter:
title, slug, module_id, chapter_id, sidebar_position, description
difficulty, prerequisites, duration_minutes, code_repo_url
 Placeholder chapters are explicitly tagged (status: placeholder).
2) Metadata + learning assets
 Frontmatter validator fails CI for missing/invalid fields.
 At least 1 downloadable snippet or scaffold per module (or explicit none marker).
 All code_repo_url links pass link validation (0 broken).
3) Local search plugin (privacy-first)
 @easyops-cn/docusaurus-search-local configured and active in production build.
 Search index generated locally during build.
 No outbound search API calls in browser network log for search usage.
4) Dark mode default + custom theming
 Default initial theme is dark on first load.
 custom.css contains custom variable overrides (not only defaults).
 Contrast check passes for key text/background pairs (WCAG AA for body text).
5) Homepage (6 required sections)
 index.tsx includes all six sections, in order:
Hero
Book Summary
Learning Outcomes
Quotes
Module Cards
Reading/Learning Path (Roadmap, last)
 Each section renders without runtime errors in npm run start.
6) Fonts (self-hosted + Urdu support)
 Fonts exist under book_source/static/fonts:
Inter
JetBrains Mono
Noto Nastaliq Urdu
 setup-fonts.sh is executable and idempotent.
 CSS @font-face wiring works; Urdu sample text renders correctly without fallback breakage.
7) One-step setup automation
 book_source/scripts/setup.sh installs deps, runs font setup, and typecheck in one command.
 Script exits non-zero on failure and prints actionable error stage.
 Fresh contributor can run full setup in ≤15 minutes.
8) Blog customization
 Blog landing is minimal and book-theme oriented.
 Two authors configured:
User author with website + LinkedIn + GitHub + Twitter/X.
Claude author with GitHub + Claude Code docs.
 User’s onboarding/get-started post exists and is discoverable from blog index.

## Response snapshot

Created feature branch `001-docusaurus-core-skeleton`, authored a full spec with concrete constraints/invariants/non-goals, and converted all success definitions into measurable pass/fail outcomes. Added a completed specification quality checklist with no unresolved clarification markers and marked the feature ready for `/sp.clarify` or `/sp.plan`.

## Outcome

- ✅ Impact: Formalized a vague feature request into a testable, implementation-ready product specification baseline.
- 🧪 Tests: Manual spec quality checklist completed; unresolved placeholder scan passed.
- 📁 Files: 3 files created/updated in spec and prompt history paths.
- 🔁 Next prompts: `/sp.clarify` for residual ambiguity checks, then `/sp.plan` for architecture and tasks.
- 🧠 Reflection: Explicit measurable criteria prevented subjective requirements and improved planning readiness.

## Evaluation notes (flywheel)

- Failure modes observed: None in current iteration.
- Graders run and results (PASS/FAIL): Checklist validation PASS.
- Prompt variant (if applicable): baseline-v1
- Next experiment (smallest change to try): Add machine-checked schema examples for module/chapter map and frontmatter fields in planning phase.
