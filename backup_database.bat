@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo   Portfolio Database Backup Utility (Root)
echo ===================================================

cd /d "%~dp0"

if exist "database\scripts\backup_database.bat" (
    call "database\scripts\backup_database.bat"
) else (
    echo [ERROR] Target script "database\scripts\backup_database.bat" not found.
    pause
)