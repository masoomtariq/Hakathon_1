---
id: 0002
title: Constitution testability hardening
stage: constitution
date: 2026-02-19
surface: agent
model: GPT-5.3-Codex
feature: none
branch: main
user: codespace
command: /sp.constitution
labels: ["constitution","testability","quality-gates","review-process"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - history/prompts/constitution/0002-constitution-testability-hardening.constitution.prompt.md
tests:
 - grep validation of measurable standards and version lines
---

## Prompt

Review my Constitution at .specify/memory/constitution.md and improve it:

1. Are all standards testable (not vague)?
  - ❌ Vague: "Papers should be well-written"
  - ✅ Testable: "Flesch-Kincaid grade 10-12; active voice 75%+ of time"

2. Did I cover essential categories?
  - Citation accuracy
  - Source verification
  - Writing clarity
  - Plagiarism checking
  - Review process

3. Are any standards unrealistic?

Suggest 2-3 concrete improvements.

## Response snapshot

Reviewed and improved constitution by adding a new Editorial and Evidence Standards section with measurable, testable thresholds for citation accuracy, source verification, writing clarity, plagiarism controls, and two-step review process. Updated Delivery Workflow quality gates to include editorial and evidence checks and bumped constitution version from 1.0.0 to 1.1.0 with amended date 2026-02-19.

## Outcome

- ✅ Impact: Constitution now uses quantitative thresholds and explicit pass/fail workflow for content quality and governance.
- 🧪 Tests: Validated presence of measurable standards and updated versioning markers via search checks.
- 📁 Files: One policy file updated and one PHR record created.
- 🔁 Next prompts: Optionally align spec and plan templates to include mandatory evidence-quality checkpoints.
- 🧠 Reflection: Policy language is most effective when each requirement has a clear threshold and accountable review owner.

## Evaluation notes (flywheel)

- Failure modes observed: None blocking; prior version lacked measurable constraints for editorial quality and source rigor.
- Graders run and results (PASS/FAIL): Measurability keyword/threshold checks PASS.
- Prompt variant (if applicable): constitution-testability-v1
- Next experiment (smallest change to try): Add lightweight CI check script to enforce citation and readability thresholds during PR validation.
