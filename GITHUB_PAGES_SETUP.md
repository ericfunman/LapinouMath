# Configuration GitHub Pages

## ⚠️ Action requise : Activer GitHub Pages

Pour que le déploiement automatique fonctionne, vous devez activer GitHub Pages dans les paramètres du repository :

### Étapes à suivre :

1. **Aller dans les paramètres** :
   - Visitez : https://github.com/ericfunman/LapinouMath/settings/pages

2. **Configurer la source** :
   - Dans "Build and deployment"
   - Sélectionnez "Source" : **GitHub Actions**
   - (PAS "Deploy from a branch")

3. **Sauvegarder** :
   - Les paramètres seront automatiquement sauvegardés

4. **Relancer le workflow** :
   - Allez sur https://github.com/ericfunman/LapinouMath/actions
   - Cliquez sur le dernier workflow échoué
   - Cliquez sur "Re-run all jobs"

### Une fois configuré :

L'application sera automatiquement déployée à chaque push sur la branche `main` à l'adresse :

🌐 **https://ericfunman.github.io/LapinouMath/**

---

## Vérification automatique du statut

Un script PowerShell est fourni pour vérifier l'état des déploiements :

```powershell
.\scripts\check-deployment-status.ps1
```

Ce script vérifie :
- ✅ État du dernier workflow GitHub Actions
- ✅ Statut du build
- ✅ Statut du déploiement
- ✅ URL de l'application déployée
