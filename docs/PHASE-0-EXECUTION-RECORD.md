# Phase 0.1–0.3 Execution Record — Public Website

Date: 2026-11-12
Status: repository initialized; source baseline pinned; full source migration pending.

## Repository

- Destination: `kholilmuflikhun/dzaroza-property`
- Default branch: `main`
- Working branch: `feat/phase-0-source-preservation`
- Visibility: public (matches current repository setting)
- Production deployment: not triggered
- DNS: not changed

## Phase 0.1 — Source preservation

Pinned source:
- Legacy repository: `kholilmuflikhun/dzarozaproperty`
- Commit: `6701d6e0018990622ee2a24650f0e26e535f395b`
- Source tree: 280 blobs in complete repository tree.
- Website subtree: `apps/marketing/`
- Website subtree files: 141
- Website subtree bytes: 363,191,717
- Public asset files: 69
- Public asset bytes: 362,893,177

The 69 original public asset files account for almost all website source size. Preserve these bytes and paths exactly; do not regenerate or recompress them during migration. Several individual portfolio images are 7–13 MB.

## Phase 0.2 — Independent repository

- Repository created/initialized with its own README and source manifest.
- No workspace dependency on the legacy repository.
- No OS package or database package added.
- Public website is the sole application boundary.
- Initial branch created from the new repository's `main`.

## Phase 0.3 — Architecture preparation

Target layout after controlled migration:
- `app/`, `components/`, `lib/`, `public/`
- website-local `package.json`, lockfile, TypeScript and Tailwind configuration
- website-local CI and Preview deployment configuration

Integration boundary:
- OS data and privileged actions must be accessed through authenticated/versioned API endpoints.
- Public browser code must never receive database credentials or private storage credentials.

## Blocker and handoff

The GitHub connector can inspect UTF-8 repository files and metadata but does not support binary downloads or cross-repository object transfer. A safe full transfer of 363 MB of source assets cannot be completed through this connector alone. Do not claim migration complete until a Git-native transfer path is available and all 69 asset checksums are verified.

Next action: use a Git-native clone/fetch/push or controlled archive transfer, pinned to the commit above, then verify file counts and SHA-256 checksums before accepting the migration.
