# 📖 Réponses à VOS QUESTIONS

## ❓ Comment marche la sauvegarde des profils et des questions?

### 💾 PROFILS (Sauvegarde en 3 niveaux)

#### **Niveau 1: LocalStorage** ⚡ (IMMÉDIAT)
Quand vous créez ou modifiez un profil:
```
1. L'app sauvegarde IMMÉDIATEMENT dans LocalStorage
2. Vous pouvez voir les données dans le navigateur (F12)
3. Rien n'est perdu si vous fermez l'onglet
```

**Exemple:**
```javascript
// Ce qui est sauvegardé
{
  "id": "profile-1732000000000-0",
  "name": "Jean",
  "gradeLevel": "CE1",
  "totalStars": 450,
  "progress": {
    "CE1": {
      "addition": {
        "questionsAnswered": 25,
        "correctAnswers": 23,
        "currentLevel": 3
      }
    }
  }
}
```

#### **Niveau 2: IndexedDB** 📊 (CACHE PERSISTANT)
Également sauvegardé en arrière-plan (non bloquant):
```
- Plus performant que LocalStorage
- Peut stocker plusieurs GB
- Automatique et transparent
```

#### **Niveau 3: PostgreSQL Backend** 🗄️ (OPTIONNEL)
Si vous lancez le backend avec Docker:
```
- Les profils se synchronisent au serveur
- Permet la connexion multi-appareil
- Sauvegarde sécurisée dans une vraie base de données
```

**Flux complet:**
```
Créer/Modifier un profil
    ↓
LocalStorage (1ms - INSTANTANÉ)
    ↓
IndexedDB (100ms - en arrière-plan)
    ↓
Backend PostgreSQL (si connecté)
```

---

### ❓ QUESTIONS (Base de 2100 exercices)

Les questions **ne sont PAS** dans une base de données!

#### Elles sont dans le **CODE**:
```
src/data/
├── questions.ts              ← Questions générales
├── questionsCE1.ts           ← Spécifiques CE1
├── questionsCE1Additional.ts ← Extras CE1
└── constants.ts              ← Listes (niveaux, domaines)
```

#### Comment ça marche:
```
1. Au démarrage → L'app charge les 2100 questions en mémoire
2. Elles sont mises en cache → Très rapide
3. Vous pouvez jouer HORS LIGNE → Aucun internet nécessaire
4. Chaque question a:
   - Un énoncé (ex: "2 + 3 = ?")
   - La réponse correcte (5)
   - Un niveau de difficulté (1-5)
   - Un domaine (addition, multiplication, etc.)
```

**Exemple d'une question:**
```javascript
{
  id: 1,
  grade: "CE1",
  domain: "addition",
  level: 1,
  question: "2 + 3 = ?",
  options: [4, 5, 6, 7],
  correctAnswer: 5,
  hint: "Comptez sur vos doigts"
}
```

---

## 🚀 Comment LANCER votre application

### **OPTION 1: La plus SIMPLE (Frontend seul)**

#### Sur Windows:
1. Ouvrez **PowerShell** dans le dossier du projet
2. Tapez:
```powershell
.\StartLapinouMath.ps1
```

**C'est tout!** L'app se lance automatiquement sur `http://localhost:5173` 🎉

#### Sur Mac/Linux:
1. Ouvrez un terminal dans le dossier du projet
2. Tapez:
```bash
npm run dev
```

#### Qu'est-ce que vous pouvez faire?
✅ Créer des profils
✅ Résoudre 2100 questions
✅ Gagner des étoiles
✅ Débloquer des niveaux
✅ **Tout est sauvegardé automatiquement**

---

### **OPTION 2: Frontend + Backend (Plus complet)**

Si vous voulez aussi tester la synchronisation serveur:

#### Étape 1: Lancez PostgreSQL
```bash
cd backend
docker-compose up -d
```
(Cela crée une base de données dans Docker)

#### Étape 2: Lancez le Backend
**Terminal 1:**
```bash
cd backend
npm run dev
```

Vous verrez:
```
Server running on http://localhost:3001
Initializing database...
Running migrations...
```

#### Étape 3: Lancez le Frontend
**Terminal 2:**
```bash
npm run dev
```

L'app s'ouvre sur `http://localhost:5173`

#### Étape 4: Créez un compte
- Cliquez sur "Créer un compte"
- Email, username, password
- Vous êtes connecté!

#### Étape 5: Les données se synchronisent
- Créez un profil
- Résolvez des exercices
- Les données vont dans PostgreSQL
- Vous pouvez vous reconnecter plus tard et retrouver vos profils

---

## 📱 Vérifier vos données

### **Voir les profils dans le navigateur**

Ouvrez le navigateur (F12) et allez dans:
```
F12 → Application → LocalStorage → http://localhost:5173
```

Cherchez la clé: `lapinoumath_profiles`

Vous verrez vos profils en JSON!

### **Voir les profils dans IndexedDB**

```
F12 → Application → IndexedDB → LapinouMath
```

### **Voir les profils dans la base de données** (si backend)

```bash
# Se connecter à PostgreSQL
psql -U user -d lapinoumath_dev

# Voir les profils
SELECT * FROM profiles;

# Voir le progrès détaillé
SELECT * FROM progress;
```

---

## 🎯 Résumé

| Élément | Où? | Comment? |
|---------|-----|---------|
| **Profils** | LocalStorage + IndexedDB + PostgreSQL (backend) | Automatique à chaque modification |
| **Questions** | Code (src/data/) | 2100 exercices, chargés au démarrage |
| **Étoiles** | Sauvegardées avec le profil | 🌟 Une étoile par bonne réponse |
| **Niveaux** | Déverrouillés automatiquement | Une fois le seuil atteint |

---

## ⚡ 3 Commandes essentielles

```bash
# 1. Lancer l'app (frontend seul)
npm run dev

# 2. Voir les tests
npm test:ui

# 3. Compiler pour production
npm run build
```

---

## 🎓 Exemples concrets

### Cas 1: Créer un profil et jouer
```
1. .\StartLapinouMath.ps1              (lance l'app)
2. Dashboard → Créer un profil
3. Entrez: Jean, CE1
4. Cliquez sur "Jean"
5. Résolvez des additions
6. Gagnez des étoiles ⭐
7. Les données sont sauvegardées!
```

### Cas 2: Vérifier la sauvegarde
```
1. Fermez l'app
2. Relancez: npm run dev
3. Les profils sont toujours là!
4. Les étoiles aussi!
```

### Cas 3: Avec le backend
```
1. docker-compose up -d           (PostgreSQL)
2. cd backend && npm run dev      (Serveur)
3. npm run dev                     (App)
4. Créez un compte
5. Les données se synchronisent
```

---

## ✅ Checklist de lancement

- [ ] Node.js installé (https://nodejs.org/)
- [ ] Terminal ouvert dans le bon dossier
- [ ] `npm run dev` ou `.\StartLapinouMath.ps1`
- [ ] App ouverte sur http://localhost:5173
- [ ] Vous pouvez créer un profil
- [ ] Les données sont sauvegardées

---

## 🆘 Problèmes courants

### "npm: commande non trouvée"
→ Installez Node.js: https://nodejs.org/

### "Port 5173 déjà utilisé"
→ Fermez l'autre instance ou changez de port

### "Cannot connect to database"
→ Lancez: `docker-compose up -d`

### "Les données ne se sauvegardent pas"
→ Vérifiez F12 → Application → LocalStorage

---

**Vous êtes prêt(e)! Lancez simplement `npm run dev` et amusez-vous!** 🚀
