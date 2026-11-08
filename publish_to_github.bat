@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo =====================================================================
echo   TRIPUROSUNDARO BEHERA - PORTFOLIO GITHUB UPLOAD & PUBLISH SCRIPT
echo =====================================================================
echo.
echo Domain: tripurosundaro.me
echo GitHub Account: TRIPUROSUNDAROOBEHERA
echo Repository: PortfolioWebsite
echo Email: 24jnf00084@svcn.ac.in
echo.
echo [1/3] Configuring Git user details...
git config user.name "TRIPUROSUNDAROOBEHERA"
git config user.email "24jnf00084@svcn.ac.in"

echo.
echo [2/3] Checking branch...
git branch -M main

echo.
echo [3/3] Pushing to GitHub (origin main)...
echo (A GitHub login window may pop up in your browser. Click 'Authorize'.)
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =====================================================================
    echo [SUCCESS] Your portfolio has been pushed to GitHub!
    echo Check GitHub Actions tab to see your website building and deploying!
    echo =====================================================================
) else (
    echo.
    echo =====================================================================
    echo [NOTICE] If browser login did not connect, you can also push using a Personal Access Token:
    echo 1. Go to: https://github.com/settings/tokens
    echo 2. Generate a classic token with 'repo' scope
    echo 3. Enter your token below to push immediately:
    set /p GITHUB_TOKEN="Enter GitHub Token (or press Enter to exit): "
    if defined GITHUB_TOKEN (
        git push -u https://TRIPUROSUNDAROOBEHERA:!GITHUB_TOKEN!@github.com/TRIPUROSUNDAROOBEHERA/PortfolioWebsite.git main
    )
    echo =====================================================================
)

pause
