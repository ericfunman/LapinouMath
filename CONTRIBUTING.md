# Contributing to LapinouMath

Merci de votre intérêt pour LapinouMath ! 🐰

## Comment contribuer

### Ajouter de nouvelles questions

Les questions sont organisées par niveau dans `src/data/` :

1. **Pour améliorer les questions existantes** :
   - Éditez `src/data/questionsCE1.ts` pour le CE1
   - Les autres niveaux utilisent `src/data/generatedQuestions.ts`

2. **Format des questions** :
```typescript
{
  id: 'niveau-domaine-numero',
  level: 'CE1', // ou CE2, CM1, CM2, 6ème, 5ème, 4ème
  domain: 'Calcul mental', // ou autre domaine
  question: 'Combien font 5 + 3 ?',
  options: ['6', '7', '8', '9'],
  correctAnswer: 2, // Index de la bonne réponse (0-3)
  explanation: 'Explication détaillée',
  lesson: { // Optionnel
    title: 'Titre du cours',
    steps: ['Étape 1', 'Étape 2']
  },
  difficulty: 1 // 1 = Facile, 2 = Moyen, 3 = Difficile
}
```

### Améliorer l'interface

1. Fork le projet
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Commitez vos changements (`git commit -m 'feat: ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

### Signaler un bug

Ouvrez une issue sur GitHub avec :
- Description du problème
- Étapes pour reproduire
- Comportement attendu
- Captures d'écran si pertinent

## Standards de code

- TypeScript strict mode
- Tailwind CSS pour les styles
- Composants React fonctionnels
- ESLint pour la qualité du code

Merci pour votre contribution ! 🎉
