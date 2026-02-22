# Tasks: Foundation & Core Skeleton

**Input**: Design documents from [specs/001-docusaurus-core-skeleton](specs/001-docusaurus-core-skeleton)  
**Prerequisites**: [specs/001-docusaurus-core-skeleton/spec.md](specs/001-docusaurus-core-skeleton/spec.md), [specs/001-docusaurus-core-skeleton/plan.md](specs/001-docusaurus-core-skeleton/plan.md), [specs/001-docusaurus-core-skeleton/research.md](specs/001-docusaurus-core-skeleton/research.md), [specs/001-docusaurus-core-skeleton/data-model.md](specs/001-docusaurus-core-skeleton/data-model.md), [specs/001-docusaurus-core-skeleton/contracts/book-scaffold.openapi.yaml](specs/001-docusaurus-core-skeleton/contracts/book-scaffold.openapi.yaml)

## Format: `[ID] [Story] Title (Duration)`

- Every task is atomic (single verifiable outcome).
- Every task includes one acceptance criterion, dependencies, and output.
- Duration target: 15-30 minutes.

## Phase 1: Setup & Contracts (Blocking)

- [x] **T001 [SETUP] Confirm canonical structure source (20m)**
  - Acceptance: `docs/structure.md` source-of-truth rule is explicitly documented in planning artifacts.
  - Dependencies: None
  - Output: Updated note in [specs/001-docusaurus-core-skeleton/research.md](specs/001-docusaurus-core-skeleton/research.md)

- [x] **T002 [SETUP] Lock machine-readable derivative fields (25m)**
  - Acceptance: Required fields list includes `module_id`, `module_title`, `module_order`, `chapter_id`, `chapter_title`, `chapter_order`, `slug`.
  - Dependencies: T001
  - Output: Updated entity fields in [specs/001-docusaurus-core-skeleton/data-model.md](specs/001-docusaurus-core-skeleton/data-model.md)

- [x] **T003 [SETUP] Define duplicate-ID failure rule (15m)**
  - Acceptance: Duplicate module/chapter IDs are explicitly documented as hard validation failures.
  - Dependencies: T002
  - Output: Validation rule update in [specs/001-docusaurus-core-skeleton/data-model.md](specs/001-docusaurus-core-skeleton/data-model.md)

- [x] **T004 [SETUP] Define structure parity validator contract (25m)**
  - Acceptance: Contract returns coverage percentage and ordering mismatch count.
  - Dependencies: T002
  - Output: Updated endpoint/schema in [specs/001-docusaurus-core-skeleton/contracts/book-scaffold.openapi.yaml](specs/001-docusaurus-core-skeleton/contracts/book-scaffold.openapi.yaml)

- [x] **T005 [SETUP] Define frontmatter validator contract (25m)**
  - Acceptance: Contract captures missing/invalid required frontmatter fields.
  - Dependencies: T002
  - Output: Validation schema update in [specs/001-docusaurus-core-skeleton/contracts/book-scaffold.openapi.yaml](specs/001-docusaurus-core-skeleton/contracts/book-scaffold.openapi.yaml)

**Checkpoint A**: Setup complete when T001-T005 are done and consistent with FR-001..FR-005.

## Phase 2: User Story 1 — Structure-Driven Scaffold (P1)

- [x] **T006 [US1] Create structure-deriver task entry (20m)**
  - Acceptance: Task contract states derivation from `docs/structure.md` with deterministic output expectation.
  - Dependencies: T004
  - Output: Step update in [specs/001-docusaurus-core-skeleton/quickstart.md](specs/001-docusaurus-core-skeleton/quickstart.md)

- [x] **T007 [US1] Create scaffold-generation task entry (20m)**
  - Acceptance: Generation step explicitly maps each structure entry to one chapter output.
  - Dependencies: T006
  - Output: Step update in [specs/001-docusaurus-core-skeleton/quickstart.md](specs/001-docusaurus-core-skeleton/quickstart.md)

- [x] **T008 [US1] Create sidebar-order validation task entry (20m)**
  - Acceptance: Validation step explicitly checks 0 ordering mismatches vs source order.
  - Dependencies: T007
  - Output: Validation step in [specs/001-docusaurus-core-skeleton/quickstart.md](specs/001-docusaurus-core-skeleton/quickstart.md)

- [x] **T009 [US1] Define structure coverage evidence artifact (15m)**
  - Acceptance: Artifact format for 100% module/chapter coverage is documented.
  - Dependencies: T008
  - Output: Evidence note in [specs/001-docusaurus-core-skeleton/research.md](specs/001-docusaurus-core-skeleton/research.md)

**Checkpoint B**: US1 ready when T006-T009 prove SC-002 and SC-003 can be validated.

## Phase 3: User Story 2 — Metadata & Learning Assets (P1)

- [x] **T010 [US2] Lock required frontmatter field set (20m)**
  - Acceptance: Field set exactly matches FR-003 and is listed in one authoritative section.
  - Dependencies: T005
  - Output: Consolidated field set in [specs/001-docusaurus-core-skeleton/data-model.md](specs/001-docusaurus-core-skeleton/data-model.md)

- [x] **T011 [US2] Define placeholder status rule (15m)**
  - Acceptance: Placeholder pages require `status: placeholder` and failure behavior if absent.
  - Dependencies: T010
  - Output: Rule update in [specs/001-docusaurus-core-skeleton/data-model.md](specs/001-docusaurus-core-skeleton/data-model.md)

