# Integration Testing Suite

Comprehensive integration tests validating cross-boundary interactions between Django REST APIs, PostgreSQL, authentication tokens, and React frontend API service layers.

## Structure
* `backend/`: Django API endpoint, JWT flow, and PostgreSQL relational query integration tests.
* `frontend/`: React Testing Library and MSW/Axios integration tests validating client-server state sync.

## Execution

### Run Backend Integration Tests
```cmd
docker compose exec backend python manage.py test tests.integration.backend --verbosity=2