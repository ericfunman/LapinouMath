#!/usr/bin/env pwsh
<#
.SYNOPSIS
Récupère les issues SonarCloud/SonarQube via l'API REST
.DESCRIPTION
Script pour analyser les vraies issues SonarQube sans GUI
#>

# Configuration
$SONAR_HOST = "https://sonarcloud.io"  # ou ton instance SonarQube locale
$SONAR_PROJECT_KEY = "ericfunman_LapinouMath"  # À adapter
$SONAR_TOKEN = $env:SONAR_TOKEN  # À définir en variable d'environnement

if (-not $SONAR_TOKEN) {
    Write-Host "❌ SONAR_TOKEN non défini!" -ForegroundColor Red
    Write-Host "Définis: `$env:SONAR_TOKEN = 'ton_token_sonar'" -ForegroundColor Yellow
    exit 1
}

Write-Host "🔍 Récupération des issues SonarQube..." -ForegroundColor Cyan

# 1. Issues par sévérité
$params = @{
    "componentKeys" = $SONAR_PROJECT_KEY
    "types" = "BUG,CODE_SMELL,SECURITY_HOTSPOT,VULNERABILITY"
    "statuses" = "OPEN,REOPENED"
    "pageSize" = 500
}

$query = ($params.GetEnumerator() | ForEach-Object { "$($_.Key)=$($_.Value)" }) -join "&"
$url = "$SONAR_HOST/api/issues/search?$query"

try {
    $headers = @{
        "Authorization" = "Bearer $SONAR_TOKEN"
    }
    
    $response = Invoke-RestMethod -Uri $url -Headers $headers -Method Get
    
    Write-Host "`n📊 RÉSUMÉ DES ISSUES" -ForegroundColor Green
    Write-Host "==================" -ForegroundColor Green
    Write-Host "Total: $($response.total) issues`n" -ForegroundColor Cyan
    
    # Grouper par type
    $byType = $response.issues | Group-Object -Property type
    
    foreach ($group in $byType) {
        $icon = switch ($group.Name) {
            "BUG" { "🐛" }
            "CODE_SMELL" { "💨" }
            "SECURITY_HOTSPOT" { "🔓" }
            "VULNERABILITY" { "⚠️" }
            default { "❓" }
        }
        Write-Host "$icon $($group.Name): $($group.Count)" -ForegroundColor Yellow
    }
    
    # Grouper par sévérité
    Write-Host "`n📋 PAR SÉVÉRITÉ:" -ForegroundColor Green
    $bySeverity = $response.issues | Group-Object -Property severity
    
    foreach ($group in $bySeverity) {
        $color = switch ($group.Name) {
            "BLOCKER" { "Red" }
            "CRITICAL" { "Red" }
            "MAJOR" { "Yellow" }
            "MINOR" { "Cyan" }
            "INFO" { "White" }
            default { "Gray" }
        }
        Write-Host "  $($group.Name): $($group.Count)" -ForegroundColor $color
    }
    
    # Détail par fichier
    Write-Host "`n📂 PAR FICHIER:" -ForegroundColor Green
    $byFile = $response.issues | Group-Object -Property component | Sort-Object -Property Count -Descending
    
    foreach ($group in $byFile | Select-Object -First 15) {
        Write-Host "  $($group.Name): $($group.Count) issues" -ForegroundColor Magenta
    }
    
    # Afficher les hotspots en détail
    Write-Host "`n🔓 SECURITY HOTSPOTS EN DÉTAIL:" -ForegroundColor Red
    $hotspots = $response.issues | Where-Object { $_.type -eq "SECURITY_HOTSPOT" }
    
    if ($hotspots.Count -gt 0) {
        foreach ($hs in $hotspots) {
            Write-Host "`n  📍 $($hs.component):$($hs.line)" -ForegroundColor Red
            Write-Host "     Message: $($hs.message)" -ForegroundColor Yellow
            Write-Host "     Severity: $($hs.severity)" -ForegroundColor Yellow
            Write-Host "     Status: $($hs.status)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  ✅ Aucun hotspot!" -ForegroundColor Green
    }
    
    # Export JSON pour analyse
    $response.issues | ConvertTo-Json -Depth 10 | Out-File -FilePath "sonar_issues.json" -Encoding UTF8
    Write-Host "`n✅ Détail exporté dans sonar_issues.json" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Vérifie: " -ForegroundColor Yellow
    Write-Host "  1. SONAR_TOKEN valide" -ForegroundColor Yellow
    Write-Host "  2. SONAR_HOST correct" -ForegroundColor Yellow
    Write-Host "  3. SONAR_PROJECT_KEY correct" -ForegroundColor Yellow
}
