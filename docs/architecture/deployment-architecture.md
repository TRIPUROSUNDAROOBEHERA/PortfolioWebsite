# Deployment Architecture

Containerized deployment utilizing multi-stage Docker builds and Docker Compose orchestration.

## Services & Scaling
* **`db`:** PostgreSQL relational database with healthchecks (`pg_isready`).
* **`backend`:** Non-root Gunicorn WSGI server running Django REST API.
* **`frontend`:** Production-optimized React build served through Nginx.
* **Networking:** Isolated bridge network (`portfolio_net`) securing internal container communication.