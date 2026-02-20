---
id: 0003
title: Switch deployment to vercel and hf spaces
stage: constitution
date: 2026-02-19
surface: agent
model: GPT-5.3-Codex
feature: none
branch: main
user: codespace
command: /sp.constitution
labels: ["constitution","deployment","vercel","hugging-face-spaces"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - .specify/templates/plan-template.md
 - history/prompts/constitution/0003-switch-deployment-to-vercel-and-hf-spaces.constitution.prompt.md
tests:
 - grep search for residual GitHub Pages references in .specify/**
---

## Prompt

Review my Constitution at .specify/memory/constitution.md and improve/Modify it (Specificially "### IX") as:
The Deployment of book should be on vercel instead of github Pages and the backend/Chatbot on the Hugging face spaces

## Response snapshot

Updated Constitution Principle IX to set deployment targets as Vercel for textbook frontend and Hugging Face Spaces for backend/chatbot, updated deployment quality gate accordingly, and aligned plan template constitution check text to match. Bumped constitution version from 1.1.0 to 1.1.1.

## Outcome

- ✅ Impact: Deployment architecture policy now matches requested hosting platforms and remains enforceable in planning checks.
- 🧪 Tests: Verified no remaining GitHub Pages references under .specify after patch.
- 📁 Files: Constitution and plan template updated; one PHR record created.
- 🔁 Next prompts: Optionally update specs or deployment docs to include Vercel and Hugging Face Spaces environment and rollout checklists.
- 🧠 Reflection: Policy-level deployment target changes should always be propagated to template gates to prevent drift.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): Deployment reference consistency check PASS.
- Prompt variant (if applicable): deployment-target-switch-v1
- Next experiment (smallest change to try): Add deployment runbook template for Vercel plus Hugging Face Spaces health checks.
