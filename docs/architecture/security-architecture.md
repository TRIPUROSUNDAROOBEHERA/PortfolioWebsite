# Security Architecture

Hardened security protocols implemented at the Nginx, Django, and Docker levels.

## Key Measures
* **Transport Security:** HTTPS enforcement via SSL termination at Nginx.
* **HTTP Headers:** Strict Content-Type sniffing protection, X-Frame-Options (`DENY`), and XSS filtering.
* **CORS & CSRF:** Whitelisted origin domains and secure cookie flags (`SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE`).
* **Privilege Separation:** Backend containers run under a dedicated non-root user (`appuser`).