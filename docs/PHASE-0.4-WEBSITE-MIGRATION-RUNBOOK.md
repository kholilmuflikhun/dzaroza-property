# Phase 0.4 — Website source migration runbook

## Safety boundary

- Legacy source repository: `kholilmuflikhun/dzarozaproperty` (read-only).
- Target repository: `kholilmuflikhun/dzaroza-property`.
- Do not push to the legacy repository.
- Do not configure or trigger Production deployment in this phase.
- Import only the pinned V3 website snapshot below; do not use a moving branch name.

## Pinned source

- Source commit: `6701d6e0018990622ee2a24650f0e26e535f395b`
- Source path: `apps/marketing/`
- Package: `@dzaroza/marketing`, Next.js 16.4.3, React 19.3.1, Tailwind CSS 4.3.3.
- Source subtree inventory: 141 files; approximately 363 MB, predominantly original portfolio assets.

## Local Git transfer

Run from a machine with Git and authenticated access to both repositories. The transfer is deliberately performed locally because the connected GitHub API path cannot safely relay the repository's large binary assets.

```bash
set -euo pipefail
WORK="$(mktemp -d)"
git clone https://github.com/kholilmuflikhun/dzarozaproperty.git "$WORK/legacy"
git clone https://github.com/kholilmuflikhun/dzaroza-property.git "$WORK/website"
git -C "$WORK/legacy" fetch origin
git -C "$WORK/legacy" cat-file -e 6701d6e0018990622ee2a24650f0e26e535f395b^{commit}
git -C "$WORK/website" checkout feat/phase-0-source-preservation
mkdir "$WORK/website-source"
git -C "$WORK/legacy" archive 6701d6e0018990622ee2a24650f0e26e535f395b apps/marketing | tar -x -C "$WORK/website-source" --strip-components=2
cp -a "$WORK/website-source/." "$WORK/website/"
```

Review the resulting diff before committing. Preserve target repository documentation under `docs/`; resolve the imported app README at the root intentionally rather than blindly overwriting the target README. Do not use `git push --force`.

## Integrity and validation gates

1. Compare the imported file count against the pinned source inventory (141 files under `apps/marketing/`).
2. Verify every imported binary asset with SHA-256 against the same path in the source snapshot. A file-count-only check is insufficient.
3. Inspect `git status` and `git diff --stat`; confirm no unexpected deletions.
4. Run `pnpm install --frozen-lockfile` only after deciding the standalone lockfile strategy. The source app currently has a workspace package manifest; do not assume the monorepo lockfile can be copied unchanged.
5. Run lint, typecheck, tests, and production build; record exact command outputs.
6. Keep all secrets out of Git. Reconfigure environment variables separately in the target's non-production environment.
7. Open a reviewed PR from the import branch. Do not merge or deploy until the asset hashes and all required checks pass.

## Known scope

This runbook transfers the website source and original assets only. It does not migrate production secrets, DNS, domains, payment credentials, Google integrations, Redis data, Vercel Blob data, analytics properties, or production traffic.
