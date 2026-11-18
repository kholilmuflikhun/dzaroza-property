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
- Prior CI workflow uses pnpm 10.18.0 and Node 22 with frozen install, typecheck, lint, tests, and build.

## Rebuild baseline decisions

- Single standalone Next.js application; no pnpm workspace/monorepo.
- Node.js 22 and pnpm 10.18.0 pinned for CI parity.
- Strict TypeScript, App Router, Tailwind CSS 4, and Lucide React foundation.
- No production credentials, database data, DNS configuration, or deployment configuration copied into the rebuild branch.
- Prisma/database, Auth.js, payment, storage, and Google integrations are introduced only with their respective implementation and test phases.
- Legacy binary assets are not considered migrated until a Git-native transfer completes and SHA-256 checks pass.

## Current Phase 0 gates

- [x] Repository identity and branch boundary verified.
- [x] Legacy source repository and immutable commit identified.
- [x] Public asset count and aggregate size recorded from the existing execution record.
- [x] Fresh standalone application scaffold committed to an isolated rebuild branch.
- [x] Environment template contains placeholders only.
- [x] CI quality workflow added; first GitHub Actions run remains the execution proof.
- [ ] Transfer all 69 original public assets and verify SHA-256.
- [ ] Review dependency vulnerabilities and Next.js compatibility after install.
- [ ] Confirm CI green on the rebuild branch.
- [ ] Complete UAT/deployment boundary review (no Production release in Phase 0).

## Known dependency gaps and follow-up

1. Add and lock Framer Motion before the UI motion phase.
2. Add Prisma and schema only in the database foundation phase.
3. Re-evaluate Auth.js major version and Next.js compatibility before OAuth implementation.
4. Add runtime schema validation and integration-specific dependencies alongside the relevant APIs.
5. Confirm current Node.js/Vercel runtime compatibility before production deployment.

## Safety

The legacy source is read-only. Do not force-push, merge, rebase, deploy, or modify Production as part of Phase 0.
