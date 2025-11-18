# Script de lancement de LapinouMath
# Usage: double-clic sur StartLapinouMath.bat

# Définir le répertoire courant
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    LAPINOUMATH - Lancement" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "Installation des dépendances..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "ERREUR: Installation échouée" -ForegroundColor Red
        Read-Host "Appuyez sur Entrée pour quitter"
        exit 1
    }
    Write-Host ""
}

# Afficher les informations
Write-Host "Démarrage du serveur de développement..." -ForegroundColor Green
Write-Host ""
Write-Host "  ➜ Accédez à : http://localhost:5173/" -ForegroundColor Blue
Write-Host ""
Write-Host "Appuyez sur CTRL+C pour arrêter le serveur" -ForegroundColor Yellow
Write-Host ""

# Lancer le serveur
npm run dev
