<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Modified principles:
	- placeholder principle 1 -> I. SDD-RI Primacy and P+Q+P Intelligence Accumulation
	- placeholder principle 2 -> II. Testable Markdown and MDX Output Contract
	- placeholder principle 3 -> III. Mandatory Curriculum Coverage Completeness
	- placeholder principle 4 -> IV. Atomic Tasks and Checkpoint-Gated Delivery
	- placeholder principle 5 -> V. Spec-Driven Execution and No Vibe Coding
	- placeholder principle 6 -> VI. Professional Educational Identity
	- added -> VII. Iterative Clarity and Edge-Case Behavior Guarantees
	- added -> VIII. Reusable Skills and Subagent Components
	- added -> IX. Outcome-Driven Success Criteria and Deployment Readiness
- Added sections:
	- Additional Constraints
	- Delivery Workflow and Quality Gates
- Removed sections:
	- none
- Templates requiring updates:
	- ✅ updated: .specify/templates/plan-template.md
	- ✅ updated: .specify/templates/spec-template.md
	- ✅ updated: .specify/templates/tasks-template.md
	- ⚠ pending (folder missing): .specify/templates/commands/*.md
	- ✅ reviewed (no update needed): README.md
	- ✅ reviewed (no update needed): CLAUDE.md
- Follow-up TODOs:
	- TODO(COMMAND_TEMPLATE_DIR): Create .specify/templates/commands/ and add command templates for constitution-aligned checks.
-->

# Physical AI and Humanoid Robotics AI-Textbook Constitution

## Core Principles

### I. SDD-RI Primacy and P+Q+P Intelligence Accumulation
All work MUST follow SDD-RI theory with specification primacy. Every feature, chapter,
assessment, and chatbot behavior MUST be grounded in explicit specifications before
implementation. Intelligence accumulation MUST use reusable subagents and skills through the
P+Q+P pattern: Problem framing, Question-driven validation, and Proof through verifiable
artifacts. Rationale: this preserves correctness, traceability, and repeatability.

### II. Testable Markdown and MDX Output Contract
Book content MUST be produced in clear, testable Markdown or MDX with deterministic structure.
Each module MUST include machine-checkable headings, learning outcomes, examples, exercises,
and references that can be validated by automated checks. Rationale: consistent content shape
enables tooling, quality gates, and reliable publishing.

### III. Mandatory Curriculum Coverage Completeness
The textbook and chatbot context MUST comprehensively cover required modules: ROS 2,
Gazebo or Unity simulation workflows, NVIDIA Isaac tooling, Vision-Language-Action models,
weekly learning breakdowns, and formal assessments. Specifications MUST include explicit
coverage mapping and no module may be omitted. Rationale: complete curriculum coverage is a
hard requirement for educational integrity.

### IV. Atomic Tasks and Checkpoint-Gated Delivery
Implementation MUST be decomposed into atomic, independently verifiable tasks with explicit
checkpoints. Each checkpoint MUST define pass or fail criteria and expected artifacts. Work MAY
advance only when the current checkpoint passes. Rationale: small validated increments reduce
risk and enable predictable delivery.

### V. Spec-Driven Execution and No Vibe Coding
No change may be implemented from intuition alone. Every code or content change MUST map to a
documented requirement, acceptance criterion, or approved decision. Unspecified behavior MUST
be clarified or deferred. Rationale: strict spec alignment prevents drift and hidden defects.

### VI. Professional Educational Identity
All textbook and chatbot outputs MUST maintain a professional, educational tone appropriate for
advanced learners in Physical AI and Humanoid Robotics. Explanations MUST be precise, jargon
must be defined, and instructional intent must remain explicit. Rationale: consistent identity
builds learner trust and pedagogical coherence.

### VII. Iterative Clarity and Edge-Case Behavior Guarantees
Content and chatbot behavior MUST be iterated for clarity, ambiguity reduction, and robust edge
case handling. Edge cases MUST explicitly include user-selected text queries, partial context
selection, malformed prompts, and low-context retrieval scenarios. Rationale: clarity and robust
behavior are required for safe and effective learning experiences.

### VIII. Reusable Skills and Subagent Components
The project MUST define and reuse modular skills for content generation, Urdu translation,
RAG querying, and learner personalization. Skills MUST expose clear interfaces, input-output
contracts, and evaluation criteria to support reuse across chapters and releases. Rationale:
reusable components accelerate delivery while preserving quality consistency.

### IX. Outcome-Driven Success Criteria and Deployment Readiness
The release is successful only when the textbook deploys on GitHub Pages, the embedded RAG
chatbot answers accurately against approved sources, and bonus capabilities remain functional.
Each release MUST include measurable acceptance checks for deployment health, answer quality,
and bonus feature operability. Rationale: success is defined by learner-visible outcomes.

## Additional Constraints

- No unpublished or unverified source may be used as authoritative curriculum content.
- Sensitive data and secrets MUST never be committed; environment configuration MUST use
	dedicated secret management mechanisms.
- Generated educational content MUST distinguish facts, assumptions, and open questions.
- Every assessment artifact MUST include grading criteria and expected competency outcomes.

## Delivery Workflow and Quality Gates

1. Define or update specification artifacts before implementation.
2. Derive atomic tasks with dependencies and checkpoint criteria.
3. Execute in increments with verification evidence per checkpoint.
4. Validate module coverage matrix across ROS 2, Gazebo or Unity, NVIDIA Isaac, VLA,
	 weekly plan, and assessments.
5. Validate chatbot edge-case handling, especially selected-text queries.
6. Publish only after deployment and quality gates pass.

Mandatory quality gates per increment:
- Spec traceability gate: every change references one or more requirements.
- Output contract gate: Markdown or MDX validates against expected structure.
- Coverage gate: required curriculum modules are complete.
- Behavior gate: chatbot handles nominal and edge-case prompts.
- Deployment gate: GitHub Pages build and embedded chatbot integration are healthy.

## Governance

This constitution is the highest-priority process authority for this repository. All plans,
specs, tasks, and reviews MUST demonstrate compliance.

Amendment procedure:
1. Propose change with rationale, impact analysis, and migration steps.
2. Review against current principles and identify compatibility implications.
3. Approve and record updated version and amendment date.
4. Propagate required changes to dependent templates and process docs in the same change set.

Versioning policy:
- MAJOR: incompatible governance or principle removals or redefinitions.
- MINOR: new principle or section, or materially expanded guidance.
- PATCH: clarifications and non-semantic wording improvements.

Compliance review expectations:
- Every planning artifact MUST include a constitution compliance check.
- Every execution artifact MUST include checkpoint evidence.
- Non-compliant work MUST be blocked until remediated or explicitly waived with rationale.

**Version**: 1.0.0 | **Ratified**: 2026-02-18 | **Last Amended**: 2026-02-18
