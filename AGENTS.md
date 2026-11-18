# Repository instructions

- This repository contains only the public Dzaroza Property website.
- Dzaroza Property OS remains in its independent repository. Never add OS-only admin, tenant, finance, or private-document workflows here.
- The legacy repository `kholilmuflikhun/dzarozaproperty` is read-only. Use only the pinned source commit in the Phase 0 source manifest.
- Never commit secrets, local environment files, production data, or credentials.
- Do not deploy to Production, change DNS, or alter production environment variables during rebuild phases.
- Use pnpm 10.18.0 and Node.js 22 for local and CI parity.
- Run typecheck, lint, tests, and production build before proposing a merge.
- Read the installed Next.js agent documentation under `node_modules/next/dist/docs/` before implementing framework APIs; this project uses Next.js 16.
- Keep business configuration and Indonesian public copy separate from presentation components.
