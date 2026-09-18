### `docs/api/certificates.md`

```markdown
# Certificates & Credentials API

Manages industry certifications, course completion licenses, and verification URLs.

## Endpoints

### 1. List Certificates
* **URL:** `/api/certificates/`
* **Method:** `GET`
* **Auth Required:** No

#### Response (`200 OK`)
```json
[
  {
    "id": 1,
    "title": "AWS Certified Solutions Architect – Associate",
    "issuing_organization": "Amazon Web Services",
    "issue_date": "2025-06-15",
    "expiration_date": "2028-06-15",
    "credential_id": "AWS-PSA-994820",
    "credential_url": "[https://aws.amazon.com/verify](https://aws.amazon.com/verify)",
    "thumbnail": "/media/certificates/aws-csa.webp"
  }
]