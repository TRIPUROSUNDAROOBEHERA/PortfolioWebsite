@echo off
setlocal

echo ===================================================
echo   Portfolio Database Backup Utility (Docker / Postgres)
echo   Location: database\scripts\backup_database.bat
echo ===================================================

:: Navigate safely to root directory
if exist "%~dp0..\..\docker-compose.yml" (
    cd /d "%~dp0..\.."
) else if exist "%~dp0..\docker-compose.yml" (
    cd /d "%~dp0.."
) else (
    cd /d "%~dp0"
)

:: Create backups directory if missing
if not exist "database\backups" mkdir "database\backups"

:: Generate ISO timestamp
for /f "delims=" %%I in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd_HH-mm-ss"') do set "TIMESTAMP=%%I"
set "BACKUP_FILE=database\backups\portfolio_backup_%TIMESTAMP%.sql"

echo Backing up Docker PostgreSQL database to: %BACKUP_FILE%

:: Execute pg_dump as portfolio_user inside the container
docker exec portfolio_db pg_dump -U portfolio_user -d portfolio_db --clean --if-exists -f /tmp/backup.sql
docker cp portfolio_db:/tmp/backup.sql "%BACKUP_FILE%"
docker exec portfolio_db rm -f /tmp/backup.sql

if exist "%BACKUP_FILE%" (
    for %%F in ("%BACKUP_FILE%") do (
        echo [SUCCESS] Backup completed successfully!
        echo File size: %%~zF bytes
    )
) else (
    echo [ERROR] Backup failed.
)

echo ===================================================
pause