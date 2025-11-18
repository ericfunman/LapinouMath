@echo off
REM Script de lancement de LapinouMath
REM Permet le double-clic pour lancer l'application

REM Lancer le script PowerShell avec un profile propre
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "& '%~dp0StartLapinouMath.ps1'"

REM Garder la fenêtre ouverte en cas d'erreur
if errorlevel 1 (
    pause
)