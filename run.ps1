$env:PATH = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
Set-Location $PSScriptRoot
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  Starting Portfolio Dev Servers (Django + React)" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
npm run dev
