@echo off
setlocal

echo ===================================================
echo   Running Backend Unit and Integration Tests
echo ===================================================

cd /d "%~dp0\.."

:: Sync updated test files to container
if exist "tests" (
    docker cp tests/. portfolio_backend:/app/tests/ 2>nul
)
if exist "backend\tests" (
    docker cp backend\tests/. portfolio_backend:/app/tests/ 2>nul
)

docker compose exec backend python manage.py test --verbosity=2

if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] All backend tests passed!
) else (
    echo [ERROR] Backend tests failed.
)

pause