# Phase 0 Research — Foundation & Core Skeleton

## Research Method

This feature uses a **research-concurrent** model: implementation and verification run in parallel, with findings logged continuously and mapped to FR/SC impact.

## Decision 1: Structure Source and Derivative Strategy

- **Decision**: Treat `docs/structure.md` as canonical and generate a machine-readable derivative for tooling validation.
- **Rationale**: Keeps authoring human-friendly while enabling deterministic checks for scaffold generation and sidebar ordering.
- **Alternatives considered**:
  - Parse markdown directly each run (simpler artifacts, higher parser fragility).
  - Maintain only JSON/YAML source (better tooling, weaker author ergonomics for curriculum writers).

## Decision 2: Metadata Validation Contract

- **Decision**: Enforce required chapter frontmatter via schema-based validation during CI and local checks.
- **Rationale**: Prevents incomplete chapter metadata and ensures consistency for navigation, duration, difficulty, and code links.
- **Alternatives considered**:
  - Manual review only (low setup cost, high regression risk).
  - Partial lint rules without schema (faster start, weaker guarantees).

## Decision 3: Local Search Privacy Behavior

- **Decision**: Use local index search and enforce network-origin assertions to prove no external search calls.
- **Rationale**: Meets privacy and offline-ish usability constraints while maintaining deterministic build behavior.
- **Alternatives considered**:
  - External SaaS search (better ranking features, violates non-goal and dependency constraints).

## Decision 4: Homepage Section Contract

- **Decision**: Validate exact section order from `docs/structure.md` pre-module requirements.
- **Rationale**: Prevents UX drift and preserves onboarding flow.
- **Alternatives considered**:
  - Visual manual QA only (subjective and inconsistent).

## Decision 5: Urdu Font Verification

- **Decision**: Validate with computed-style assertions on an Urdu sample route, plus setup script idempotency.
- **Rationale**: Confirms real render behavior, not just static asset existence.
- **Alternatives considered**:
  - File-presence-only checks (insufficient for rendering regressions).

## Decision 6: Link Validation Scope

- **Decision**: Validate internal links and chapter `code_repo_url` links with retry-safe policy in CI.
- **Rationale**: Captures broken learning paths and external reference failures.
- **Alternatives considered**:
  - Internal links only (misses code-repo integrity issues).

### T014 — Link-check scope policy (US2)

Scope requirements:

- Validate all internal documentation links.
- Validate all chapter `code_repo_url` links.

Retry-safe CI policy:

- Request timeout: 10 seconds per URL.
- Retries: 2 retries on network/transient failures.
- Final status: fail if URL remains unreachable or returns persistent non-success response.

## Task Execution Evidence (Checkpoint D)

### T015 — Local-search network assertion

- Search behavior MUST produce `0` non-origin network requests during query execution.
- Assertion scope includes all requests triggered by search UI interactions.

### T016 — Dark-mode default assertion

- First page render MUST initialize in dark mode without user interaction.

### T017 — WCAG contrast route scope

- Contrast checks MUST include routes: `/`, `/docs`, and `/blog`.
- Body text contrast MUST meet WCAG AA threshold on all listed routes.

### T019 — Urdu font computed-style check

- Urdu sample route check MUST assert computed `font-family` contains `Noto Nastaliq Urdu`.
- File presence alone is insufficient for pass.

### T022 — Blog conformance check

- Blog landing MUST contain exactly three blocks: `hero`, `post_list`, `author_links`.
- Author configuration MUST include exactly two authors: user and Claude.
- Onboarding/get-started post MUST appear within the top five newest posts on `/blog`.

## Open Verification Backlog (Concurrent)

- Confirm best retry/timeout policy for external link checks in CI.
- Confirm Docusaurus build-time impact of local search indexing for course scale.
- Confirm accessibility checker thresholds and rule set for contrast gates.

## Task Execution Evidence (Checkpoint A)

### T001 — Canonical structure source confirmed

- `docs/structure.md` is authoritative for book structure and chapter sequencing.
- Any machine-readable derivative is generated from this source and treated as secondary.
- On mismatch, source precedence is enforced in favor of `docs/structure.md`.

### T009 — Structure coverage evidence artifact

Coverage evidence MUST be recorded as a structured artifact with:

- `sourceChapterCount` (total chapters derived from `docs/structure.md`)
- `generatedChapterCount` (total generated chapter pages)
- `coveragePercent` (must be 100)
- `orderingMismatches` (must be 0)
- `timestamp` and `validatorVersion`

Pass condition for US1 checkpoint:

- `sourceChapterCount == generatedChapterCount`
- `coveragePercent == 100`
- `orderingMismatches == 0`
