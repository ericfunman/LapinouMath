# Vérifier et Activer GitHub Pages

## Étape 1 : Vérifier l'activation

1. Aller sur : https://github.com/ericfunman/LapinouMath/settings/pages
2. Vous devez voir :
   - **Source** : "GitHub Actions" (dropdown)
   - **Branch** : Aucune branche ne doit être sélectionnée
   - Un message indiquant "Your site is live at https://ericfunman.github.io/LapinouMath/"

## Étape 2 : Si ce n'est pas activé

### Option A : Via l'interface GitHub
1. Aller sur https://github.com/ericfunman/LapinouMath/settings/pages
2. Dans **Source**, sélectionner **"GitHub Actions"**
3. Cliquer sur **Save**

### Option B : Via un commit de configuration
Le workflow est déjà configuré. Il suffit de :
1. Faire un commit vide pour relancer le workflow
2. Exécuter dans PowerShell :
```powershell
git commit --allow-empty -m "chore: trigger GitHub Pages deployment"
git push origin main
```

## Étape 3 : Vérifier le workflow

1. Aller sur https://github.com/ericfunman/LapinouMath/actions
2. Le workflow "Deploy LapinouMath to GitHub Pages" doit :
   - Job **build** : ✅ Success
   - Job **deploy** : ✅ Success (pas de 404)

## Erreur actuelle

L'erreur `404 Not Found` dans le job `deploy` signifie que GitHub Pages n'est PAS activé avec la source "GitHub Actions".

**Solution** : Aller manuellement sur https://github.com/ericfunman/LapinouMath/settings/pages et sélectionner "GitHub Actions" comme source.

## Une fois activé

Le site sera disponible à : https://ericfunman.github.io/LapinouMath/

Les déploiements se feront automatiquement à chaque push sur `main`.
