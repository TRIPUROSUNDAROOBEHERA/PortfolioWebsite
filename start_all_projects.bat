@echo off
title Start All Portfolio & Demo Project Servers
echo ========================================================
echo   Starting All Dev Servers for Portfolio & Live Demos
echo ========================================================

:: 1. Start TravelApp on Port 8001
echo [1/3] Starting Travel Plan Itinerary Generator (Port 8001)...
start "TravelApp - Port 8001" cmd /k "cd /d \"C:\Users\style\Videos\ram D drive data\projects\TravelApp\" && venv\Scripts\python.exe manage.py runserver 127.0.0.1:8001"

:: 2. Start Intrusion Detection System on Port 8002
echo [2/3] Starting Intrusion Detection System (Port 8002)...
start "Intrusion IDS - Port 8002" cmd /k "cd /d \"C:\Users\style\Videos\ram D drive data\projects\Intrusion\" && venv\Scripts\python.exe manage.py runserver 127.0.0.1:8002"

:: 3. Start Portfolio Website (Frontend + Backend)
echo [3/3] Starting Main Portfolio Website (Port 5173 + 8000)...
cd /d "%~dp0"
call npm run dev
