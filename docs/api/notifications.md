### `docs/api/notifications.md`

```markdown
# Notifications API

Manages system alerts, inquiry pings, and administrative event logs.

## Endpoints

### 1. List Notifications
* **URL:** `/api/notifications/`
* **Method:** `GET`
* **Auth Required:** Yes (`Bearer <token>`)

#### Response (`200 OK`)
```json
[
  {
    "id": 1,
    "title": "New Contact Inquiry",
    "message": "Alex Mercer submitted a new contact form.",
    "is_read": false,
    "created_at": "2026-08-26T20:30:00Z"
  }
]