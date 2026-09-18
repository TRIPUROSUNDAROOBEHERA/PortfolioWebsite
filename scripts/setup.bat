@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo   Portfolio Platform Environment & Container Setup
echo ===================================================

cd /d "%~dp0\.."

:: 1. Check for .env file
if not exist ".env" (
    if exist ".env.example" (
        echo [INFO] Creating .env from .env.example...
        copy .env.example .env
    ) else (
        echo [WARN] No .env or .env.example found.
    )
)

:: 2. Build and start containers
echo [INFO] Building and starting Docker services...
docker compose up -d --build

:: 3. Run database migrations
echo [INFO] Applying PostgreSQL migrations...
docker compose exec backend python manage.py migrate

:: 4. Seed database fixtures if available
if exist "database\seeds\initial_data.json" (
    echo [INFO] Seeding initial database fixtures...
    docker cp database\seeds\initial_data.json portfolio_backend:/app/
    docker compose exec backend python manage.py loaddata initial_data.json
)

:: 5. Install frontend dependencies locally for linting/IDE support
if exist "frontend\package.json" (
    echo [INFO] Installing frontend local dependencies...
    cd frontend
    call npm install
    cd ..
)

echo ===================================================
echo [SUCCESS] Environment setup complete!
echo Frontend: http://localhost
echo Backend API: http://localhost:8000/api/
echo ===================================================
pause