### `docs/api/media.md`

```markdown
# Media Manager API

Handles media file uploads, asset optimization, and CDN paths.

## Endpoints

### 1. Upload Media File
* **URL:** `/api/media/upload/`
* **Method:** `POST`
* **Auth Required:** Yes (`Bearer <token>`)
* **Content-Type:** `multipart/form-data`

#### Request Body
* `file`: Binary image/document file (PNG, JPG, WebP, PDF)
* `folder`: `projects` | `blogs` | `profile`

#### Response (`201 Created`)
```json
{
  "id": "med_918237",
  "url": "/media/projects/diagram-2026.webp",
  "file_size": 145028,
  "content_type": "image/webp"
}