### `docs/api/resources.md`

```markdown
# Curated Resources API

Manages developer tooling links, cheatsheets, and reference guides.

## Endpoints

### 1. List Resources
* **URL:** `/api/resources/`
* **Method:** `GET`
* **Auth Required:** No

#### Response (`200 OK`)
```json
[
  {
    "id": 1,
    "title": "Django Production Hardening Cheatsheet",
    "category": "Backend Security",
    "link": "[https://github.com/user/django-security-checklist](https://github.com/user/django-security-checklist)",
    "tags": ["Django", "Security", "Production"]
  }
]