### `docs/api/future-plan.md`

```markdown
# Future Goals & Roadmap API

Details technical roadmaps, upcoming research directions, and milestones.

## Endpoints

### 1. List Roadmap Items
* **URL:** `/api/future-plans/`
* **Method:** `GET`
* **Auth Required:** No

#### Response (`200 OK`)
```json
[
  {
    "id": 1,
    "title": "Mastering Kubernetes & Service Mesh (Istio)",
    "target_quarter": "Q4 2026",
    "status": "in-progress",
    "description": "Deep dive into multi-cluster orchestration, zero-trust traffic encryption, and canary rollouts."
  }
]