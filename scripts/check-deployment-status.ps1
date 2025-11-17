# Script pour vérifier le statut du déploiement GitHub Actions
# Usage: .\scripts\check-deployment-status.ps1

$repo = "ericfunman/LapinouMath"
$apiBase = "https://api.github.com/repos/$repo"

Write-Host ""
Write-Host "Verification du statut de deploiement de LapinouMath..." -ForegroundColor Cyan
Write-Host ""

# Fonction pour faire une requête à l'API GitHub
function Get-GitHubApi {
    param($url)
    try {
        $response = Invoke-RestMethod -Uri $url -Headers @{
            "Accept" = "application/vnd.github.v3+json"
            "User-Agent" = "PowerShell"
        }
        return $response
    }
    catch {
        Write-Host "Erreur lors de la requete: $_" -ForegroundColor Red
        return $null
    }
}

# 1. Vérifier le dernier workflow run
Write-Host "Workflows GitHub Actions:" -ForegroundColor Yellow
$workflows = Get-GitHubApi "$apiBase/actions/runs?per_page=5"

if ($workflows -and $workflows.workflow_runs) {
    $latestRun = $workflows.workflow_runs[0]
    $status = $latestRun.status
    $conclusion = $latestRun.conclusion
    $runNumber = $latestRun.run_number
    $createdAt = [DateTime]::Parse($latestRun.created_at).ToLocalTime()
    
    if ($conclusion -eq "success") {
        Write-Host "  [OK] Run #$runNumber - $status" -ForegroundColor Green
    }
    else {
        Write-Host "  [ERREUR] Run #$runNumber - $status" -ForegroundColor Red
    }
    
    Write-Host "     Conclusion: $conclusion"
    Write-Host "     Cree le: $createdAt"
    Write-Host "     URL: $($latestRun.html_url)"
    
    # Vérifier les jobs
    Write-Host ""
    Write-Host "Details des jobs:" -ForegroundColor Yellow
    $jobs = Get-GitHubApi "$apiBase/actions/runs/$($latestRun.id)/jobs"
    
    if ($jobs -and $jobs.jobs) {
        foreach ($job in $jobs.jobs) {
            if ($job.conclusion -eq "success") {
                Write-Host "  [OK] $($job.name) - $($job.status)" -ForegroundColor Green
            }
            elseif ($job.conclusion -eq "failure") {
                Write-Host "  [ERREUR] $($job.name) - $($job.status)" -ForegroundColor Red
                Write-Host "     Ce job a echoue. Voir les logs:" -ForegroundColor Red
                Write-Host "     $($job.html_url)" -ForegroundColor Blue
            }
            elseif ($job.conclusion -eq "skipped") {
                Write-Host "  [SKIP] $($job.name) - $($job.status)" -ForegroundColor Gray
            }
            else {
                Write-Host "  [EN COURS] $($job.name) - $($job.status)" -ForegroundColor Yellow
            }
        }
    }
}

# 2. Vérifier les Pages
Write-Host ""
Write-Host "GitHub Pages:" -ForegroundColor Yellow
$pages = Get-GitHubApi "$apiBase/pages"

if ($pages) {
    Write-Host "  [OK] GitHub Pages est active" -ForegroundColor Green
    Write-Host "     URL: $($pages.html_url)" -ForegroundColor Blue
    Write-Host "     Status: $($pages.status)"
    
    # Vérifier le dernier build de Pages
    $pagesBuilds = Get-GitHubApi "$apiBase/pages/builds/latest"
    if ($pagesBuilds) {
        $buildStatus = $pagesBuilds.status
        if ($buildStatus -eq "built") {
            Write-Host ""
            Write-Host "  [OK] Dernier build Pages: $buildStatus" -ForegroundColor Green
        }
        else {
            Write-Host ""
            Write-Host "  [EN COURS] Dernier build Pages: $buildStatus" -ForegroundColor Yellow
        }
        if ($pagesBuilds.updated_at) {
            $updatedAt = [DateTime]::Parse($pagesBuilds.updated_at).ToLocalTime()
            Write-Host "     Mis a jour: $updatedAt"
        }
    }
}
else {
    Write-Host "  [ERREUR] GitHub Pages n'est PAS active!" -ForegroundColor Red
    Write-Host "     Veuillez activer GitHub Pages dans les parametres:" -ForegroundColor Yellow
    Write-Host "     https://github.com/$repo/settings/pages" -ForegroundColor Blue
    Write-Host ""
    Write-Host "     Configuration requise:" -ForegroundColor Yellow
    Write-Host "     - Source: GitHub Actions" -ForegroundColor White
}

# Résumé final
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "RESUME" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

if ($workflows -and $latestRun.conclusion -eq "success") {
    Write-Host "[OK] Dernier workflow: SUCCES" -ForegroundColor Green
}
else {
    Write-Host "[ERREUR] Dernier workflow: ECHEC ou EN COURS" -ForegroundColor Red
}

if ($pages) {
    Write-Host "[OK] GitHub Pages: ACTIVE" -ForegroundColor Green
    Write-Host "Application accessible a: $($pages.html_url)" -ForegroundColor Blue
}
else {
    Write-Host "[ERREUR] GitHub Pages: NON ACTIVE" -ForegroundColor Red
    Write-Host "ACTION REQUISE: Activer GitHub Pages dans les parametres" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Pour relancer un workflow echoue:" -ForegroundColor Cyan
Write-Host "https://github.com/$repo/actions" -ForegroundColor Blue
Write-Host ""
