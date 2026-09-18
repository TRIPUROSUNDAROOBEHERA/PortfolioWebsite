### `docs/api/achievements.md`

```markdown
# Achievements & Awards API

Manages honors, competitive programming stats, awards, and hackathon wins.

## Endpoints

### 1. List Achievements
* **URL:** `/api/achievements/`
* **Method:** `GET`
* **Auth Required:** No
* **Query Parameters:** `year`, `category`

#### Response (`200 OK`)
```json
[
  {
    "id": 1,
    "title": "National Hackathon Winner",
    "issuer": "Tech Innovation Summit",
    "date_awarded": "2025-11-10",
    "description": "Built an automated microservices deployment orchestration tool.",
    "badge_url": "/media/achievements/hackathon-gold.svg"
  }
]