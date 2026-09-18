### `docs/api/education.md`

```markdown
# Education & Academic History API

Details degree programs, institutions, GPA scores, and core subjects.

## Endpoints

### 1. List Education Records
* **URL:** `/api/education/`
* **Method:** `GET`
* **Auth Required:** No

#### Response (`200 OK`)
```json
[
  {
    "id": 1,
    "degree": "Bachelor of Technology in Computer Science & Engineering",
    "institution": "Jawaharlal Nehru Technological University",
    "location": "Hyderabad, Telangana, India",
    "start_year": 2021,
    "end_year": 2025,
    "grade": "8.7 CGPA",
    "description": "Specialized in Distributed Computing, Data Structures, and Cloud Architecture."
  }
]