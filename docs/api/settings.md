### `docs/api/settings.md`

```markdown
# Site Settings API

Global portfolio metadata, SEO tags, branding colors, and contact info.

## Endpoints

### 1. Get Site Settings
* **URL:** `/api/settings/`
* **Method:** `GET`
* **Auth Required:** No

#### Response (`200 OK`)
```json
{
  "site_name": "Portfolio & Tech CMS",
  "meta_title": "Full Stack Developer Portfolio",
  "meta_description": "Production-grade portfolio presenting web engineering, cloud architectures, and full-stack projects.",
  "logo_image": "/media/settings/logo.svg",
  "favicon": "/media/settings/favicon.ico",
  "og_image": "/media/settings/og-banner.webp",
  "contact_email": "contact@example.com",
  "is_maintenance_mode": false
}