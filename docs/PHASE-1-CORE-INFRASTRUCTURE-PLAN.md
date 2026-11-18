# Phase 1 — Core Infrastructure & Application Foundation

Status: IN PROGRESS
Base: `rebuild/phase-0-foundation`
Scope: Dzaroza Property V4.0 public website only.

## 1. Architecture boundaries

This repository is a standalone Next.js application for the public marketing website and its public-facing service workflows.

It is NOT the Dzaroza Property OS. Do not add OS-only concerns here:
- tenant and organization management
- internal project workspace and document engine
- finance, payroll, or internal operations
- multi-tenant RBAC and staff administration

The OS remains in its independent repository and owns its own identity, organization, tenant isolation, RBAC, audit, and internal workflow platform.

## 2. Target architecture

Use a modular monolith with Next.js App Router and server-first defaults.

- `app/`: route composition, layouts, route handlers, loading/error boundaries.
- `components/`: reusable presentation components; no direct secrets or vendor SDK calls.
- `features/`: public business capabilities organized by domain (inquiry, portfolio, products, testimonials, consultation).
- `lib/config/`: typed runtime and public configuration.
- `lib/http/`: API response contracts, error mapping, request metadata.
- `lib/security/`: headers, origin policy, input/rate-limit policy.
- `lib/integrations/`: isolated adapters for Google Sheets, Midtrans, Blob storage, and Upstash.
- `lib/observability/`: structured server logging and request correlation.
- `types/`: shared public contracts only.

Keep the existing root-level App Router layout until a tested migration to `src/` provides clear value. No monorepo or workspace.

## 3. Runtime and dependency policy

- Node.js 22 LTS line; pnpm 10.18.0.
- Next.js App Router, React 19, TypeScript strict, Tailwind CSS 4.
- Add direct dependencies only when the feature uses them. Never rely on transitive packages as application imports.
- Zod 4.6.7+ is the approved runtime schema validator; the transitive override is retained until the direct dependency is declared.
- Production dependency audit at High severity is blocking.
- Full-tree development audit is visible and reviewed. The unresolved Picomatch advisory is documented in Phase 0 and must be re-evaluated before release.
- Avoid adding Prisma/PostgreSQL until a concrete persistence requirement is confirmed. Google Sheets remains an integration adapter, not a database abstraction.

## 4. Phase 1 workstreams

### 1.1 Runtime configuration
- Typed environment schema with clear public/server-only separation.
- Startup/build-safe validation strategy; no accidental secret exposure in client bundles.
- `.env.example` remains placeholder-only.
- Environment matrix for local, Preview, and Production.

### 1.2 HTTP and API foundation
- Stable success/error response envelope.
- Runtime request validation and explicit API contracts.
- Request ID propagation and safe error mapping.
- Health endpoint that reveals no secrets or infrastructure internals.

### 1.3 Security baseline
- Security headers and preview/production behavior.
- Origin/CSRF policy for state-changing routes.
- Input size limits, upload constraints, and rate limiting design.
- CSP strategy documented before enforcement; do not ship a permissive CSP merely to satisfy a checklist.

### 1.4 Observability and reliability
- Structured server-side logging with redaction.
- Correlation IDs and operational health checks.
- Error boundaries and graceful failure behavior.
- No secrets, personal data, payment data, or raw upload contents in logs.

### 1.5 Integration boundaries
- Google Sheets adapter for lead/inquiry workflows.
- Midtrans adapter isolated from UI and client components.
- Blob storage adapter with server-only token and file policy.
- Upstash rate-limit adapter with a safe local fallback.
- Auth integration only after selecting and testing the supported Next.js-compatible Auth.js version.

### 1.6 Quality and governance
- Unit and integration test conventions.
- Dependency and secret scanning.
- CI quality gates and documented risk exceptions.
- ADRs for architecture choices that materially affect future migrations.

## 5. Explicit non-goals in Phase 1

- No full UI/visual design implementation.
- No Production release, DNS, or Production environment changes.
- No database schema or ORM without a confirmed persistence use case.
- No internal OS modules, tenant model, or internal RBAC in this public website repository.
- No payment flow activation with live credentials.

## 6. Acceptance criteria

- [x] Runtime environment schema is typed and tested.
- [x] Public and server environment schemas are separate; server getter is isolated to server modules.
- [x] API error/success contracts are consistent and tested.
- [x] Health endpoint responds without disclosing secrets; Preview returned HTTP 200.
- [x] Security headers verified on Preview: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP.
- [ ] State-changing route protection and rate limiting policy are tested.
- [ ] Logs redact credentials and sensitive payloads.
- [ ] Integration adapters have mock-based tests and no UI-level SDK coupling.
- [x] CI passed on Phase 1 branch head `cb9c2e3c9867d5b0f2dcb9b51736583e83c01c80` (frozen install, production audit, full-audit review, typecheck, lint, tests, build).
- [x] Architecture decisions documented in ADR-001 and ADR-002; operational runbooks remain open.

## 7. Decision log

| ID | Decision | Rationale |
|---|---|---|
| ADR-001 | Standalone Next.js modular monolith | Public website has a separate lifecycle from Dzaroza Property OS |
| ADR-002 | No monorepo/workspace | Explicitly preserve independent repository architecture |
| ADR-003 | No premature database/ORM | Avoid operating a database without a proven website persistence requirement |
| ADR-004 | Server-only integration adapters | Keep secrets and vendor SDKs away from client bundles |
| ADR-005 | Zod 4 for runtime validation | Supported patched version for schema validation |



## Phase 1 execution evidence — first infrastructure slice

- Branch: `feat/phase-1-core-infrastructure`
- Pull request: [#6](https://github.com/kholilmuflikhun/dzaroza-property/pull/6) (Draft; base is the Phase 0 foundation branch)
- Validated commit: `cb9c2e3c9867d5b0f2dcb9b51736583e83c01c80`
- GitHub Actions: passed on both push and pull-request runs.
- Vercel Preview: `https://dzaroza-property-staging-oltoqiiia-kholilmuflikhun-projects.vercel.app`
- `GET /`: HTTP 200; expected page title and Indonesian foundation content present.
- `GET /api/health`: HTTP 200; status `ok`, `Cache-Control: no-store`.
- Verified response headers: `strict-transport-security`, `x-frame-options`, `x-content-type-options`, `referrer-policy`, `permissions-policy`, `cross-origin-opener-policy`.

This is the first infrastructure slice, not Phase 1 completion. Rate limiting, state-changing request protection, integration adapters, log redaction, and full operational runbooks remain in scope.
