# Quickstart — Foundation & Core Skeleton

## Goal

Run scaffold generation and validation aligned to `docs/structure.md`, then verify acceptance checks.

## Prerequisites

- Ubuntu 24.04 environment (devcontainer or CI equivalent)
- Node.js 20.x and npm available
- Repository checked out at root

## Steps

1. Install dependencies and run baseline setup:
   - `cd book_source`
   - `npm ci`
   - `./scripts/setup.sh`

2. Generate scaffold from structure source:
   - Derive machine-readable map from `docs/structure.md` with deterministic ordering by `module_order` then `chapter_order`.
   - Generate chapter docs so each structure entry yields exactly one chapter page.
   - Generate sidebar artifacts from the same derived map to preserve order parity.

3. Run validation checks:
   - Build check (SC-001)
    - Structure coverage + sidebar order (SC-002, SC-003):
       - Coverage assertion: generated page count equals total chapter entries in source derivative.
       - Order assertion: `orderingMismatches = 0` against source sequence.
   - Link + metadata validation (SC-004, SC-005)
   - Placeholder/sample coverage (SC-006)
   - Search network-origin assertion (SC-007)
   - Contrast + homepage order checks (SC-008, SC-009)
   - Font idempotency + Urdu computed-style check (SC-010)
   - Setup failure-path checks (SC-011)

### Setup failure-path checks (SC-011)

- Intentionally trigger a setup stage failure and verify:
   - exit code is non-zero,
   - error output includes stage identifier,
   - failure message is actionable.

4. Run contributor timing trial (SC-012):
   - Participant A/B performs clone-to-run and chapter-add flow.
   - Record elapsed time and pass/fail against thresholds.

### Onboarding timing protocol (SC-012)

- Minimum participants: 2.
- Pass thresholds:
   - clone-to-running-site <= 15 minutes,
   - add-one-valid-chapter <= 10 minutes.
- Record participant ID, duration, environment, and pass/fail result.

## Expected Outputs

- Generated docs and sidebar match `docs/structure.md` ordering.
- All SC-001..SC-012 checks pass before release gate date 2026-03-31.

## Troubleshooting

- If structure parity fails, validate derived map against `docs/structure.md` first.
- If search assertion fails, inspect network logs for non-origin search requests.
- If Urdu font check fails, verify `book_source/static/fonts` and CSS font-family wiring.
