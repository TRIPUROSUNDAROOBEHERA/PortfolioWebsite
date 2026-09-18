@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo   Portfolio Database Restore Utility (Docker / Postgres)
echo ===================================================

:: Navigate to root directory
if exist "%~dp0..\..\docker-compose.yml" (
    cd /d "%~dp0..\.."
) else if exist "%~dp0..\docker-compose.yml" (
    cd /d "%~dp0.."
) else (
    cd /d "%~dp0"
)

:: Find the latest .sql backup file
set LATEST_BACKUP=
for /f "delims=" %%F in ('dir /b /o-d "database\backups\*.sql" 2^>nul') do (
    set "LATEST_BACKUP=database\backups\%%F"
    goto :found_backup
)

:found_backup
if "%LATEST_BACKUP%"=="" (
    echo [ERROR] No .sql backup files found in database\backups\
    goto :exit
)

echo Selected Latest Backup: %LATEST_BACKUP%
echo [WARNING] This will overwrite existing data in portfolio_db!
set /p CONFIRM="Proceed with restore? (y/N): "
if /i not "%CONFIRM%"=="y" (
    echo Restore cancelled.
    goto :exit
)

echo Restoring database...
docker exec -i -e PGPASSWORD=portfolio_secret_password portfolio_db psql -U portfolio_user -d portfolio_db < "%LATEST_BACKUP%"

if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] Database restored successfully!
) else (
    echo [ERROR] Database restore failed.
)

:exit
echo ===================================================
pause