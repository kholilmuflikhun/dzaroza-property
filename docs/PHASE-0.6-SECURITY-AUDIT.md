# Phase 0.6 — Website Security & Release Readiness Audit

**Branch:** `feat/phase-0-source-preservation`  
**Scope:** public API hardening, authentication, rate limiting, payment webhook handling, CI validation.  
**Production impact:** none. No deployment, DNS change, production secrets update, or live payment was performed.

## Security changes

### Google-authenticated testimonials

- Testimonial submission requires an authenticated Google session.
- The submitted email must match the authenticated account.
- Verified Google account name, email, and profile image are used where available instead of trusting caller-supplied identity fields.
- Rate limiting is keyed by verified account and trusted client IP.

### Midtrans webhook

- The webhook fails closed if the Midtrans server key or order storage is not configured.
- Payload types, amount format, signature hex format, and SHA-512 signature are validated before order lookup.
- A card `capture` is not marked paid unless `fraud_status` is `accept`.
- Transaction-status mapping uses an own-property check to ignore inherited object keys.
- Delayed pending/failure notifications cannot downgrade terminal order states.
- The order amount must match the stored order amount before an update is accepted.

### Public endpoint abuse controls

- Client IP extraction prefers Cloudflare `cf-connecting-ip` or trusted proxy `x-real-ip`; it no longer trusts the caller-controlled left-most `x-forwarded-for` value.
- Production order, order-photo upload, and testimonial submissions require the distributed Upstash rate-limit store. Local development can still use the in-memory fallback.
- Existing payload size, field validation, MIME/magic-byte, and formula-injection safeguards remain in place.

## CI gates

The Website workflow runs frozen dependency installation, TypeScript, ESLint, unit tests, and a production build without deployment. The latest verified code checkpoint passed all gates: **3 test files, 16 tests passed**, plus TypeScript, ESLint, and production build.

## Remaining validation

- Run Midtrans sandbox notifications end-to-end with test credentials.
- Verify Google OAuth session callbacks and testimonial submission in a staging deployment.
- Verify Upstash rate limits across multiple serverless instances.
- Verify public Blob upload behavior and image rendering on staging.
- No Production deployment or production credential test is authorized in this phase.

**Release recommendation:** keep the Website PR in Draft until the final CI run and staging verification are green.
