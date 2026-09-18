### 7. `docs/api/profile.md`

```markdown
# Profile & Bio API

Core bio details, social links, resume download metadata, and personal branding.

## Endpoints

### 1. Get Public Profile
* **URL:** `/api/profile/`
* **Method:** `GET`
* **Auth Required:** No

#### Response (`200 OK`)
```json
{
  "full_name": "Full Stack Developer",
  "headline": "Django & React Specialist | DevOps & Cloud Native",
  "bio": "Building robust full-stack applications with modern architecture.",
  "location": "Hyderabad, Telangana, India",
  "avatar": "/media/profile/avatar.webp",
  "resume_url": "/media/documents/resume.pdf",
  "social_links": {
    "github": "[https://github.com/](https://github.com/)",
    "linkedin": "[https://linkedin.com/in/](https://linkedin.com/in/)"
  }
}