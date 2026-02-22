# Feature Specification: Foundation & Core Skeleton

**Feature Branch**: `001-docusaurus-core-skeleton`  
**Created**: 2026-02-21  
**Status**: Draft  
**Input**: User description: "Initializing Book with Docusaurus Book Scaffold and Module & Chapter Metadata Support"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Generate complete scaffold from structure source (Priority: P1)

As a curriculum maintainer, I can generate a static Docusaurus book where every module and chapter defined by `docs/structure.md` (or its machine-readable derivative) appears as a navigable doc page.

**Why this priority**: Without complete, map-driven generation, the project cannot guarantee curriculum coverage or reliable navigation.

**Independent Test**: Can be fully tested by running scaffold generation and checking chapter/page count and sidebar order against `docs/structure.md` (or its machine-readable derivative).

**Acceptance Scenarios**:

1. **Given** a valid structure source in `docs/structure.md` (or its machine-readable derivative), **When** scaffold generation runs, **Then** every defined module/chapter entry has exactly one corresponding chapter page.
2. **Given** generated docs, **When** sidebar output is validated, **Then** module/chapter ordering exactly matches `docs/structure.md` ordering (or its machine-readable derivative).
3. **Given** a clean environment, **When** the site is built, **Then** the build succeeds with zero broken internal links.

---

### User Story 2 - Enforce chapter metadata quality (Priority: P1)

As a content contributor, I can rely on required chapter frontmatter so every chapter has consistent planning, delivery, and code-reference metadata.

**Why this priority**: Missing metadata breaks discoverability, sequencing, and course operations.

**Independent Test**: Can be fully tested by validation rules that fail on missing or invalid frontmatter fields.

**Acceptance Scenarios**:

1. **Given** generated or edited chapters, **When** metadata validation runs, **Then** chapters missing required fields fail validation.
2. **Given** valid chapters, **When** metadata validation runs, **Then** all chapters pass with required fields populated.
3. **Given** each module, **When** learning assets are checked, **Then** at least one snippet/exercise scaffold is available or explicitly marked as none.

---

### User Story 3 - Provide onboarding-ready book experience (Priority: P2)

As a new contributor or learner, I can run one setup flow, search locally, use dark mode by default, and navigate a structured homepage/blog to start quickly.

**Why this priority**: This turns the scaffold into a usable product rather than a file dump.

**Independent Test**: Can be tested by running setup script, launching site, verifying homepage sections, local search behavior, dark-mode default, fonts, and blog author configuration.

**Acceptance Scenarios**:

1. **Given** a fresh clone, **When** setup script runs, **Then** dependencies, fonts, and type safety checks complete in one flow.
2. **Given** first page load, **When** the site renders, **Then** dark mode is the default and custom theme overrides are applied.
3. **Given** search usage, **When** a query is performed, **Then** results return from local index without outbound search API calls.

### Edge Cases

- Invalid or duplicate chapter IDs in the structure source derived from `docs/structure.md` must fail generation with actionable error output.
- Missing required frontmatter in any chapter must fail validation before merge.
- Empty module or chapter titles must be rejected as invalid input.
- Invalid `code_repo_url` values must fail link validation.
- Missing font assets or script permission issues must fail setup with clear stage-specific errors.
- Homepage section omission or order mismatch must fail a structural check.

## Curriculum Coverage Matrix *(mandatory)*

All module coverage maps to learning objectives in `docs/curriculum.md`.

| Module | In Scope (Y/N) | Spec Section | Validation Method |
|--------|-----------------|--------------|-------------------|
| ROS 2 | Y | User Story 1, FR-001 to FR-004 | Structure-to-doc parity and sidebar order checks against `docs/structure.md` |
| Gazebo or Unity | Y | User Story 1, FR-001 to FR-004 | Structure-to-doc parity and sidebar order checks against `docs/structure.md` |
| NVIDIA Isaac | Y | User Story 1, FR-001 to FR-004 | Structure-to-doc parity and sidebar order checks against `docs/structure.md` |
| Vision-Language-Action (VLA) | Y | User Story 1, FR-001 to FR-004 | Structure-to-doc parity and sidebar order checks against `docs/structure.md` |
| Weekly Breakdown | Y | User Story 1, FR-001 and FR-004 | Presence and ordering validation against `docs/structure.md` |
| Assessments | Y | User Story 1, FR-001 and FR-004 | Presence and ordering validation against `docs/structure.md` |

## Output Contract *(mandatory)*

- Generated content MUST be Markdown/MDX chapter files with deterministic heading hierarchy and stable slugs.
- Every chapter output MUST include required frontmatter for structure and planning metadata.
- Sidebar output MUST be reproducible from `docs/structure.md` (or its machine-readable derivative) with deterministic ordering.
- Placeholder chapters MUST be explicitly tagged with `status: placeholder`.
- Validation failures (metadata, links, ordering, missing pages) MUST be treated as blocking defects.

