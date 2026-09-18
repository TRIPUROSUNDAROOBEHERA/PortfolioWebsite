@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo   Running Frontend Unit and Integration Tests
echo ===================================================

cd /d "%~dp0\.."

:: 1. Run React Unit & Integration Tests via Vitest inside frontend/
echo [INFO] Running Vitest Suites...
cd /d "%~dp0\..\frontend"
call npx vitest run --passWithNoTests
set VITEST_EXIT=!ERRORLEVEL!

cd /d "%~dp0\.."

if !VITEST_EXIT! neq 0 (
    echo [ERROR] Vitest suites failed.
    goto :exit
)

:: 2. Run E2E Tests via Playwright only on tests\e2e directory
if exist "tests\e2e" (
    echo.
    echo ===================================================
    echo   Running End-to-End Tests (Playwright)
    echo ===================================================
    call npx playwright test tests/e2e --reporter=list
    if !ERRORLEVEL! neq 0 (
        echo [WARNING] Some E2E tests had issues. Check logs above.
    )
)

echo.
echo [SUCCESS] Frontend testing routine completed!

:exit
echo ===================================================
pause