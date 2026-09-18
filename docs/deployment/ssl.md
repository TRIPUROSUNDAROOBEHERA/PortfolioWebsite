### `docs/deployment/ssl.md`

```markdown
# SSL & TLS Certificate Configuration

Instructions for setting up SSL certificates for Nginx reverse proxy termination.

## Setup
1. Place your SSL certificate (`fullchain.pem`) and private key (`privkey.pem`) inside `nginx/ssl/`.
2. Update `nginx/default.conf` to enable the HTTPS server block and direct port `443`.
3. Restart the frontend/Nginx container:
   ```cmd
   docker compose restart frontend