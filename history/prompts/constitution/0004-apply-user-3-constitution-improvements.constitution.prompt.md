---
id: 0004
title: Apply user 3 constitution improvements
stage: constitution
date: 2026-02-19
surface: agent
model: GPT-5.3-Codex
feature: none
branch: main
user: codespace
command: /sp.constitution
labels: ["constitution","testability","citation","curriculum"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - .specify/templates/plan-template.md
 - .specify/templates/spec-template.md
 - history/prompts/constitution/0004-apply-user-3-constitution-improvements.constitution.prompt.md
tests:
 - grep verification of readability, citation, curriculum mapping, and chatbot quality thresholds
---

## Prompt

Now I suggest you 3 concrete Improvements at .specify/memory/constitution.md:
"""
1. Testability of Standards:
  Many of the standards, while well-intentioned, are vague and lack measurable criteria. For example:
  - "Strictly follow SDD-RI theory" (I)
  - "Ensure quality" (II)
  - "Comprehensively cover" (III)
  - "Professional and educational tone" (VI)
  - "Prioritize iterative refinement for clarity" (VII)
  - "Accurate RAG chatbot responses" (IX)

  These phrases are subjective and make it difficult to objectively verify compliance.

  2. Coverage of Essential Categories:
  Your constitution primarily focuses on development methodology and project goals. It currently lacks explicit coverage of the essential categories you
  provided:
  - Citation accuracy: Not explicitly mentioned.
  - Source verification: Not explicitly mentioned.
  - Writing clarity: Addressed generally, but could benefit from specific metrics.
  - Plagiarism checking: Not mentioned.
  - Review process: Implicit, but not a distinct, explicit standard.

  3. Realism of Standards:
  The standards themselves are generally realistic, but their enforceability is hindered by the lack of testability mentioned above. Without clear metrics, it's
   hard to determine if a standard is being met or if it's unrealistic to achieve a vague goal.

  ---
  Here are 3 concrete improvements to make your constitution.md more robust and testable:

  1. Improve Testability of Content Quality & Tone (Principles II & VI):
    - Current (II): "All book content MUST be output in clear, testable Markdown/MDX format to ensure quality and facilitate automated validation."
    - Current (VI): "The project's identity MUST maintain a professional and educational tone appropriate for an AI-native textbook."
    - Improvement: Introduce measurable metrics for writing clarity and professional tone.
        - Suggestion: Amend Principle II to include: "All book content MUST adhere to a Flesch-Kincaid grade level of 10-12, maintain an active voice in at
  least 75% of sentences, and avoid sentences exceeding 25 words by more than 10%. Content MUST also be free of colloquialisms, jargon without definition, and
  maintain a formal academic register, verifiable through linguistic analysis tools."
  2. Add Standards for Citation Accuracy and Source Verification:
    - Improvement: Introduce a new principle (e.g., after Principle II or as a sub-point under "Testable Content Output") that explicitly addresses the accuracy
   and verification of information.
        - Suggestion: Add a new principle: "X. Verifiable Information and Citation Accuracy: All factual claims within the book MUST be supported by cited,
  verifiable sources using IEEE style. All source material MUST be cross-referenced for accuracy against at least two independent, reputable sources."
  3. Define "Comprehensive" for Course Coverage (Principle III):
    - Current: "Content MUST comprehensively cover all specified course modules, including ROS 2, Gazebo/Unity, NVIDIA Isaac, VLA, weekly breakdowns, and
  assessments."
    - Improvement: "Comprehensively cover" is too vague. Link this principle to a more detailed curriculum or outline.
        - Suggestion: Amend Principle III to: "Content MUST align with the detailed curriculum outline located at docs/curriculum.md, ensuring all learning
  objectives for ROS 2, Gazebo/Unity, NVIDIA Isaac, VLA, weekly breakdowns, and assessments are met and demonstrable through accompanying practical examples and
   exercises." (Note: this assumes a docs/curriculum.md exists or will be created).
   """

## Response snapshot

Applied all three requested improvements: strengthened Principle II and VI with measurable writing and tone thresholds (Flesch-Kincaid 10-12, >=75% active voice, <=10% long sentences, no colloquialisms, zero undefined jargon), added new Principle X for IEEE citation accuracy and source verification with multi-source requirements for safety-critical/contested claims, and refined Principle III to define comprehensive coverage via explicit mapping to docs/curriculum.md objectives with demonstrable examples and assessment-linked exercises. Also added measurable chatbot quality thresholds under Principle IX and propagated enforcement checks into plan/spec templates.

## Outcome

- ✅ Impact: Constitution now converts subjective standards into auditable thresholds and objective curriculum-traceable coverage rules.
- 🧪 Tests: Searched and confirmed all key metrics and standards are present in constitution and templates.
- 📁 Files: Constitution plus plan/spec templates updated; PHR file created.
- 🔁 Next prompts: Add lightweight CI checks for readability, citation-style validation, and curriculum objective traceability.
- 🧠 Reflection: A principle is enforceable only when the same constraints appear in drafting templates and release gates.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): Policy wording consistency checks PASS.
- Prompt variant (if applicable): user-suggested-improvements-v1
- Next experiment (smallest change to try): Add PR checklist entries for each quantitative threshold so reviewers mark explicit PASS or FAIL.
