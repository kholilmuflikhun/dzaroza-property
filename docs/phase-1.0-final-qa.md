# Phase 1.0 — Final QA & Release Readiness

**Scope:** Public Dzaroza Property V4.0 website only  
**Branch:** `feat/phase-0.9-security-seo-performance`  
**Pull request:** [#4](https://github.com/kholilmuflikhun/dzaroza-property/pull/4) — Draft; not merged  
**QA commit verified:** `bd5652dd6c3cc69e465f114ac7854c12dd4342ba`  
**Preview deployment:** [READY deployment](https://vercel.com/kholilmuflikhun-projects/dzaroza-property-staging/E3ZH8CJcr1eU6zYwxh7vwWYFgrXW)  
**Preview URL:** https://dzaroza-property-staging-git-fe-fbc45d-kholilmuflikhun-projects.vercel.app

## Release guardrails

- Public website and private Dzaroza Property OS remain separate repositories and release tracks.
- No Production deployment, DNS, platform secret, database, payment, or customer-impacting changes.
- Keep PR #4 Draft and do not merge without explicit approval.
- Preview checks must use synthetic/non-mutating requests only.
- A READY deployment or passing CI is not UAT approval.

## Verified results on exact QA commit

### CI and deployment

- GitHub Actions Push quality job: **success**, run [43610453982](https://github.com/kholilmuflikhun/dzaroza-property/actions/runs/43610453982), job 132494184432.
- GitHub Actions Pull Request quality job: **success**, run [43610458197](https://github.com/kholilmuflikhun/dzaroza-property/actions/runs/43610458197), job 132494197315.
- Vercel deployment `dpl_E3ZH8CJcr1eU6zYwxh7vwWYFgrXW`: **READY**, exact Git SHA matches QA commit.
- Vercel build events confirm frozen pnpm install, Next.js production compilation, and TypeScript phase completed. The CI jobs are the authoritative quality-gate success signal.

### Source-level interaction and accessibility review

- Mobile navigation now keeps `#mobile-primary-navigation` mounted while closed, applies the native `hidden` attribute, exposes `aria-expanded`, and supports Escape to close.
- Main navigation includes in-page links for products, services, portfolio, testimonials, company profile, and FAQ; consultation CTA points to services.
- Service section renders the consultation/order form component and service-specific consultation buttons.
- Product carousel has responsive one/two-column behavior, pointer swipe, and keyboard arrow handling.
- Portfolio provides category filters with `aria-pressed`, keyboard focus styling, swipe handling, and a lightbox trigger.
- Testimonials fetch their display data from `/api/testimoni`; the component includes pause/reduced-motion state and a testimonial form. Runtime loading and submission were not exercised.
- FAQ uses buttons with `aria-expanded` and `aria-controls`; its WhatsApp link opens a new tab with `rel="noopener noreferrer"`.
- Conversion CTA provides an in-page consultation action and a WhatsApp action with an accessible label.
- Order upload source enforces a bounded request body, 3 MB file limit, JPEG/PNG/WebP MIME and magic-byte validation, Redis-backed rate limit prerequisite, and Blob configuration prerequisite. These are source-review observations, not a live upload test.

## Runtime verification attempt and limitations

The following checks were attempted after confirming the exact Preview deployment:

- Open Preview in the web retrieval environment: **blocked**; the Preview hostname was reported inaccessible.
- Direct HTTPS request from the execution environment: **blocked before HTTP**, with DNS resolution failure (`Temporary failure in name resolution`).
- Connected browser tab access: **unavailable** because the browser connector requires its originating browser context.

Consequently, no honest runtime result can be reported for any of the following on this QA pass:

| Requested check | Result |
|---|---|
| Browser rendering at 360px | Not run — browser access blocked |
| Browser rendering at 768px | Not run — browser access blocked |
| Browser rendering at 1366px | Not run — browser access blocked |
| Browser rendering at 1920px | Not run — browser access blocked |
| CTA, nav, form, upload, product, portfolio, testimonial, FAQ, WhatsApp interaction | Source reviewed; browser interaction not run |
| Lighthouse desktop/mobile | Not run; no scores or Web Vitals claimed |
| Deployed response security headers | Not re-verified on this exact commit |
| Runtime CSP violations / external-origin allowlist | Not verified; requires browser network/console evidence |
| Live robots, sitemap, canonical and OG metadata on this exact Preview | Not re-verified in this pass |
| API contract POST cases | Not executed; no POST sent to avoid accidental mutation, storage writes, rate-limit consumption, or external integrations |

Previously recorded HTTP/SEO/header checks were performed on an earlier Preview baseline and must not be represented as fresh verification of commit `bd5652d`.

## Remaining release gates

1. Re-run browser QA on the exact Preview head at 360px, 768px, 1366px, and 1920px.
2. Exercise menu, consultation CTA, service form validation, file validation using local invalid fixtures only, product flows, portfolio filters/lightbox, testimonial display/form validation, FAQ, and WhatsApp URL construction. Do not submit real customer data.
3. Run Lighthouse desktop and mobile; record Performance, Accessibility, Best Practices, SEO, LCP, INP, CLS, and TTFB with the tested URL and timestamp.
4. Verify response headers, robots, sitemap, canonical/social metadata, and CSP using actual Preview responses and browser network/console output.
5. Add or run isolated API contract tests with mocked persistence, Blob, Redis, and payment clients. Cover malformed/oversized bodies, invalid MIME/signatures, missing configuration, and rate limiting without external side effects.
6. Update this report with exact evidence and the resulting commit/Preview SHA.
7. Obtain explicit user acceptance (UAT) before any Production release.

## Current release decision

**NOT READY FOR PRODUCTION — Phase 1.0 remains OPEN.**

CI and Preview deployment are green, and source-level checks were reviewed. Browser viewport/interaction QA, Lighthouse, deployed header/SEO/CSP verification, isolated API contract tests, and UAT remain outstanding because runtime access was unavailable in this execution context. No Production resources were changed and PR #4 remains Draft and unmerged.
