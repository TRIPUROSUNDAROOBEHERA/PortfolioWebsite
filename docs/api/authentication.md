# Authentication & Authorization API

Handles JWT authentication, token refreshing, user login, and session validation.

## Endpoints

### 1. Obtain Token Pair (Login)
* **URL:** `/api/auth/token/`
* **Method:** `POST`
* **Auth Required:** No

#### Request Body
```json
{
  "username": "admin",
  "password": "your_secure_password"
}