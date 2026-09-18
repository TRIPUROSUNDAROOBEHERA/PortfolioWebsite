### 3. `docs/api/skills.md`

```markdown
# Skills & Proficiency API

Manages technical competencies, skill categories, and proficiency levels.

## Endpoints

### 1. List Skills
* **URL:** `/api/skills/`
* **Method:** `GET`
* **Auth Required:** No
* **Query Parameters:** `category` (`frontend`, `backend`, `devops`, `database`)

#### Response (`200 OK`)
```json
[
  {
    "id": 1,
    "name": "Python & Django",
    "category": "backend",
    "proficiency": 95,
    "icon": "python-icon",
    "display_order": 1
  },
  {
    "id": 2,
    "name": "PostgreSQL & Docker",
    "category": "devops",
    "proficiency": 90,
    "icon": "docker-icon",
    "display_order": 2
  }
]