## Reusable Skills *(mandatory)*

- **Content generation skill**
  - Input contract: `docs/structure.md` (or its machine-readable derivative) and chapter template fields.
  - Output contract: generated chapter files with required frontmatter and placeholder/sample content.
  - Evaluation: 100% structure coverage from `docs/structure.md`, 0 missing required fields.
- **Urdu translation skill**
  - Input contract: chapter text segments marked for Urdu support.
  - Output contract: readable Urdu-renderable text with supported Urdu font available.
  - Evaluation: Urdu sample text renders without fallback breakage.
- **RAG querying skill**
  - Input contract: local indexed docs content for search.
  - Output contract: fast client-side result retrieval without external search provider.
  - Evaluation: local index generated and no outbound search API network traffic.
- **Personalization skill**
  - Input contract: learner navigation through modules/chapters.
  - Output contract: clear module cards and roadmap progression path on homepage.
  - Evaluation: all six required homepage sections render in required order.

## Requirements *(mandatory)*

### Constraints, Invariants, Non-goals

#### Constraints

- `docs/structure.md` is the canonical source for book structure and chapter sequencing.
- Any machine-readable module/chapter map used by tooling MUST be derived from `docs/structure.md` and MUST stay content-equivalent.
- Canonical machine-readable structure derivative MUST define at minimum: `module_id`, `module_title`, `module_order`, `chapter_id`, `chapter_title`, `chapter_order`, and `slug`.
- `module_id` and `chapter_id` MUST be globally unique; duplicate IDs in the `docs/structure.md`-derived structure are invalid input.
- Docusaurus project root is `book_source/`.
- Required implementation locations:
  - Search plugin config: `book_source/docusaurus.config.ts`
  - Theme overrides: `book_source/src/css/custom.css`
  - Homepage: `book_source/src/pages/index.tsx`
  - Fonts: `book_source/static/fonts`
  - Font setup script: `book_source/scripts/setup-fonts.sh`
  - Full setup script: `book_source/scripts/setup.sh`
- Must run in Ubuntu 24.04 devcontainer and CI.

#### Invariants

- 100% chapter coverage from `docs/structure.md` (or its machine-readable derivative).
- 0 broken internal links at build time.
- All required frontmatter fields present for all chapters.
- Dark mode is default.
- Local self-hosted search is enabled; no external search SaaS dependency.

#### Non-goals

- Final chapter writing completeness or content quality.
- Premium visual polish beyond defined six homepage sections.
- External hosting/deployment architecture changes unless separately scoped.
- Introducing full multi-language site architecture in this feature.
- Replacing or redesigning the CI platform beyond checks required for this feature.

### Functional Requirements

- **FR-001**: System MUST generate a static Docusaurus docs structure covering 100% of modules and chapters defined in `docs/structure.md` (or its machine-readable derivative).
- **FR-002**: System MUST generate deterministic navigation where sidebar ordering exactly matches `docs/structure.md` ordering (or its machine-readable derivative).
- **FR-003**: System MUST ensure every generated chapter contains required frontmatter fields: `title`, `slug`, `module_id`, `chapter_id`, `sidebar_position`, `description`, `difficulty`, `prerequisites`, `duration_minutes`, and `code_repo_url`.
- **FR-004**: System MUST generate either sample markdown content or a standardized placeholder for every chapter, with placeholders tagged as `status: placeholder`.
- **FR-005**: System MUST provide metadata validation that fails on missing or invalid required frontmatter before merge.
- **FR-006**: System MUST provide at least one downloadable code snippet or sample exercise scaffold per module, or explicitly mark the module as `none`, and each asset MUST include a runnable README.
- **FR-007**: System MUST validate all chapter `code_repo_url` values and fail validation on broken links.
- **FR-008**: System MUST configure local client-side search using `@easyops-cn/docusaurus-search-local` and avoid outbound search provider requests.
- **FR-009**: System MUST default to dark mode on first load and apply custom theming variables in `book_source/src/css/custom.css`.
- **FR-010**: System MUST implement homepage structure with six sections in this exact order: Hero, Book Summary, Learning Outcomes, Quotes, Module Cards, Reading/Learning Path (Roadmap).
- **FR-014**: System MUST enforce chapter/module structure rules from `docs/structure.md`, including required chapter blueprint ordering and module-level lab/assessment distribution requirements where applicable.
- **FR-011**: System MUST self-host Inter, JetBrains Mono, and Noto Nastaliq Urdu fonts under `book_source/static/fonts` and expose executable, idempotent font setup automation.
- **FR-012**: System MUST provide a one-step executable setup script that installs dependencies, runs font setup, and performs type safety checks, and exits non-zero on failure with actionable stage-specific error output.
- **FR-013**: System MUST provide a customized blog landing page with exactly three blocks (`hero`, `post_list`, `author_links`), configure two authors (user and Claude), and include one onboarding/get-started post by the user that appears in the blog index top five newest posts.

