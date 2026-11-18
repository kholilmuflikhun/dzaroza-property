# ADR-001: Standalone Modular Monolith

- Status: Accepted
- Date: 2026-11-18
- Context: Dzaroza Property V4.0 public website has a separate lifecycle from Dzaroza Property OS.
- Decision: Keep one standalone Next.js App Router application with domain-oriented feature modules and server-only integration adapters.
- Consequences: No workspace/monorepo, no tenant or internal RBAC model, and no cross-repository shared runtime dependency. Public website workflows can evolve without coupling to the internal OS.
- Revisit when: A measured need for independently deployed services or shared platform runtime is demonstrated.
