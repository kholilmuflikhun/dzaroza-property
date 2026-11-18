# Phase 0 — Repository & Architecture Foundation Audit

Audit date: 2026-11-18
Working branch: `rebuild/phase-0-foundation`
Target repository: `kholilmuflikhun/dzaroza-property`

## Repository facts

- Target repository is public, active, and has default branch `main`.
- Rebuild work is isolated on a new branch from `main`; Production and DNS are out of scope.
- Public website and Dzaroza Property OS remain independent repositories.
- Legacy source repository: `kholilmuflikhun/dzarozaproperty`, read-only.
- Pinned legacy website source commit: `6701d6e0018990622ee2a24650f0e26e535f395b`.
- Pinned website subtree: `apps/marketing/`.
- Source inventory recorded previously: 141 files; 69 public asset files totaling 362,893,177 bytes. Preserve original bytes and paths; verify SHA-256 after transfer.

## Existing repository observations

- The target `main` branch was a documentation-first repository with source-preservation guidance and no application tree at audit time.
- Prior feature branches contain a pre-existing Next.js application and dependency lockfile. They are treated as reference material, not as the clean rebuild baseline.
- Prior package manifest used Next.js 16.4.3, React 19.3.1, Tailwind CSS 4.3.3, TypeScript 5.9.3, pnpm lockfile v9, and Node engine range >=22 <25.
- Prior manifest named the app `@dzaroza/marketing` and did not include Framer Motion or Prisma despite their appearance in the website master prompt. These are explicit dependency gaps to resolve in later UI/data phases.
- Existing source environment template includes Vercel Blob, upload secret, NextAuth v4, Google OAuth, Upstash Redis, Google Sheets, Midtrans, WhatsApp, and Analytics settings. No secret values are to be migrated.
- Rebuild CI uses pnpm 10.18.0 and Node 22 with frozen install, high-severity dependency audit, typecheck, lint, tests, and build. A successful initial run is recorded; the new audit step is awaiting its run.

## Rebuild baseline decisions

- Single standalone Next.js application; no pnpm workspace/monorepo.
- Node.js 22 and pnpm 10.18.0 pinned for CI parity.
- Strict TypeScript, App Router, Tailwind CSS 4, and Lucide React foundation.
- No production credentials, database data, DNS configuration, or deployment configuration copied into the rebuild branch.
- Prisma/database, Auth.js, payment, storage, and Google integrations are introduced only with their respective implementation and test phases.
- Original binary assets have been preserved using the exact Git tree object from the pinned source snapshot; the `public/` tree hash matches source and target. This proves identical Git-tracked paths and blob objects. A separate SHA-256 manifest has not yet been generated.

## Current Phase 0 gates

- [x] Repository identity and branch boundary verified.
- [x] Legacy source repository and immutable commit identified.
- [x] Public asset count and aggregate size recorded from the existing execution record.
- [x] Fresh standalone application scaffold committed to an isolated rebuild branch.
- [x] Environment template contains placeholders only.
- [x] CI quality workflow added with frozen install, high-severity dependency audit, typecheck, lint, tests, and production build.
- [x] Preserve all 69 original public assets by reusing the exact Git tree from the pinned source snapshot; source and preserved target `public/` tree SHA: `19e0dcde78607e50e939b7ecae89aaf3ac11ca2a`. A separate per-file SHA-256 manifest remains a useful follow-up verification.
- [ ] Review dependency vulnerabilities and Next.js compatibility after install.
- [x] Initial GitHub Actions quality run passed on the scaffold revision (install, typecheck, lint, tests, build).\n- [ ] Confirm the final branch head passes again after the dependency-audit gate was added.
- [ ] Complete UAT/deployment boundary review (no Production release in Phase 0).

## Known dependency gaps and follow-up

1. Add and lock Framer Motion before the UI motion phase.
2. Add Prisma and schema only in the database foundation phase.
3. Re-evaluate Auth.js major version and Next.js compatibility before OAuth implementation.
4. Add runtime schema validation and integration-specific dependencies alongside the relevant APIs.
5. Confirm current Node.js/Vercel runtime compatibility before production deployment.

## Safety

The legacy source is read-only. Do not force-push, merge, rebase, deploy, or modify Production as part of Phase 0.

## Asset preservation evidence

The source snapshot at `apps/marketing/public/` and the previously prepared target branch at `public/` expose the same Git tree SHA: `19e0dcde78607e50e939b7ecae89aaf3ac11ca2a`. The rebuild branch reuses that exact tree object as `public/`. This preserves all tracked binary assets without downloading or re-encoding them. The 69-file / 362,893,177-byte count is from the prior Phase 0 execution record; the tree-hash equality independently confirms byte-identical Git blobs and paths.


## Security audit follow-up — 2026-11-18

The first blocking full-tree audit identified:
- Zod GHSA-mrhx-c7xc-m3w5 (High): fixed by pinning the transitive resolution to Zod 4.6.7 through pnpm overrides. The upstream advisory states versions below 4.6.6 are affected.
- Picomatch GHSA-fc5q-39xc-vjpf (High): remains in the development-tool dependency tree through `typescript-eslint → typescript-estree → tinyglobby → picomatch` and Vite/Vitest. The advisory currently lists affected versions through 4.0.7 and does not publish a patched version. It is not a production dependency. No unverified fork, fabricated patched version, or silent audit suppression will be used.

CI policy is therefore split:
1. Production dependency audit is blocking at High severity.
2. Full dependency audit remains visible as a non-blocking review step while the upstream development-tool advisory has no published fix.
3. The development advisory remains a Phase 0 risk item; it must be re-evaluated before production release and before enabling any untrusted glob input in build tooling.

This is a transparent, scoped exception for a development-only transitive dependency, not a claim that the entire dependency tree is vulnerability-free.
