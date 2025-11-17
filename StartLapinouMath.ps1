# Script de lancement de LapinouMath
# Usage: .\StartLapinouMath.ps1

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    LAPINOUMATH - Lancement" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "Installation des dependances..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "ERREUR: Installation des dependances echouee" -ForegroundColor Red
        Write-Host ""
        exit 1
    }
    Write-Host ""
}

# Afficher les informations
Write-Host "Demarrage de l'application..." -ForegroundColor Green
Write-Host ""
Write-Host "  Application locale : http://localhost:5173" -ForegroundColor Blue
Write-Host "  Application en ligne : https://ericfunman.github.io/LapinouMath/" -ForegroundColor Blue
Write-Host ""
Write-Host "Appuyez sur CTRL+C pour arreter le serveur" -ForegroundColor Yellow
Write-Host ""
Write-Host "----------------------------------------" -ForegroundColor Cyan

# Lancer le serveur de développement
npm run dev
