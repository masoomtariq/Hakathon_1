# Data Model — Foundation & Core Skeleton

## Entity: StructureSource

- **Description**: Canonical authored structure in `docs/structure.md`.
- **Fields**:
  - `version` (string, optional)
  - `modules[]` (derived)
  - `global_rules[]` (derived)
- **Validation rules**:
  - Must define home/landing pre-module sections in required order.
  - Must define module and chapter sequence.

## Entity: ModuleMap (Derived)

- **Description**: Machine-readable derivative used by generation/validation tooling.
- **Fields**:
  - `module_id` (string, required, unique)
  - `module_title` (string, required)
  - `module_order` (integer, required)
  - `chapters[]` (required)
- **Validation rules**:
  - `module_order` strictly increasing.
  - No duplicate `module_id`.

## Canonical Derivative Field Contract

The machine-readable derivative from `docs/structure.md` MUST include:

- `module_id`
- `module_title`
- `module_order`
- `chapter_id`
- `chapter_title`
- `chapter_order`
- `slug`

## Duplicate-ID Failure Rule

- Duplicate `module_id` or `chapter_id` is a hard validation failure.
- Validation MUST stop with non-zero status and report conflicting IDs.

## Entity: ChapterDefinition

- **Fields**:
  - `chapter_id` (string, required, unique)
  - `chapter_title` (string, required)
  - `chapter_order` (integer, required)
  - `slug` (string, required, unique)
  - `type` (enum: chapter|lab|assessment|capstone, required)
- **Validation rules**:
  - Unique `(module_id, chapter_order)` pairs.
  - `slug` path-safe and unique.

## Entity: ChapterDoc

- **Description**: Generated markdown/MDX file in Docusaurus docs.
- **Fields (frontmatter)**:
  - `title`, `slug`, `module_id`, `chapter_id`, `sidebar_position`, `description`
  - `difficulty`, `prerequisites`, `duration_minutes`, `code_repo_url`
  - `status` (placeholder|ready)
- **Validation rules**:
  - All required fields present.
  - `duration_minutes` positive integer.
  - `code_repo_url` valid URL.

## Authoritative Required Frontmatter Set (FR-003)

The authoritative required chapter frontmatter set is:

- `title`
- `slug`
- `module_id`
- `chapter_id`
- `sidebar_position`
- `description`
- `difficulty`
- `prerequisites`
- `duration_minutes`
- `code_repo_url`

Validation policy:

- Missing any required key is a hard validation failure.
- Invalid value type/format for any required key is a hard validation failure.

## Placeholder Status Rule

- Chapters that are scaffold placeholders MUST include `status: placeholder`.
- If placeholder content is detected without `status: placeholder`, validation fails.

## Entity: LearningAsset

- **Fields**:
  - `asset_id` (string)
  - `module_id` (string)
  - `asset_type` (snippet|exercise)
  - `path` (repo-relative path)
  - `readme_path` (repo-relative path)
- **Validation rules**:
  - At least one asset per module OR explicit `none` marker.
  - Explicit none marker format is `asset_type: none` at module scope.
  - `readme_path` must exist and be readable when asset exists.
  - Missing or unreadable `readme_path` is a hard validation failure.

## Entity: HomepageContract

- **Fields**:
  - `sections[]` ordered exact values:
    1. Hero
    2. Book Summary
    3. Learning Outcomes
    4. Quotes
    5. Module Cards
    6. Reading/Learning Path
- **Validation rules**:
  - Exact order must match with `orderMismatchCount = 0`.
  - No missing required section.
  - No extra top-level section before `Reading/Learning Path`.

## Entity: AuthorProfile

- **Fields**:
  - `author_id` (user|claude)
  - `name`
  - `links` (website/social/doc refs)
- **Validation rules**:
  - Required links per spec must be present.

## State Transitions

- `ChapterDoc.status`: `placeholder` -> `ready` when required frontmatter + content checks pass.
- `ReleaseGate`: `pending` -> `pass` only when SC-001..SC-012 all pass.
