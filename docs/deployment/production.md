### `docs/deployment/production.md`

```markdown
# Production Deployment Guide

Instructions for deploying the application to a production server.

## Deployment Steps
1. Configure environment variables in `.env` (ensure `DEBUG=False`, strong secrets, and `DB_SSL_REQUIRE=True`).
2. Run the production compose profile:
   ```cmd
   docker compo