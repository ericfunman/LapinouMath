# 📺 TUTORIEL TEXTE - Lancer LapinouMath en 5 minutes

## ÉTAPE 1: Vérifier Node.js (30 secondes)

### Ouvrez PowerShell:
```powershell
node --version
npm --version
```

### Vous devez voir:
```
v18.x.x ou plus
9.x.x ou plus
```

**Si erreur:** Installez Node.js: https://nodejs.org/

---

## ÉTAPE 2: Aller au bon dossier (30 secondes)

### Tapez:
```powershell
cd c:\Users\lapin\OneDrive\Documents\Developpement\LapinouMath
```

### Vérifiez:
```powershell
ls
# Vous devriez voir:
# - src/
# - backend/
# - package.json
# - StartLapinouMath.ps1
```

---

## ÉTAPE 3: Lancer l'application (1 minute)

### OPTION A - La plus simple:
```powershell
.\StartLapinouMath.ps1
```

**L'app se lance automatiquement!** ✅

### OPTION B - Manuelle:
```powershell
npm run dev
```

### Vous devez voir:
```
  VITE v5.3.1  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## ÉTAPE 4: Utiliser l'application (3 minutes)

### Dans votre navigateur (automatiquement ouvert):

#### 1. Cliquez: "Créer un profil"
```
┌─────────────────────────┐
│ Créer un profil         │ ← Cliquez
└─────────────────────────┘
```

#### 2. Remplissez:
```
Nom du profil: Jean
Classe: CE1
```

#### 3. Cliquez: "Créer"
```
┌─────────────────────────┐
│ Créer                   │ ← Cliquez
└─────────────────────────┘
```

#### 4. Vous voyez le dashboard:
```
Dashboard
────────────────────
Jean (CE1)
⭐⭐⭐ 0 étoiles
```

#### 5. Cliquez sur "Jean":
```
┌─────────────────────────┐
│ Jean (CE1)              │ ← Cliquez
│ ⭐⭐⭐ 0 étoiles         │
└─────────────────────────┘
```

#### 6. Choisissez un domaine:
```
Que veux-tu apprendre?
────────────────────
□ Addition
□ Soustraction
□ Multiplication
□ Division
```

#### 7. Une question apparaît:
```
ADDITION - Niveau 1

    2 + 3 = ?

[4] [5] [6] [7]
```

#### 8. Cliquez la bonne réponse (5):
```
[4] [✓5] [6] [7]
```

#### 9. Vous gagnez une étoile:
```
Bravo! ⭐ +1 étoile
```

#### 10. La prochaine question:
```
3 + 4 = ?
...
```

---

## ✅ C'est tout!

### Vous avez:
✅ Créé un profil
✅ Résolu une question
✅ Gagné une étoile
✅ Les données sont sauvegardées automatiquement

---

## 🔍 Vérifier la sauvegarde (1 minute)

### Ouvrez les outils du navigateur:
```
Appuyez: F12
```

### Allez à:
```
Application → LocalStorage → http://localhost:5173
```

### Cherchez:
```
lapinoumath_profiles
```

### Cliquez et vous voyez:
```json
[
  {
    "id": "profile-xxx",
    "name": "Jean",
    "gradeLevel": "CE1",
    "totalStars": 10,
    "progress": { ... }
  }
]
```

**Vos données sont sauvegardées!** ✅

---

## 🎮 Continuer à jouer

### Options:
1. **Continuer l'addition** - Répondez à plus de questions
2. **Changer de domaine** - Essayez la multiplication
3. **Créer un profil** - Marie, CM1, etc.
4. **Arrêter et revenir** - Les données restent!

---

## 🛑 Arrêter l'application

### Appuyez:
```
CTRL + C
```

### Dans le terminal:
```
Shutting down gracefully...
```

---

## 🔄 Relancer l'application

### Les profils reviennent!

```powershell
npm run dev
```

### Vous voyez:
```
Dashboard
────────────────────
Jean (CE1)
⭐⭐⭐ 10 étoiles  ← AUGMENTÉES!
```

**Les données sont persistantes!** ✅

---

## 📊 Résultats attendus

### Après cette session:

```
Frontend
├─ Application lancée ✅
├─ Profil créé ✅
├─ Questions résolues ✅
├─ Étoiles gagnées ✅
└─ Données sauvegardées ✅

LocalStorage
├─ lapinoumath_profiles ✅
└─ Profil Jean visible ✅

IndexedDB
└─ Synchronisation auto ✅
```

---

## 🎓 Prochaines étapes (optionnelles)

### Si vous voulez aussi le backend:

#### Terminal 1:
```powershell
cd backend
docker-compose up -d
npm run dev
```

#### Terminal 2:
```powershell
npm run dev
```

### Puis:
- Créez un compte utilisateur
- Les profils se synchronisent à PostgreSQL
- Vous pouvez vous reconnecter plus tard

---

## ✨ Bonus: Commandes utiles

### Voir les tests:
```powershell
npm test:ui
```

### Compiler pour production:
```powershell
npm run build
```

### Voir la couverture de code:
```powershell
npm test:coverage
```

---

## 🆘 Problèmes courants

### "Port 5173 déjà utilisé"
```powershell
# Ou fermez l'autre instance
npm run dev -- --port 3000
```

### "npm not found"
```
Installez Node.js: https://nodejs.org/
Redémarrez PowerShell
```

### "Les données ne se sauvegardent pas"
```
Vérifiez F12 → Application → LocalStorage
Videz le cache du navigateur
Relancez l'app
```

---

## 📝 Résumé du tutoriel

| Étape | Durée | Commande | Résultat |
|-------|-------|---------|---------|
| 1. Vérifier Node.js | 30s | `node --version` | ✅ |
| 2. Aller au dossier | 30s | `cd ...LapinouMath` | ✅ |
| 3. Lancer l'app | 1m | `npm run dev` | ✅ |
| 4. Utiliser l'app | 3m | Cliquer/Jouer | ✅ |
| 5. Vérifier données | 1m | F12 → LocalStorage | ✅ |

**Total: ~5-10 minutes** ⏱️

---

## 🎉 Voilà!

Vous avez réussi! 

Vous savez maintenant:
- ✅ Comment lancer LapinouMath
- ✅ Comment créer un profil
- ✅ Comment jouer
- ✅ Comment les données sont sauvegardées
- ✅ Comment vérifier les données

**Amusez-vous à apprendre les maths!** 🐰🚀

---

**Créé:** 17 novembre 2025

**Durée totale:** 5-10 minutes

**Niveau:** Débutant

**Résultat:** Complètement opérationnel ✅
