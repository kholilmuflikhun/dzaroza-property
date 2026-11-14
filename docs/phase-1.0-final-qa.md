# Phase 1.0 — Final QA & Release Readiness

**Scope:** Public Dzaroza Property V4.0 website only  
**Branch:** `feat/phase-0.9-security-seo-performance`  
**Pull request:** [#4](https://github.com/kholilmuflikhun/dzaroza-property/pull/4) — Draft; not merged  
**Latest QA baseline before this report:** `688e8ed59f213fa2c5d05ed2f730d088c15fc3ea`

## Release guardrails

- Public website and private Dzaroza Property OS remain separate repositories and release tracks.
- No Production deployment, DNS, platform secret, database, payment, or customer-impacting changes.
- Keep PR #4 Draft and do not merge without explicit approval.
- Preview checks must use synthetic/non-mutating requests only.

## Verified on the Phase 0.9 Preview

- GitHub Actions Push and Pull Request quality jobs passed on the baseline commit: frozen install, TypeScript, ESLint, unit tests, and production build.
- Vercel Preview reached `READY`.
- HTTP 200: `/`, `/privasi`, `/produk/e-book`, `/produk/e-class`, `/produk/webinar-property-syariah`, `/robots.txt`, and `/sitemap.xml`.
- HTTP 405 for GET on POST-only API routes: `/api/order`, `/api/order/upload`, `/api/checkout`, and `/api/checkout/notification`. This confirms the GET method is not accepted; it does not replace safe POST contract tests.
- Six response security headers present on checked HTML, text, XML, and API method-error responses: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy.
- Homepage, privacy, and three product detail pages expose expected canonical URLs and route-specific Open Graph/Twitter titles.
- Robots excludes `/admin/` and `/api/`; sitemap contains five canonical public URLs.
- Static homepage anchor scan found no missing in-page targets or duplicate IDs.
- Static review found mobile navigation's `aria-controls` target was absent while the menu was closed. Updated the component to keep the target mounted and use the native `hidden` attribute when closed.

## Remaining release gates

1. Re-run CI and Vercel Preview against the updated Phase 1.0 head.
2. Confirm all page assets and key local routes load in a real browser.
3. Perform interaction QA at mobile (360px), tablet (768px), laptop (1366px), and desktop (1920px): menu, CTA, service form, upload validation, portfolio filters/lightbox, testimonials, FAQ, product flows, and WhatsApp links.
4. Complete keyboard-only and screen-reader review, including menu expanded/collapsed state, dialogs, forms, carousel controls, and status announcements.
5. Run Lighthouse on desktop and mobile and record LCP, INP, CLS, TTFB, and accessibility results. No Lighthouse score is claimed in this report.
6. Review CSP allowlists against actual browser network requests and check for console CSP violations. Do not widen the policy without evidence.
7. Run safe API contract tests for malformed/oversized payloads, missing configuration, invalid upload MIME/signatures, and rate limiting. Do not create live orders, payments, uploads, or customer messages.
8. Obtain user acceptance before any Production release.

## Current release decision

**NOT READY FOR PRODUCTION.** Source-level and HTTP checks are partially complete. Real-browser interaction, Lighthouse, accessibility, CSP runtime review, and UAT remain outstanding. Preview-only work continues; no Production resources have been changed.
