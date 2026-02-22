# ADR-0001: Structure Source and Derivation Architecture

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Proposed
- **Date:** 2026-02-21
- **Feature:** 001-docusaurus-core-skeleton
- **Context:** The book scaffold must be generated deterministically and remain aligned with authored curriculum structure while supporting automated parity checks, ordering validation, and CI enforcement.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

- Canonical structure source: `docs/structure.md`.
- Derivation model: maintain a machine-readable ModuleMap artifact derived from `docs/structure.md` for generation and validation.
- Generation pipeline: derive structure -> generate chapter docs and sidebar -> run parity checks against source.
- Governance rule: in source conflicts, `docs/structure.md` is authoritative and derivative artifacts must be regenerated.

<!-- For technology stacks, list all components:
     - Framework: Next.js 14 (App Router)
     - Styling: Tailwind CSS v3
     - Deployment: Vercel
     - State Management: React Context (start simple)
-->

## Consequences

### Positive

- Authoring remains human-friendly while tooling remains deterministic.
- Structure-to-doc and sidebar-order validators become straightforward and reliable.
- Curriculum updates can be traced from authored source to generated output.
- Reduces drift by making source precedence explicit.

<!-- Example: Integrated tooling, excellent DX, fast deploys, strong TypeScript support -->

### Negative

- Adds derivative artifact lifecycle management and regeneration overhead.
- Requires parser/deriver maintenance when structure authoring conventions evolve.
- Potential merge churn if derived artifact is committed frequently.

<!-- Example: Vendor lock-in to Vercel, framework coupling, learning curve -->

## Alternatives Considered

- **Alternative A: Parse `docs/structure.md` directly at build time only**
     - Pros: No secondary artifact to manage.
     - Cons: Higher parser fragility, harder reproducibility for validation debugging.
     - Rejected because deterministic validation and traceability are weaker.

- **Alternative B: Make JSON/YAML the only canonical source**
     - Pros: Strong tooling compatibility and strict schema validation.
     - Cons: Worse ergonomics for curriculum authors editing narrative structure.
     - Rejected because author workflow is centered on markdown structure docs.

- **Alternative C: Manual chapter and sidebar maintenance**
     - Pros: Minimal tooling investment.
     - Cons: High drift risk, low scalability, frequent ordering defects.
     - Rejected because it fails determinism and coverage guarantees.

<!-- Group alternatives by cluster:
     Alternative Stack A: Remix + styled-components + Cloudflare
     Alternative Stack B: Vite + vanilla CSS + AWS Amplify
     Why rejected: Less integrated, more setup complexity
-->

## References

- Feature Spec: specs/001-docusaurus-core-skeleton/spec.md
- Implementation Plan: specs/001-docusaurus-core-skeleton/plan.md
- Related ADRs: ADR-0002, ADR-0003
- Evaluator Evidence: history/prompts/001-docusaurus-core-skeleton/0004-create-architecture-and-validation-plan.plan.prompt.md
