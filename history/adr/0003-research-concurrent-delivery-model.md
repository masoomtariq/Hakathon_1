# ADR-0003: Research-Concurrent Delivery Model

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Proposed
- **Date:** 2026-02-21
- **Feature:** 001-docusaurus-core-skeleton
- **Context:** The feature includes evolving technical choices (validation tools, link policies, accessibility thresholds) that need external verification. Waiting for fully upfront research delays delivery, but skipping research creates compliance and quality risk.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

- Use a phased **research-concurrent** process:
     - Phase 0 frames decision areas and initial alternatives.
     - Phase 1 and Phase 2 execute implementation planning while each task includes a verify step against external docs/knowledge sources.
     - Record findings continuously in `research.md` and tie impacts to FR/SC traceability.
- Apply blocking only for safety-critical or contract-ambiguity findings.

<!-- For technology stacks, list all components:
     - Framework: Next.js 14 (App Router)
     - Styling: Tailwind CSS v3
     - Deployment: Vercel
     - State Management: React Context (start simple)
-->

## Consequences

### Positive

- Preserves delivery momentum without sacrificing evidence quality.
- Reduces late-stage rework by validating uncertain decisions early in each slice.
- Aligns with constitution principles for P+Q+P evidence and no vibe coding.
- Supports adaptive planning as tool or dependency constraints are discovered.

<!-- Example: Integrated tooling, excellent DX, fast deploys, strong TypeScript support -->

### Negative

- Requires disciplined documentation hygiene to avoid scattered findings.
- Can increase coordination overhead if verify results arrive mid-slice.
- Risk of inconsistent depth in verification unless checklist discipline is maintained.

<!-- Example: Vendor lock-in to Vercel, framework coupling, learning curve -->

## Alternatives Considered

- **Alternative A: Front-loaded research-only phase (waterfall)**
     - Pros: High confidence before implementation.
     - Cons: Slower start; findings can become stale before execution.
     - Rejected because it delays scaffold delivery without proportional benefit.

- **Alternative B: Implement-first with minimal verification**
     - Pros: Fast initial throughput.
     - Cons: High risk of rework, policy drift, and unverifiable decisions.
     - Rejected for constitution non-compliance and quality risk.

- **Alternative C: Ad-hoc research on blockers only**
     - Pros: Low process overhead.
     - Cons: Reactive quality posture and uneven decision evidence.
     - Rejected because it weakens traceability and predictability.

<!-- Group alternatives by cluster:
     Alternative Stack A: Remix + styled-components + Cloudflare
     Alternative Stack B: Vite + vanilla CSS + AWS Amplify
     Why rejected: Less integrated, more setup complexity
-->

## References

- Feature Spec: specs/001-docusaurus-core-skeleton/spec.md
- Implementation Plan: specs/001-docusaurus-core-skeleton/plan.md
- Related ADRs: ADR-0001, ADR-0002
- Evaluator Evidence: specs/001-docusaurus-core-skeleton/research.md
