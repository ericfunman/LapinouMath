# Configuration Tests et SonarCloud

## Tests de non-régression

### Installation
Les dépendances de test sont déjà installées :
- Vitest (test runner)
- @testing-library/react (tests composants)
- jsdom (environnement navigateur simulé)

### Lancer les tests

```powershell
# Tests en mode watch (interactif)
npm test

# Tests une seule fois
npm test -- --run

# Tests avec couverture
npm test -- --coverage

# Interface UI
npm run test:ui
```

### Structure des tests
```
src/test/
├── setup.ts                    # Configuration globale
├── data/
│   └── questions.test.ts       # Tests questions (2100 questions)
├── utils/
│   └── storage.test.ts         # Tests stockage profils
└── components/
    └── ProfileSelection.test.tsx # Tests composants React
```

## SonarCloud

### Configuration

1. **Créer un compte SonarCloud**
   - Aller sur https://sonarcloud.io/
   - Se connecter avec GitHub
   - Autoriser l'accès à votre organisation `ericfunman`

2. **Importer le projet**
   - Cliquer sur "+" → "Analyze new project"
   - Sélectionner `LapinouMath`
   - Choisir "With GitHub Actions"

3. **Créer le token SONAR_TOKEN**
   - Dans SonarCloud : Account → Security → Generate Token
   - Copier le token généré

4. **Ajouter le secret dans GitHub**
   - Aller sur https://github.com/ericfunman/LapinouMath/settings/secrets/actions
   - Cliquer sur "New repository secret"
   - Name: `SONAR_TOKEN`
   - Value: [coller le token]
   - Cliquer sur "Add secret"

5. **Vérifier la configuration**
   - Le fichier `sonar-project.properties` est déjà configuré
   - Le workflow `.github/workflows/deploy.yml` inclut SonarCloud

### Workflow CI/CD

Le workflow fait 4 jobs dans l'ordre :

1. **test** : Exécute les tests + couverture
2. **sonarcloud** : Analyse de code qualité
3. **build** : Build de production
4. **deploy** : Déploiement sur GitHub Pages

### Métriques analysées par SonarCloud

- **Bugs** : Erreurs potentielles
- **Vulnerabilities** : Failles de sécurité
- **Code Smells** : Problèmes de maintenabilité
- **Coverage** : Couverture de code par les tests
- **Duplications** : Code dupliqué

### Badges

Après configuration, ajoutez ces badges dans README.md :

```markdown
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ericfunman_LapinouMath&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ericfunman_LapinouMath)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ericfunman_LapinouMath&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ericfunman_LapinouMath)
```

## Commandes utiles

```powershell
# Build local (même que CI/CD)
npm run build

# Linter (si configuré)
npm run lint

# Tests + couverture
npm run test:coverage
```

## Debugging

Si le workflow échoue :

1. **Tests qui échouent** : `npm test -- --run`
2. **Build qui échoue** : `npm run build`
3. **SonarCloud qui échoue** : Vérifier que SONAR_TOKEN est configuré

Les logs sont disponibles sur :
https://github.com/ericfunman/LapinouMath/actions
