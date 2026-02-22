# ADR-0002: Scaffold Quality Gate Validation Strategy

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Proposed
- **Date:** 2026-02-21
- **Feature:** 001-docusaurus-core-skeleton
- **Context:** The scaffold feature spans multiple quality-critical dimensions (metadata completeness, link integrity, local-search privacy behavior, homepage structure contract, font rendering) and requires a repeatable CI/release-gate validation strategy.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

- Adopt an acceptance-based quality gate model covering SC-001 through SC-012.
- Enforce schema-driven frontmatter validation, structure parity checks, and link checks (internal + `code_repo_url`).
- Enforce behavioral checks: local-search network-origin assertions, homepage section-order contract, Urdu font computed-style checks, setup script success/failure paths.
- Apply gates on every PR and release checkpoint (MVP gate 2026-03-31).

<!-- For technology stacks, list all components:
     - Framework: Next.js 14 (App Router)
     - Styling: Tailwind CSS v3
     - Deployment: Vercel
     - State Management: React Context (start simple)
-->

## Consequences

### Positive

- Converts broad quality goals into objective pass/fail checks.
- Prevents regressions across content, UX contracts, and onboarding behavior.
- Increases confidence that generated scaffold is usable and auditable before implementation expansion.
- Creates clear ownership boundaries through validation matrix.

<!-- Example: Integrated tooling, excellent DX, fast deploys, strong TypeScript support -->

### Negative

- Higher initial test harness/setup effort across multiple validation domains.
- Longer CI pipelines due to browser and accessibility checks.
- Requires calibration for flaky external link/network conditions.

<!-- Example: Vendor lock-in to Vercel, framework coupling, learning curve -->

## Alternatives Considered

- **Alternative A: Basic build-only validation**
     - Pros: Fast CI and minimal maintenance.
     - Cons: Misses metadata, UX-contract, and privacy regressions.
     - Rejected because it cannot enforce feature acceptance criteria.

- **Alternative B: Manual QA for non-build checks**
     - Pros: Lower automation cost.
     - Cons: Subjective and inconsistent verification; poor repeatability.
     - Rejected due to scale and traceability concerns.

- **Alternative C: Partial automated checks (metadata + links only)**
     - Pros: Moderate setup with meaningful coverage.
     - Cons: Leaves homepage/font/search behavior ungoverned.
     - Rejected because cross-cutting acceptance requirements remain unverified.

<!-- Group alternatives by cluster:
     Alternative Stack A: Remix + styled-components + Cloudflare
     Alternative Stack B: Vite + vanilla CSS + AWS Amplify
     Why rejected: Less integrated, more setup complexity
-->

## References

- Feature Spec: specs/001-docusaurus-core-skeleton/spec.md
- Implementation Plan: specs/001-docusaurus-core-skeleton/plan.md
- Related ADRs: ADR-0001, ADR-0003
- Evaluator Evidence: specs/001-docusaurus-core-skeleton/research.md
