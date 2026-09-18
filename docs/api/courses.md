### `docs/api/courses.md`

```markdown
# Courses & Continuous Learning API

Tracks ongoing, completed, and certified technical coursework.

## Endpoints

### 1. List Courses
* **URL:** `/api/courses/`
* **Method:** `GET`
* **Auth Required:** No

#### Response (`200 OK`)
```json
[
  {
    "id": 1,
    "title": "Advanced Distributed Systems and Microservices",
    "platform": "Coursera / Stanford Online",
    "instructor": "Dr. Martin Kleppmann",
    "status": "completed",
    "completion_date": "2026-01-20",
    "certificate_link": "[https://coursera.org/verify/COURSE123](https://coursera.org/verify/COURSE123)"
  }
]