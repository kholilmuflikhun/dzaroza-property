# Phase 0.8 — Content & Conversion

Status: implementation in progress; stacked Draft PR; not merged.

## Objective
Improve the public website's path from project discovery to a clear consultation action. Preserve the original Dzaroza Property business facts, service terms, prices, portfolio assets, and existing order workflow. Do not invent customer outcomes, ratings, certifications, guarantees, or product availability.

## Implemented
- Added a dedicated consultation conversion section after the portfolio section, so visitors encounter a clear next step after reviewing project examples.
- Added two direct actions:
  - **Isi Form Konsultasi** links to the existing service and order form section.
  - **Chat WhatsApp** opens the official customer-service WhatsApp contact with a concise consultation starter message.
- Copy explains what visitors can discuss: service options, scope of work, and agreement process before deciding next steps.
- Added explicit copy that the visitor retains the decision; no commitment to start a project is implied.
- Reframed the services section heading around visitor needs and added an explanatory introduction before the four existing service cards.
- Kept service descriptions, akad details, fee terms, and bullet-point scope grounded in the existing central service data.

## Preserved
- Existing original logo, images, portfolio, testimonials, product data, prices, product release statuses, FAQ, service IDs, and order form fields.
- Existing checkout and API routes; no payment flow was triggered.
- Existing WhatsApp customer-service number and message routing.
- No authentication or credentials requested.
- No database, DNS, Production secrets, Production deployment, or Dzaroza Property OS changes.

## Validation
- Changes are committed on `feat/phase-0.8-content-conversion`, based on Phase 0.7 head `4b6d286119d1767d29a0345e649e4227ec21d4d0`.
- CI and Vercel Preview for this phase must complete before the implementation can be marked validated.
- Browser visual QA and manual click-through remain pending; Preview readiness alone will not count as visual QA.

## Acceptance checks
1. Conversion section renders after portfolio and before testimonials.
2. Form CTA targets `#layanan`.
3. WhatsApp CTA uses the existing official contact constant, prefilled with a generic consultation request, opens a new tab, and has an accessible label.
4. Service intro explains the four existing service categories without changing commercial or akad terms.
5. No unsupported proof claims or false product availability are introduced.
6. Existing quality gates pass and the Vercel staging Preview is READY.
7. Visual and manual interaction QA across desktop, tablet, iPad, and mobile is completed before release.

## Release safety
- Phase 0.8 PR is Draft and stacked on Phase 0.7 branch.
- Phase 0.7 remains Draft and unmerged.
- Production, DNS, credentials, and the OS project remain untouched.
- No merge or Production action without explicit approval.
