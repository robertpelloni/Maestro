@echo off
setlocal
title Maestro
cd /d "%~dp0"

echo [Maestro] Starting...
where npm >nul 2>nul
if errorlevel 1 (
    echo [Maestro] npm not found. Please install it.
    pause
    exit /b 1
)

npm run dev

if errorlevel 1 (
    echo [Maestro] Exited with error code %errorlevel%.
    pause
)
endlocal
