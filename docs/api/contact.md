# Contact & Inquiries API

Handles contact form submissions, message tracking, and administrative notifications.

## Endpoints

### 1. Submit Inquiry
* **URL:** `/api/contact/`
* **Method:** `POST`
* **Auth Required:** No
* **Rate Limit:** 5 requests per hour / IP

#### Request Body
```json
{
  "name": "Alex Mercer",
  "email": "alex@example.com",
  "subject": "Project Collaboration Inquiry",
  "message": "Interested in building a web application together."
}