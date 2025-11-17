# 🐰 LapinouMath

Une application éducative ludique pour aider les enfants du CE1 à la 4ème à apprendre les mathématiques avec CalcuLapin !

## 🎯 Fonctionnalités

- ✅ **Multi-profils** : Plusieurs enfants peuvent utiliser l'application
- ✅ **7 niveaux scolaires** : CE1, CE2, CM1, CM2, 6ème, 5ème, 4ème
- ✅ **6 domaines par niveau** :
  - Calcul mental
  - Arithmétique
  - Géométrie
  - Fractions/Décimaux
  - Mesures
  - Problèmes/Algèbre
- ✅ **Système de progression** : Étoiles et déblocage progressif
- ✅ **Questions variées** : QCM avec explications détaillées
- ✅ **Cours intégrés** : Leçons étape par étape
- ✅ **Stockage local** : Progression sauvegardée automatiquement

## 🚀 Installation et lancement

### Prérequis
- Node.js (version 18 ou supérieure)
- npm

### Installation des dépendances
```bash
npm install
```

### Lancement en mode développement
```bash
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:5173`

### Build pour production
```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`

## 📚 Structure du projet

```
LapinouMath/
├── src/
│   ├── components/          # Composants React
│   │   ├── ProfileSelection.tsx
│   │   ├── Dashboard.tsx
│   │   └── QuizScreen.tsx
│   ├── data/               # Données et questions
│   │   ├── constants.ts
│   │   ├── questions.ts
│   │   └── questionsCE1.ts
│   ├── utils/              # Utilitaires
│   │   └── storage.ts
│   ├── types.ts            # Types TypeScript
│   ├── App.tsx             # Composant principal
│   ├── main.tsx            # Point d'entrée
│   └── index.css           # Styles globaux
├── public/                 # Fichiers statiques
├── index.html              # Page HTML principale
├── package.json            # Dépendances
├── tsconfig.json           # Configuration TypeScript
├── vite.config.ts          # Configuration Vite
└── tailwind.config.js      # Configuration Tailwind CSS
```

## 🎮 Comment utiliser

1. **Créer un profil** : Au premier lancement, créez un profil avec le prénom de l'enfant et son niveau scolaire
2. **Choisir un domaine** : Sur le tableau de bord, sélectionnez un domaine mathématique
3. **Répondre aux questions** : Choisissez la bonne réponse parmi les options proposées
4. **Consulter les cours** : Cliquez sur "Voir le cours" pour une leçon détaillée
5. **Gagner des étoiles** : Obtenez des étoiles en fonction de votre taux de réussite
6. **Débloquer des domaines** : Progressez pour débloquer de nouveaux domaines

## 🌟 Système de progression

- **1 étoile** : 50% de réussite sur au moins 5 questions
- **2 étoiles** : 60% de réussite sur au moins 10 questions
- **3 étoiles** : 75% de réussite sur au moins 15 questions

## 🎨 Technologies utilisées

- **React 18** : Framework UI
- **TypeScript** : Typage statique
- **Vite** : Build tool rapide
- **Tailwind CSS** : Styles utilitaires
- **LocalStorage** : Sauvegarde des données

## 📝 Banque de questions

**Total : 2220 questions disponibles !** ✅

### Répartition par niveau :
- **CE1** : 300 questions (50 par domaine)
  - Questions manuelles : 170 (Calcul mental, Arithmétique détaillées)
  - Questions générées : 130 (Géométrie, Fractions, Mesures, Problèmes)
- **CE2** : 300 questions (50 par domaine) - générées programmatiquement
- **CM1** : 300 questions (50 par domaine) - générées programmatiquement
- **CM2** : 300 questions (50 par domaine) - générées programmatiquement
- **6ème** : 300 questions (50 par domaine) - générées programmatiquement
- **5ème** : 300 questions (50 par domaine) - générées programmatiquement
- **4ème** : 300 questions (50 par domaine) - générées programmatiquement

### Ordre de déblocage :
- ⭐ **1 étoile** (50% de réussite sur 5 questions) → Débloquer le domaine suivant
- ⭐⭐ **2 étoiles dans tous les domaines** → Débloquer le niveau suivant (ex: CE1 → CE2)

### Note de développement :
Les questions pour les niveaux CE2 à 4ème sont générées programmatiquement comme placeholder. 
Vous pouvez les remplacer par de vraies questions adaptées à chaque niveau en éditant les fichiers dans `src/data/`.

## 🔜 Améliorations futures

- [ ] Ajout des questions pour tous les niveaux (CE2 à 4ème)
- [ ] Questions de géométrie interactives avec dessins
- [ ] Système d'accessoires pour personnaliser CalcuLapin
- [ ] Mode révision pour revoir les questions manquées
- [ ] Statistiques détaillées par domaine
- [ ] Mode entraînement chronométré
- [ ] Certificats de réussite à imprimer

## 👨‍👩‍👧‍👦 Pour les parents

Cette application est conçue pour être utilisée de manière autonome par les enfants, mais vous pouvez :
- Suivre la progression via les statistiques du tableau de bord
- Créer plusieurs profils pour vos enfants
- Les données sont sauvegardées localement dans le navigateur

## 📄 Licence

Projet personnel pour usage éducatif familial.

---

Développé avec ❤️ pour l'apprentissage des mathématiques
