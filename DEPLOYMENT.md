# Configuration GitHub Pages

## Étapes pour activer le déploiement automatique

### 1. Activer GitHub Pages

1. Allez sur votre dépôt GitHub : https://github.com/ericfunman/LapinouMath
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Sous "Build and deployment" :
   - **Source** : Sélectionnez "GitHub Actions"
5. Enregistrez

### 2. Vérifier le déploiement

- Les workflows GitHub Actions se lancent automatiquement à chaque push sur `main`
- Allez dans l'onglet **Actions** pour voir l'avancement
- Une fois terminé, l'application sera disponible à : https://ericfunman.github.io/LapinouMath/

### 3. Workflow CI/CD

Le fichier `.github/workflows/deploy.yml` gère automatiquement :

✅ **Build** :
- Installation des dépendances
- Compilation TypeScript
- Build Vite pour production

✅ **Deploy** :
- Upload des fichiers de build
- Déploiement sur GitHub Pages

### 4. Modifications futures

Chaque fois que vous pushez du code sur la branche `main` :
1. Le workflow se déclenche automatiquement
2. L'application est buildée
3. Si le build réussit, elle est déployée
4. L'application est mise à jour sur GitHub Pages en quelques minutes

## Vérifications

- ✅ Dépôt GitHub créé : https://github.com/ericfunman/LapinouMath
- ✅ Code pushé sur la branche `main`
- ✅ Workflow GitHub Actions configuré
- ✅ Build local testé et fonctionnel
- ⏳ GitHub Pages à activer manuellement (voir étape 1)

## URL finale

Une fois GitHub Pages activé :
**https://ericfunman.github.io/LapinouMath/**

---

*Note : La première fois, il peut falloir 5-10 minutes pour que le site soit disponible après activation.*
