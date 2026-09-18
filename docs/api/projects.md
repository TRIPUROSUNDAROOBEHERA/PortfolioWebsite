# Projects API

Manage showcase projects, technologies used, and deployment links.

## Endpoints

### 1. List Projects
* **URL:** `/api/projects/`
* **Method:** `GET`
* **Auth Required:** No
* **Query Parameters:** `category`, `featured` (`true`/`false`), `search`

#### Response (`200 OK`)
```json
[
  {
    "id": 1,
    "title": "Full-Stack Portfolio & CMS",
    "slug": "full-stack-portfolio-cms",
    "description": "Enterprise-grade portfolio platform built with Django REST & React.",
    "featured": true,
    "github_url": "[https://github.com/user/project](https://github.com/user/project)",
    "live_demo_url": "[https://example.com](https://example.com)",
    "tech_stack": ["React", "Django", "PostgreSQL", "Docker"],
    "thumbnail": "/media/projects/portfolio-thumb.webp",
    "created_at": "2026-01-15T10:00:00Z"
  }
]