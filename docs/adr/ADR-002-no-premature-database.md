# ADR-002: No Premature Database or ORM

- Status: Accepted
- Date: 2026-11-18
- Context: The public website has integrations such as inquiry capture and digital product checkout, but no approved persistence schema or operational database requirement has been established in this repository.
- Decision: Do not add Prisma or provision PostgreSQL in Phase 1 until the website's data ownership, retention, access, backup, and operational requirements are defined.
- Consequences: Integrations remain behind adapters. Google Sheets may serve as a limited operational sink where appropriate, but is not treated as a relational database or source of truth for complex transactional data.
- Revisit when: The website requires durable transactional records, relational queries, or data lifecycle controls that cannot be safely met by existing adapters.
