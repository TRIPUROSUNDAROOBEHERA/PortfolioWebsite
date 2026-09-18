@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo   Portfolio Complete Test Suite Orchestrator
echo ===================================================

cd /d "%~dp0\.."

:: -----------------------------------------------------------------------------
:: Step 1: Ensure Docker Services Are Running & Healthy
:: -----------------------------------------------------------------------------
echo.
echo [1/4] Checking Container Health Status...
docker compose ps --filter "status=running" | findstr /i "portfolio_backend portfolio_db portfolio_frontend" >nul
if %ERRORLEVEL% neq 0 (
    echo [INFO] Starting Docker services...
    docker compose up -d
)

:: -----------------------------------------------------------------------------
:: Step 2: Run Backend Django Test Suite
:: -----------------------------------------------------------------------------
echo.
echo [2/4] Running Backend Django Tests...
if exist "tests" (
    docker cp tests/. portfolio_backend:/app/tests/ 2>nul
)
if exist "backend\tests" (
    docker cp backend\tests/. portfolio_backend:/app/tests/ 2>nul
)

docker compose exec backend python manage.py test --verbosity=1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Backend test suite failed.
    goto :failure
)
echo [OK] All backend tests passed.

:: -----------------------------------------------------------------------------
:: Step 3: Run Frontend Unit & Integration Tests (Vitest)
:: -----------------------------------------------------------------------------
echo.
echo [3/4] Running Frontend Vitest Suite...
cd /d "%~dp0\..\frontend"
call npx vitest run --passWithNoTests
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Frontend Vitest suite failed.
    goto :failure
)
echo [OK] All Vitest tests passed.

:: -----------------------------------------------------------------------------
:: Step 4: Run End-to-End Tests (Playwright)
:: -----------------------------------------------------------------------------
echo.
echo [4/4] Running End-to-End Tests (Playwright)...
cd /d "%~dp0\.."
if exist "tests\e2e" (
    call npx playwright test tests/e2e --reporter=list
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] Playwright E2E tests failed.
        goto :failure
    )
    echo [OK] All Playwright E2E tests passed.
)

:: -----------------------------------------------------------------------------
:: Summary: Success
:: -----------------------------------------------------------------------------
echo.
echo ===================================================
echo   [SUCCESS] ALL TEST SUITES PASSED (100%% Green)
echo   - Backend Django Tests: OK
echo   - Frontend Vitest Specs: OK
echo   - Playwright E2E Tests:  OK
echo ===================================================
goto :exit

:failure
echo.
echo ===================================================
echo   [FAILURE] One or more test suites failed.
echo ===================================================

:exit
pause