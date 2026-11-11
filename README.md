# Dzaroza Property — Public Website

Independent public-facing website for Dzaroza Property.

## Project boundaries

- This repository owns the public marketing website, public content, SEO, lead/consultation entry points, and public-facing integrations.
- The private Dzaroza Property OS lives in the separate repository: [dzaroza-property-os](https://github.com/kholilmuflikhun/dzaroza-property-os).
- Do not add OS-only business workflows, privileged administration, tenant data, or private document operations to this repository.
- Integrate with the OS only through documented, authenticated HTTPS APIs.

## Source preservation

The legacy repository `kholilmuflikhun/dzarozaproperty` is the read-only migration source. Do not push, merge, rebase, or create commits there.

Website source baseline:
- Legacy source repository: `kholilmuflikhun/dzarozaproperty`
- Website V3.0 rebuild PR: [#25](https://github.com/kholilmuflikhun/dzarozaproperty/pull/25)
- Merged source commit: `6701d6e0018990622ee2a24650f0e26e535f395b`
- Source tree before the V3.0 merge: `d58b1c6ec0db218bafa7544fca1ac3ea63232a77`
- V3.0 merge was merged into `feat/ops-ux-dashboard-foundation`; it was not a direct Production deployment.

The source is preserved in place. This repository is a new independent destination; application code and original assets will be migrated in controlled batches after the source manifest and binary transfer path are verified.

## Initial setup

Phase 0 establishes repository identity and migration boundaries only. It does not deploy, configure Production, or change DNS.

## Safety rules

1. Never modify the legacy source repository.
2. Never deploy from an unreviewed feature branch.
3. Production changes require a separate explicit approval.
4. Keep secrets out of Git; use environment-specific platform secrets.
5. Require typecheck, tests, build, security review, and Preview smoke tests before merge.
