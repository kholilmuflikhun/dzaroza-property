# Phase 0 — Website Source Manifest

Status: source identified; content migration pending.

## Authoritative source

| Item | Value |
|---|---|
| Repository | `kholilmuflikhun/dzarozaproperty` |
| Source PR | [#25 — Website V3 rebuild](https://github.com/kholilmuflikhun/dzarozaproperty/pull/25) |
| Merge commit | `6701d6e0018990622ee2a24650f0e26e535f395b` |
| PR head | `a7b66d016413ec5c13473d80360c217b5f942c47` |
| PR base | `d58b1c6ec0db218bafa7544fca1ac3ea63232a77` |
| Source branch | `feat/ops-ux-dashboard-foundation` (PR #25 base) |
| PR merge date | 2026-11-09 |

## Preserve

- Original brand logo and image assets.
- Existing website copy and Indonesian-language content.
- Marketing sections, service catalog, company profile, portfolio, testimonials, FAQ.
- Existing lead/order/consultation flows and integrations.
- SEO metadata, sitemap, robots, structured data, and verification assets.
- Accessibility and responsive behavior already implemented.

## Migration controls

- Copy from the immutable source commit, not from a moving branch name.
- Preserve file paths and binary bytes; do not redraw or regenerate original assets.
- Record SHA-256 checksums for binary assets before and after transfer.
- Keep environment variables and credentials out of source control.
- Do not migrate OS-only routes or privileged tenant APIs into the public app.
- No Production deployment, DNS changes, or legacy writes in Phase 0.

## Next validation

1. Inventory the source tree at the pinned commit.
2. Separate public website files from OS-only code.
3. Verify source file sizes and binary transfer capability.
4. Migrate source in reviewed batches and run typecheck, tests, and build.