- [x] **T012 [US2] Define learning-asset minimum rule (20m)**
  - Acceptance: Rule states one asset per module OR explicit `none` marker.
  - Dependencies: T010
  - Output: LearningAsset rule update in [specs/001-docusaurus-core-skeleton/data-model.md](specs/001-docusaurus-core-skeleton/data-model.md)

- [x] **T013 [US2] Define runnable README requirement for assets (15m)**
  - Acceptance: Every asset requires a readable README path.
  - Dependencies: T012
  - Output: Validation rule update in [specs/001-docusaurus-core-skeleton/data-model.md](specs/001-docusaurus-core-skeleton/data-model.md)

- [x] **T014 [US2] Define code_repo_url link-check scope (20m)**
  - Acceptance: Link-check scope includes chapter `code_repo_url` and internal links.
  - Dependencies: T005
  - Output: Policy update in [specs/001-docusaurus-core-skeleton/research.md](specs/001-docusaurus-core-skeleton/research.md)

**Checkpoint C**: US2 ready when T010-T014 cover SC-004, SC-005, and SC-006.

## Phase 4: User Story 3 — Onboarding Experience (P2)

- [x] **T015 [US3] Define local-search network assertion (20m)**
  - Acceptance: Check requires 0 non-origin network requests for search behavior.
  - Dependencies: T004
  - Output: Validation rule in [specs/001-docusaurus-core-skeleton/research.md](specs/001-docusaurus-core-skeleton/research.md)

- [x] **T016 [US3] Define dark-mode default assertion (15m)**
  - Acceptance: Rule explicitly states first render is dark mode.
  - Dependencies: None
  - Output: Validation note in [specs/001-docusaurus-core-skeleton/research.md](specs/001-docusaurus-core-skeleton/research.md)

- [x] **T017 [US3] Define WCAG contrast route scope (20m)**
  - Acceptance: Routes `/`, `/docs`, `/blog` are required in contrast checks.
  - Dependencies: T016
  - Output: Validation note in [specs/001-docusaurus-core-skeleton/research.md](specs/001-docusaurus-core-skeleton/research.md)

- [x] **T018 [US3] Define homepage six-section order check (20m)**
  - Acceptance: Validation requires exact order: Hero, Book Summary, Learning Outcomes, Quotes, Module Cards, Reading/Learning Path.
  - Dependencies: None
  - Output: HomepageContract update in [specs/001-docusaurus-core-skeleton/data-model.md](specs/001-docusaurus-core-skeleton/data-model.md)

- [x] **T019 [US3] Define Urdu font computed-style check (20m)**
  - Acceptance: Check passes only when Urdu sample uses `Noto Nastaliq Urdu`.
  - Dependencies: None
  - Output: Validation note in [specs/001-docusaurus-core-skeleton/research.md](specs/001-docusaurus-core-skeleton/research.md)

- [x] **T020 [US3] Define setup script failure-path criteria (20m)**
  - Acceptance: Failure path requires non-zero exit and stage-specific error text.
  - Dependencies: None
  - Output: Check step in [specs/001-docusaurus-core-skeleton/quickstart.md](specs/001-docusaurus-core-skeleton/quickstart.md)

- [x] **T021 [US3] Define onboarding timing trial protocol (20m)**
  - Acceptance: Protocol requires at least two contributors and thresholds from SC-012.
  - Dependencies: T020
  - Output: Trial protocol in [specs/001-docusaurus-core-skeleton/quickstart.md](specs/001-docusaurus-core-skeleton/quickstart.md)

- [x] **T022 [US3] Define blog conformance check (25m)**
  - Acceptance: Check enforces exactly three blog blocks, two authors, and onboarding post discoverability.
  - Dependencies: T018
  - Output: Validation note in [specs/001-docusaurus-core-skeleton/research.md](specs/001-docusaurus-core-skeleton/research.md)

**Checkpoint D**: US3 ready when T015-T022 cover SC-007 through SC-012 and FR-013.

## Phase 5: Cross-Cutting Release Readiness

- [x] **T023 [CROSS] Build FR-to-SC traceability table (30m)**
  - Acceptance: Every FR-001..FR-014 maps to at least one SC and one validation method.
  - Dependencies: T009, T014, T022
  - Output: Trace table section in [specs/001-docusaurus-core-skeleton/plan.md](specs/001-docusaurus-core-skeleton/plan.md)

- [x] **T024 [CROSS] Build SC ownership checkpoint table (20m)**
  - Acceptance: Every SC row has named owner and execution frequency.
  - Dependencies: T023
  - Output: Updated validation matrix in [specs/001-docusaurus-core-skeleton/spec.md](specs/001-docusaurus-core-skeleton/spec.md)

- [x] **T025 [CROSS] Create release gate checklist (20m)**
  - Acceptance: Checklist explicitly requires SC-001..SC-012 pass by 2026-03-31.
  - Dependencies: T024
  - Output: Release checklist in [specs/001-docusaurus-core-skeleton/plan.md](specs/001-docusaurus-core-skeleton/plan.md)

**Final Checkpoint**: Task decomposition is implementation-ready when T001-T025 are reviewed and approved.

## Execution Order Summary

1. Complete Phase 1 (T001-T005).
2. Execute US1 (T006-T009), US2 (T010-T014), US3 (T015-T022) with dependency rules.
3. Complete cross-cutting release tasks (T023-T025).
4. Proceed task-by-task only after checkpoint approval.