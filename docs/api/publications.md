### `docs/api/publications.md`

```markdown
# Publications API

Lists authored research papers, technical articles, and journal publications.

## Endpoints

### 1. List Publications
* **URL:** `/api/publications/`
* **Method:** `GET`
* **Auth Required:** No

#### Response (`200 OK`)
```json
[
  {
    "id": 1,
    "title": "High-Throughput Data Ingestion in Hybrid Cloud Architectures",
    "publisher": "IEEE Conference on Cloud Engineering",
    "publication_date": "2026-04-12",
    "doi": "10.1109/CLOUD.2026.00192",
    "paper_url": "[https://doi.org/10.1109/CLOUD.2026.00192](https://doi.org/10.1109/CLOUD.2026.00192)",
    "cover_image": "/media/publications/ieee-paper.webp"
  }
]