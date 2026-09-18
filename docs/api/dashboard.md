### 6. `docs/api/dashboard.md`

```markdown
# Dashboard & Analytics API

Aggregated portfolio metrics, visitor stats, and administrative overview.

## Endpoints

### 1. Get Metric Summaries
* **URL:** `/api/dashboard/metrics/`
* **Method:** `GET`
* **Auth Required:** Yes (`Bearer <token>`)

#### Response (`200 OK`)
```json
{
  "counts": {
    "projects": 12,
    "blog_posts": 8,
    "certificates": 6,
    "unread_inquiries": 3
  },
  "recent_inquiries": [
    {
      "id": 5,
      "name": "Jane Doe",
      "email": "jane@example.com",
      "created_at": "2026-08-26T18:00:00Z"
    }
  ]
}