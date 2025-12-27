@echo off
echo ==========================================
echo   Shadow Memo - Server Launcher
echo ==========================================

REM Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js is NOT installed on this computer.
    echo.
    echo To run this app, you must install Node.js (LTS version).
    echo Please download it from: https://nodejs.org/
    echo.
    echo After installing, run this file again.
    echo.
    pause
    exit /b
)

echo.
echo [1/2] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to install dependencies.
    echo Please check your internet connection.
    pause
    exit /b
)

echo.
echo [2/2] Starting server...
echo.
echo When you see "Ready", open http://localhost:3000 in your browser.
echo.
call npm run dev

pause
