<!--
Sync Impact Report
- Version change: 1.1.1 -> 1.2.0
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
	- updated -> II measurable writing/tone quality thresholds
	- updated -> III curriculum-bound completeness via docs/curriculum.md
	- updated -> IX measurable chatbot accuracy target
	- added -> X. Verifiable Information and Citation Accuracy
- Added sections:
	- Additional Constraints
	- Delivery Workflow and Quality Gates
	- Editorial and Evidence Standards
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
and references that can be validated by automated checks.
Writing quality MUST satisfy all thresholds:
- Flesch-Kincaid grade level between 10 and 12 for explanatory prose.
- Active voice in >= 75% of instructional sentences.
- Sentences longer than 25 words MUST be <= 10% of total sentences.
Rationale: consistent content shape and measurable readability enable objective quality gates.

### III. Mandatory Curriculum Coverage Completeness
The textbook and chatbot context MUST comprehensively cover required modules: ROS 2,
Gazebo or Unity simulation workflows, NVIDIA Isaac tooling, Vision-Language-Action models,
weekly learning breakdowns, and formal assessments.
"Comprehensive" coverage is defined as explicit alignment to learning objectives in
`docs/curriculum.md`, with at least one demonstrable practical example and one assessment-linked
exercise per objective. Specifications MUST include explicit coverage mapping and no module may
be omitted. Rationale: curriculum-bound traceability makes completeness objectively verifiable.

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
must be defined on first use, and instructional intent must remain explicit.
Professional tone MUST be enforced by these checks:
- No colloquialisms, slang, or informal chat phrases in instructional text.
- 0 undefined technical terms on first appearance.
- Formal academic register maintained across chapter narrative and assessments.
Rationale: measurable style standards strengthen pedagogical consistency and learner trust.

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
The release is successful only when the textbook frontend deploys on Vercel, and the
backend/embedded RAG chatbot deploys on Hugging Face Spaces, with answers accurate against
approved sources and bonus capabilities functional.
Each release MUST include measurable acceptance checks for deployment health, answer quality,
and bonus feature operability.
Chatbot quality gate MUST meet both:
- Grounded-answer accuracy >= 85% on the maintained evaluation set.
- Unsupported factual assertion (hallucination) rate <= 5% on the same set.
Rationale: success is defined by learner-visible outcomes and auditable chatbot quality.

### X. Verifiable Information and Citation Accuracy
All factual claims in textbook chapters MUST be supported by verifiable citations in IEEE style.
Source verification requirements:
- Every factual claim MUST have at least one reputable source.
- Safety-critical, architecture-critical, or contested claims MUST have at least two independent,
  reputable sources.
- Sources MUST be cross-checked for consistency before publication.
Rationale: citation rigor and source verification are foundational to educational credibility.

## Additional Constraints

- No unpublished or unverified source may be used as authoritative curriculum content.
- Sensitive data and secrets MUST never be committed; environment configuration MUST use
	dedicated secret management mechanisms.
- Generated educational content MUST distinguish facts, assumptions, and open questions.
- Every assessment artifact MUST include grading criteria and expected competency outcomes.

## Editorial and Evidence Standards

### Citation Accuracy
- Every factual claim MUST include an inline citation marker and bibliography entry.
- Citation pass threshold: 100% of sampled factual claims in release checkpoints have resolvable
	references.
- Citation format MUST use IEEE style consistently within each chapter.

### Source Verification
- At least 80% of core technical references per chapter MUST come from primary sources
	(official docs, peer-reviewed papers, standards, or vendor technical documentation).
- Any non-primary source MUST be labeled as secondary and not used as sole basis for safety-
	critical or architecture-critical claims.
- Safety-critical, architecture-critical, or contested claims MUST be validated using >= 2
	independent reputable sources.
- Broken-link rate in references MUST be 0% at release checkpoint.

### Writing Clarity
- Target readability for explanatory prose: Flesch-Kincaid grade band 10-12.
- Active voice target: >= 75% of instructional sentences.
- Long sentence threshold: sentences over 25 words MUST be <= 10% of chapter prose.
- Undefined jargon threshold: 0 unresolved domain terms introduced without definition on first use.

### Plagiarism and Originality
- Similarity threshold for generated chapter drafts: <= 12% excluding quoted text,
	bibliography, and standard templates.
- Direct quotations longer than 40 words MUST be explicitly quoted and cited.
- Paraphrased material MUST preserve meaning and include citation to original source.

### Review Process
- Every chapter change MUST pass a two-step review before release:
	1. Technical accuracy review (SME or maintainer)
	2. Editorial quality review (clarity, structure, and citations)
- Release gate requires both reviews marked PASS with recorded reviewer identity and date.
- Any FAIL outcome MUST include remediation tasks linked to the relevant checkpoint.

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
- Coverage gate: required curriculum modules are complete and mapped to
	`docs/curriculum.md` objectives.
- Behavior gate: chatbot handles nominal and edge-case prompts.
- Deployment gate: Vercel deployment for the book and Hugging Face Spaces deployment for
	backend/chatbot are healthy and integrated.
- Editorial and evidence gate: citation, source verification, clarity, plagiarism,
  and review standards all pass.

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

**Version**: 1.2.0 | **Ratified**: 2026-02-18 | **Last Amended**: 2026-02-19
