### `docs/api/research.md`

```markdown
# Research & Whitepapers API

Tracks ongoing academic and experimental research projects.

## Endpoints

### 1. List Research Papers
* **URL:** `/api/research/`
* **Method:** `GET`
* **Auth Required:** No

#### Response (`200 OK`)
```json
[
  {
    "id": 1,
    "title": "Optimizing Relational Queries on Partitioned PostgreSQL Datasets",
    "field": "Database Engineering",
    "status": "Published",
    "abstract": "An empirical analysis of partition pruning techniques in high-volume PostgreSQL workloads.",
    "pdf_url": "/media/research/postgresql-optimization.pdf"
  }
]