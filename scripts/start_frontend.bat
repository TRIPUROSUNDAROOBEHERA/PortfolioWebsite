@echo off
echo ===================================================
echo   Starting React Frontend Service
echo ===================================================

cd /d "%~dp0\.."

:: If running via Docker Compose
docker compose up -d frontend
docker compose logs -f frontend