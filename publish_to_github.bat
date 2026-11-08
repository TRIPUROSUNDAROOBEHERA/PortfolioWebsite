@echo off
setlocal
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
echo [1/4] Configuring Git user details...
git config user.name "TRIPUROSUNDAROOBEHERA"
git config user.email "24jnf00084@svcn.ac.in"

echo.
echo [2/4] Staging all files...
git add -A

echo.
echo [3/4] Creating commit...
git commit -m "feat: complete portfolio updates, custom domain, and GitHub Pages deployment"

echo.
echo [4/4] Pushing to GitHub (origin main)...
git branch -M main
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo =====================================================================
    echo [SUCCESS] Your portfolio has been pushed to GitHub!
    echo The GitHub Action is now building and deploying to tripurosundaro.me
    echo =====================================================================
) else (
    echo =====================================================================
    echo [NOTICE] If the repository does not exist on GitHub yet:
    echo 1. Go to: https://github.com/new
    echo 2. Repository name: PortfolioWebsite
    echo 3. Keep it Public and do NOT initialize with README/license
    echo 4. Click 'Create repository'
    echo 5. Run this script again!
    echo =====================================================================
)

pause

