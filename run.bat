@echo off
setlocal
set "PATH=%LOCALAPPDATA%\Programs\nodejs;%LOCALAPPDATA%\Programs\Python\Python312;%LOCALAPPDATA%\Programs\Python\Python312\Scripts;%PATH%"
cd /d "%~dp0"
echo ===================================================
echo   Starting Portfolio Dev Servers (Django + React)
echo ===================================================
npm run dev
