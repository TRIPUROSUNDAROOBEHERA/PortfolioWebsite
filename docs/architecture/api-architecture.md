# API Architecture

RESTful API design adhering to standard resource naming conventions and response formatting.

## Standards
* **Versioning:** `/api/v1/` or root `/api/` prefix.
* **Authentication:** Bearer token via `Authorization: Bearer <token>`.
* **Pagination:** Standard limit-offset or page-number pagination on list endpoints.
* **Error Handling:** Standardized JSON error response payloads with HTTP status codes (`400`, `401`, `403`, `404`, `500`).