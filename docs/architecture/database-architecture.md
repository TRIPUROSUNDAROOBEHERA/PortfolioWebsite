# Database Architecture

The data layer is powered by PostgreSQL 16 with optimized connection pooling and persistent volume mapping.

## Configuration Highlights
* **Engine:** `django.db.backends.postgresql`
* **Connection Pooling:** Managed via `CONN_MAX_AGE = 600`
* **Volume Persistence:** Docker named volume `postgres_data` mapped to `/var/lib/postgresql/data`
* **Backup Strategy:** Automated daily dumps stored in `database/backups/` via batch and shell utilities.