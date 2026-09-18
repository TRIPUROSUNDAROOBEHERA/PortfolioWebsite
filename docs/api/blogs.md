### 4. `docs/api/blogs.md`

```markdown
# Blog Posts API

Manages technical articles, publication status, and markdown contents.

## Endpoints

### 1. List Published Articles
* **URL:** `/api/blogs/`
* **Method:** `GET`
* **Auth Required:** No
* **Query Parameters:** `tag`, `search`, `page`

#### Response (`200 OK`)
```json
{
  "count": 12,
  "next": "/api/blogs/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Configuring Dockerized PostgreSQL for High Performance",
      "slug": "configuring-dockerized-postgresql",
      "excerpt": "A deep dive into containerized relational database optimization.",
      "cover_image": "/media/blogs/postgres.webp",
      "read_time_minutes": 6,
      "published_at": "2026-02-10T12:00:00Z"
    }
  ]
}