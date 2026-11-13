# Phase 0.7 — Public Website V4.0 UX Foundation

Status: implementation in progress; Draft PR; not merged.

## Objective
Begin the V4.0 public website refinement while preserving the imported V3.0 application, original content, and original assets.

## Changes
- Standardized the primary orange token to `#F97316`, retaining black/charcoal and white as the core brand surfaces.
- Shifted soft neutral backgrounds toward clean white/neutral gray rather than warm cream.
- Updated desktop and mobile navbar primary CTA from product browsing to the service consultation section.
- Restyled per-service consultation actions as high-contrast orange CTAs with visible keyboard focus.
- Added this feature branch to the website quality-gate workflow.

## Preserved
- Existing Indonesian copy, service catalog, product data, portfolio, original logo and image assets.
- Existing API routes, payment integration, testimonials, and public/private website boundary.
- No database, DNS, production secrets, or Production deployment changes.

## Validation
- Existing Phase 0.6 CI checkpoint passed frozen install, TypeScript, ESLint, unit tests (3 files / 16 tests), and production build.
- Existing Vercel staging deployment for the source branch is READY and reports a successful Next.js production build.
- New Phase 0.7 changes require their own CI run before acceptance.
- Responsive visual QA and interaction testing remain pending on the new Preview.

## Release gates still outstanding
1. Complete V4.0 UX/content review across desktop, tablet, and mobile.
2. Verify CTA, navigation, order, testimonial, product, and WhatsApp journeys.
3. Verify staging integrations without live payment or production credentials.
4. Verify original asset SHA-256 integrity against the pinned source commit; the legacy runbook still requires an authoritative checksum comparison.
5. Complete SEO, accessibility, security, and performance checks.
6. Obtain explicit approval before merging or any Production action.