### Key Entities *(include if feature involves data)*

- **StructureSource**: Canonical book-structure definition in `docs/structure.md`.
- **ModuleMap**: Machine-readable derivative of `docs/structure.md` used by generation tooling, containing modules/chapters with IDs, titles, and ordering.
- **ChapterDoc**: Generated markdown/MDX chapter page with frontmatter and content body.
- **ChapterMetadata**: Required frontmatter attributes describing chapter difficulty, prerequisites, duration, and code links.
- **LearningAsset**: Downloadable snippet or exercise scaffold associated with a module/chapter.
- **HomepageSection**: Ordered section block for landing page experience.
- **AuthorProfile**: Blog author identity with required attribution links.

## Assumptions

- "Downloadable" assets are versioned in-repo and linked from chapter/module docs.
- `docs/structure.md` remains authoritative when conflicts appear between markdown prose and derived machine-readable structure artifacts.
- WCAG AA contrast target applies to default body text and primary UI text/background pairs.
- Link validation includes internal links and chapter `code_repo_url` values at minimum.

## Release Gate

- All success criteria SC-001 through SC-012 MUST pass by MVP gate date **2026-03-31**.
- SC-001 through SC-012 MUST remain passing on every pull request merged to `main`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On a clean clone, `cd book_source && npm ci && npm run build` succeeds in local devcontainer and CI.
- **SC-002**: 100% of modules and chapters defined in `docs/structure.md` (or its machine-readable derivative) are generated as doc pages; missing or duplicate coverage equals 0.
- **SC-003**: Sidebar validation reports 0 ordering mismatches against `docs/structure.md` ordering (or its machine-readable derivative).
- **SC-004**: Build and validation checks report 0 broken internal links and 0 broken `code_repo_url` links.
- **SC-005**: Frontmatter validation reports 100% chapters passing required field checks.
- **SC-006**: 100% chapters provide sample markdown or placeholder content, and 100% placeholders are tagged with `status: placeholder`.
- **SC-007**: Local search index is generated during build, and automated browser checks report 0 non-origin network requests for search queries.
- **SC-008**: Initial page render defaults to dark mode, and automated accessibility checks confirm WCAG AA contrast for body text on `/`, `/docs`, and `/blog`.
- **SC-009**: Homepage renders all six required sections in required order without runtime errors, and a structural check validates the exact section order.
- **SC-010**: Font setup installs Inter, JetBrains Mono, and Noto Nastaliq Urdu; Urdu typography check confirms primary Urdu text uses `Noto Nastaliq Urdu` as computed font-family.
- **SC-011**: One-step setup script completes dependency install, font setup, and typecheck, failing fast with non-zero exit and actionable stage output on error.
- **SC-012**: New contributor completes clone-to-running-site in 15 minutes or less and can add one chapter with valid metadata in 10 minutes or less.

## Validation Matrix

| Criterion | Validation Method | Frequency | Owner |
|-----------|-------------------|-----------|-------|
| SC-001 | Clean clone build check in CI and local smoke run | Every PR + release gate | Build & Release Lead |
| SC-002 | Structure-to-doc coverage parity validator against `docs/structure.md` | Every PR + release gate | Content Tooling Lead |
| SC-003 | Sidebar-order mismatch validator against `docs/structure.md` | Every PR + release gate | Content Tooling Lead |
| SC-004 | Internal and `code_repo_url` link checker | Every PR + release gate | Content Tooling Lead |
| SC-005 | Frontmatter missing/invalid required-field validator | Every PR + release gate | Content Tooling Lead |
| SC-006 | Placeholder/sample and asset coverage validator | Every PR + release gate | Content Tooling Lead |
| SC-007 | Browser automation network-origin assertion for search requests | Every PR + release gate | QA Lead |
| SC-008 | Accessibility contrast audit on `/`, `/docs`, `/blog` | Every PR + release gate | QA Lead |
| SC-009 | Homepage section-order contract + runtime smoke check | Every PR + release gate | Frontend Lead |
| SC-010 | Font setup idempotency + Urdu computed-style assertion | Every PR + release gate | Frontend Lead |
| SC-011 | Setup script success and failure-path checks | Every PR + release gate | Build & Release Lead |
| SC-012 | Onboarding timed trial protocol (minimum 2 participants) | Release gate | Product Owner |
