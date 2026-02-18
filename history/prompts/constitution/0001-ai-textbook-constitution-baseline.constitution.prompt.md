---
id: 0001
title: AI textbook constitution baseline
stage: constitution
date: 2026-02-18
surface: agent
model: GPT-5.3-Codex
feature: none
branch: main
user: codespace
command: /sp.constitution
labels: ["constitution","ai-textbook","rag-chatbot","physical-ai"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - .specify/templates/plan-template.md
 - .specify/templates/spec-template.md
 - .specify/templates/tasks-template.md
 - history/prompts/constitution/0001-ai-textbook-constitution-baseline.constitution.prompt.md
tests:
 - none (documentation and template updates only)
---

## Prompt

Create a strong constitution for an AI-native textbook with (RAG chatbot embedded in the book) project on "Physical AI & Humanoid Robotics" that strictly follows these principles:

Constitution Rules:
1. Always follow SDD-RI theory : Specification primacy, accumulate intelligence via reusable subagents and skills using P+Q+P pattern.
2. For book content output in clear, testable Markdown/MDX.
3. Ensure content covers all course modules: ROS 2, Gazebo/Unity, NVIDIA Isaac, VLA, weekly breakdown, assessments.
4. Use atomic tasks, checkpoints for progress.
5. No vibe coding: Everything spec-driven.
6. Identity: Professional, educational tone for AI-native textbook.
7. Behavior: Iterate for clarity, handle edge cases like user-selected text in chatbot.
8. Reusable Components: Create skills for content generation, Urdu translation, RAG querying, personalization.
9. Success Criteria: Book deploys to GitHub Pages, chatbot answers accurately, bonuses functional.

## Response snapshot

Delivered constitution version 1.0.0 for the Physical AI and Humanoid Robotics AI-textbook project with nine strict principles aligned to SDD-RI, P+Q+P, Markdown/MDX output contract, complete curriculum coverage, atomic checkpoints, spec-driven execution, professional identity, edge-case behavior, reusable skills, and deployment-based success criteria. Updated plan/spec/tasks templates to enforce constitution checks, coverage matrix, reusable skills, and checkpointed tasking. Added a Sync Impact Report at the top of the constitution and flagged missing .specify/templates/commands directory as a follow-up TODO.

## Outcome

- ✅ Impact: Replaced placeholder constitution with enforceable governance and propagated requirements into planning templates.
- 🧪 Tests: No runtime tests required; performed placeholder/token and consistency validation.
- 📁 Files: Constitution and three core templates updated, plus PHR record created.
- 🔁 Next prompts: Create command templates directory and add constitution-compliant command guidance.
- 🧠 Reflection: Strong constitution changes are most effective when enforced by templates that gate future specs, plans, and tasks.

## Evaluation notes (flywheel)

- Failure modes observed: Missing .specify/templates/commands directory prevented command-file sync updates.
- Graders run and results (PASS/FAIL): Placeholder scan PASS; manual constitutional consistency review PASS.
- Prompt variant (if applicable): baseline-constitution-v1
- Next experiment (smallest change to try): Add command templates with constitution checks pre-wired for /sp.spec, /sp.plan, and /sp.tasks flows.
