# Production Deployment & Hosting Guide

This guide covers the complete, step-by-step process for deploying the **Full-Stack Portfolio Website** (Django REST Framework + React/Vite + PostgreSQL + Nginx) into production, registering a domain name, setting up free SSL certificates, and ensuring strict security.

---

## Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [Domain Registration (Buying a Domain)](#2-domain-registration-buying-a-domain)
3. [Choosing a Hosting Provider](#3-choosing-a-hosting-provider)
4. [Deployment Method A: Cloud VPS with Docker (Recommended)](#4-deployment-method-a-cloud-vps-with-docker-recommended)
5. [Deployment Method B: Managed Platforms (Render + Vercel)](#5-deployment-method-b-managed-platforms-render--vercel)
6. [DNS Configuration (Connecting Domain to Server)](#6-dns-configuration-connecting-domain-to-server)
7. [SSL / HTTPS Configuration (Let's Encrypt / Certbot)](#7-ssl--https-configuration-lets-encrypt--certbot)
8. [Critical Security Hardening Checklist](#8-critical-security-hardening-checklist)
9. [Maintenance & Backups](#9-maintenance--backups)

---

## 1. Architecture Overview

```
                      [ Client Browser ]
                              │ (HTTPS / Port 443)
                              ▼
                     [ Nginx Reverse Proxy ]
                     ├── / ──────────────► React Frontend (Static SPA build)
                     ├── /api/ ──────────► Django Gunicorn (Port 8000)
                     ├── /admin/ ────────► Django Admin (Port 8000)
                     └── /static/, /media/► Static Assets & Media Uploads
                              │
                              ▼
                     [ PostgreSQL Database ] (Port 5432)
```

---

## 2. Domain Registration (Buying a Domain)

### Where to Buy:
1. **Cloudflare Registrar** (*Recommended*):
   - At-cost pricing (no retail markup, ~$9–$10/year for `.com`).
   - Free enterprise-grade DDoS mitigation, free SSL, and fastest DNS resolution worldwide.
2. **Namecheap / Porkbun**:
   - Clean UI, competitive prices, free WHOIS privacy protection forever.
3. **Hostinger / GoDaddy**:
   - Alternative options; check renewal pricing carefully.

### Recommended Domain Extensions for Portfolios:
- `.com` – Standard, globally recognized.
- `.dev` – Modern, technical (requires HTTPS by default).
- `.me` – Popular for personal developer portfolios.
- `.in` / `.tech` / `.io` – Regional or tech-focused.

---

## 3. Choosing a Hosting Provider

| Hosting Option | Cost | Best For | Pros |
|---|---|---|---|
| **DigitalOcean / Hetzner / Linode (Cloud VPS)** | $4 – $6 / month | Full Docker Compose deployment | Complete control, runs exact stack (`docker-compose.yml`), persistent storage |
| **AWS Lightsail** | $3.50 – $5 / month | AWS ecosystem entry | Predictable monthly bill, AWS backbone |
| **Render + Vercel (PaaS)** | Free – $7 / month | Minimal server management | Git push auto-deploy, managed Postgres, zero Linux admin |

---

## 4. Deployment Method A: Cloud VPS with Docker (Recommended)

### Step 1: Create a Linux VPS
1. Create an **Ubuntu 22.04 LTS** or **24.04 LTS** droplet/instance (1GB RAM or 2GB recommended).
2. Connect via SSH:
   ```bash
   ssh root@YOUR_SERVER_IP
   ```

### Step 2: Install Docker & Docker Compose
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Enable UFW Firewall
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
```

### Step 3: Clone Project & Configure Production Environment
```bash
git clone https://github.com/YOUR_USERNAME/PortfolioWebsite.git /var/www/portfolio
cd /var/www/portfolio

# Create production environment file
cp .env.example .env
nano .env
```

**Set production environment variables**:
```ini
DJANGO_SECRET_KEY=generate-a-strong-random-key-here
DJANGO_SETTINGS_MODULE=config.settings.production
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=tripurosundarobehera.me,www.tripurosundarobehera.me

DB_NAME=portfolio_db
DB_USER=portfolio_user
DB_PASSWORD=choose_a_strong_database_password
DB_HOST=db
DB_PORT=5432
DATABASE_URL=postgres://portfolio_user:choose_a_strong_database_password@db:5432/portfolio_db

CORS_ALLOWED_ORIGINS=https://tripurosundarobehera.me,https://www.tripurosundarobehera.me
CSRF_TRUSTED_ORIGINS=https://tripurosundarobehera.me,https://www.tripurosundarobehera.me

SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-gmail-app-password
DEFAULT_FROM_EMAIL=Portfolio <your-email@gmail.com>
```

### Step 4: Build and Launch Containers
```bash
docker compose up -d --build
```

### Step 5: Run Migrations and Create Superuser
```bash
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py collectstatic --noinput
docker compose exec backend python manage.py createsuperuser
```

---

## 5. Deployment Method B: Managed Platforms (Render + Vercel)

If you prefer not to manage a Linux server:

1. **Backend & Database on Render.com**:
   - Create a **PostgreSQL** database instance on Render.
   - Create a **Web Service** on Render connected to your GitHub repo (`backend/` root directory).
   - Build command: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
   - Start command: `gunicorn config.wsgi:application`
   - Set environment variables (`DATABASE_URL`, `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False`, `DJANGO_ALLOWED_HOSTS`, etc.).

2. **Frontend on Vercel or Cloudflare Pages**:
   - Connect repository, set Root Directory to `frontend`.
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variable: `VITE_API_BASE_URL=https://your-backend-service.onrender.com/api`

---

## 6. DNS Configuration (Connecting Domain to Server)

Go to your domain registrar (e.g. Cloudflare, Namecheap) DNS settings and add these records:

| Type | Name / Host | Value / Target | TTL |
|---|---|---|---|
| **A** | `@` (root) | `YOUR_SERVER_IP` (e.g., `159.65.12.34`) | Auto / 300 |
| **A** or **CNAME** | `www` | `YOUR_SERVER_IP` or `tripurosundarobehera.me` | Auto / 300 |

*Propagation usually takes 5 minutes to 24 hours (Cloudflare DNS is usually under 5 minutes).*

---

## 7. SSL / HTTPS Configuration (Let's Encrypt / Certbot)

To enable free, auto-renewing HTTPS on your VPS:

### Option A: Certbot with Nginx on the host
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tripurosundarobehera.me -d www.tripurosundarobehera.me
```

### Option B: Cloudflare Flexible / Full SSL
If your DNS is managed via Cloudflare:
1. In Cloudflare Dashboard, go to **SSL/TLS**.
2. Select **Full** or **Full (Strict)** encryption mode.
3. Enable **Always Use HTTPS** and **Automatic HTTPS Rewrites**.

---

## 8. Critical Security Hardening Checklist

Before public launch:
- [ ] **DEBUG = False**: Never deploy with `DJANGO_DEBUG=True`.
- [ ] **Strong Secret Key**: Never use default or git-committed secret keys. Generate using:
  ```bash
  python -c "import secrets; print(secrets.token_urlsafe(50))"
  ```
- [ ] **No Secrets in Git**: Ensure `.env` is listed in `.gitignore` and never committed.
- [ ] **Strict ALLOWED_HOSTS**: Set only to your real domains (`yourdomain.com,www.yourdomain.com`).
- [ ] **Strict CORS/CSRF**: Only allow your production HTTPS domain.
- [ ] **Secure Cookies**: Ensure `SESSION_COOKIE_SECURE = True` and `CSRF_COOKIE_SECURE = True`.
- [ ] **Non-root Container Execution**: Verified (`appuser` UID 1000 in Dockerfile).
- [ ] **Admin URL Protection**: (Optional) Rename `/admin/` in `config/urls.py` to a custom secret path like `/manage-cms-portal/` to prevent automated brute-force attacks.
- [ ] **Database Passwords**: Use a strong, random password (16+ chars) for Postgres.

---

## 9. Maintenance & Backups

### Automated Database Backup
Run the included backup script or create a cron job:
```bash
# Add to crontab (runs daily at 2:00 AM)
0 2 * * * docker compose exec -T db pg_dump -U portfolio_user portfolio_db | gzip > /var/backups/portfolio_$(date +\%F).sql.gz
```

### Logs & Monitoring
```bash
# View live backend logs
docker compose logs -f backend

# View live Nginx access & error logs
docker compose logs -f nginx
```
