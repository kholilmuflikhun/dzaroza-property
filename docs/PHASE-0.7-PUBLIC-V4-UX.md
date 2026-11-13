# Phase 0.7 — Public Website V4.0 UX Foundation

Status: implementation in progress; Draft PR; not merged.

## Objective
Refine the public V4.0 experience while preserving the imported V3.0 application, original copy, product/service information, and original visual assets.

## Implemented in this phase
- Standardized the primary orange design token to `#F97316`, retaining black/charcoal and white as core brand surfaces.
- Shifted soft backgrounds to neutral white/gray tones rather than warm cream.
- Updated desktop and mobile primary navigation CTA to `Konsultasi Layanan`, pointing to the service section.
- Added keyboard Escape dismissal for the mobile navigation panel.
- Added visible keyboard focus treatment to the mobile primary CTA.
- Restyled per-service consultation actions as high-contrast orange CTAs with visible keyboard focus.
- Added a keyboard-accessible skip link and a focusable `main#main-content` landmark.
- Localized the Company Profile navigation label to `Tentang Kami` in the header and footer for consistent Indonesian-language navigation.
- Added this feature branch to the website quality-gate workflow.

## Preserved
- Existing Indonesian copy, service catalog, digital product information, portfolio, testimonials, team information, original logo and image assets.
- Existing API routes, checkout and payment integration, order submission, testimonial flow, and public/private website boundary.
- No database schema, DNS, Production secrets, or Production deployment changes.

## Validation
- Parent Phase 0.6 CI passed frozen dependency installation, TypeScript, ESLint, unit tests, and production build.
- Phase 0.7 CI runs for the first implementation commits passed frozen install, TypeScript, ESLint, unit tests, and production build.
- Phase 0.7 Vercel staging Preview for the then-current branch head reached READY.
- Latest changes (mobile CTA keyboard behavior and skip navigation) require a fresh CI and Preview run.
- Automated CI does not replace responsive visual QA or keyboard/screen-reader interaction review.
- Source integrity comparison: pinned legacy commit `6701d6e0018990622ee2a24650f0e26e535f395b` versus current website branch head; 69/69 public asset Git blob IDs match exactly. Full app subtree comparison: 125/141 files are byte-identical; the 16 differences are documented changes in the README, Phase 0.6 security-hardening files, and Phase 0.7 UX files. No source app files are missing.

## Remaining release gates
1. Complete visual QA across desktop, tablet, iPad, and mobile viewports.
2. Verify navbar, anchor navigation, mobile menu, all service CTA, order wizard, product actions, portfolio lightbox, testimonials, FAQ, and WhatsApp journeys.
3. Verify staging integrations without triggering live payments or using Production credentials.
4. Preserve the source asset integrity evidence: all 69 files under the pinned source `apps/marketing/public/` subtree were compared against the target `public/` tree and all 69 Git blob object IDs matched exactly (362,893,177 bytes total; no missing, changed, or extra public assets). Identical Git blob IDs establish byte-identical content. A separate SHA-256 manifest has not been generated.
5. Complete SEO, accessibility, security, and performance checks.
6. Obtain explicit approval before merging or any Production action.
