# Phase 0.9 — Security, SEO & Performance Audit

**Baseline:** Phase 0.8 head `1e804a2d878b6c614a40f227b4c99cc7bc35742b`  
**Working branch:** `feat/phase-0.9-security-seo-performance`  
**Scope:** public Dzaroza Property V4.0 website only.

## Guardrails

- Do not change Production, DNS, databases, platform secrets, or the private Dzaroza Property OS.
- Do not trigger live payments, real orders, testimonial submissions, uploads, or customer messages.
- Keep the release pull request in Draft; merging and Production actions require explicit approval.

## Static audit observations

| Area | Evidence at baseline | Status |
|---|---|---|
| Security headers | `next.config.js` sets CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and X-Permitted-Cross-Domain-Policies. | Present; deployed response verification pending |
| Public order API | Validates service, contact fields, field lengths, select options, photo Blob hosts, and location coordinates; uses Redis-backed production rate-limit prerequisite and returns 503 if persistent Sheets storage is unavailable. | Static review passed; adversarial tests pending |
| Public photo upload | Restricts MIME types and validates JPEG/PNG/WebP magic bytes, file size, Blob configuration, and rate limit. | Static review passed; deployed integration verification pending |
| Admin upload | Requires an authenticated admin session and upload secret before issuing a Blob token. | Static review passed; auth/permission integration verification pending |
| Rate-limit identity | Prefers Cloudflare `cf-connecting-ip`, then proxy `x-real-ip`; does not trust caller-supplied `x-forwarded-for` alone. | Unit tests exist; production proxy-chain verification pending |
| Metadata | Root metadata includes Indonesian title/description, metadataBase, and Open Graph defaults. | Present; per-route canonical/social metadata review pending |
| Robots and sitemap | Robots disallows `/admin/` and `/api/`; sitemap lists canonical homepage, privacy, and product detail URLs without section fragments or fabricated last-modified timestamps. | Static review passed; live endpoint and URL coverage verification pending |
| Performance | Below-the-fold portfolio, testimonials, company profile, and FAQ are dynamically imported while retaining SSR. | Static review only; Lighthouse/Core Web Vitals pending |
| Accessibility | Phase 0.8 added keyboard focus, carousel pause, dialog focus management, form labels, and live status messaging. | Static review only; screen-reader and manual keyboard verification pending |

## Changes in Phase 0.9

- Serialize the Google Analytics measurement ID as a JavaScript string literal with `JSON.stringify` instead of interpolating it inside single quotes. This prevents malformed or executable JavaScript if the build-time environment value contains quote or control characters.
- Preserve the existing analytics opt-in-by-configuration behavior; no analytics identifier or secret is added to source control.

## Required verification before Phase 0.9 can be marked complete

1. Run frozen dependency installation, typecheck, ESLint, unit tests, and production build on this branch.
2. Verify the deployed Preview returns the expected security headers on HTML, API error responses, and static assets.
3. Validate `/robots.txt`, `/sitemap.xml`, canonical URLs, Open Graph metadata, and all product detail URLs.
4. Run API regression tests for malformed JSON, oversized payloads, invalid service IDs, invalid upload signatures, missing Redis/Sheets/Blob configuration, and rate-limit exhaustion.
5. Review CSP violations and confirm every allowed external origin is required by the public website.
6. Run Lighthouse on desktop and mobile; record LCP, INP, CLS, TTFB, and accessibility findings.
7. Complete keyboard-only and screen-reader checks for navigation, conversion form, product dialog, portfolio lightbox, testimonial form, FAQ, and WhatsApp actions.
8. Re-run all checks against the exact final Preview head. No live credentials or customer-impacting actions may be used.

**Release state:** in progress. Static source review is not a substitute for deployed Preview, browser, Lighthouse, or integration verification.
