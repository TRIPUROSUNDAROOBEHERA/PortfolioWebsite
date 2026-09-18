@echo off
echo ===================================================
echo   Starting Django Backend Container
echo ===================================================

cd /d "%~dp0\.."

docker compose up -d db backend
docker compose logs -f backend