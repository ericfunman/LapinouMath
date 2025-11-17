# 📚 Guide Complet - LapinouMath

## 🎯 Vue d'ensemble du système

LapinouMath est une application éducative avec **deux niveaux de sauvegarde**:

### 1. **Frontend (Navigateur)**
- **IndexedDB** (prioritaire) - Base de données locale performante
- **LocalStorage** (fallback) - Sauvegarde simple et fiable

### 2. **Backend (Serveur)**
- **PostgreSQL** - Base de données persistante
- **API REST** - Synchronisation avec le serveur

---

## 💾 Comment fonctionnent les PROFILS et QUESTIONS

### 📋 **Sauvegarde des Profils**

#### Flux de sauvegarde:
```
Créer/Modifier profil
    ↓
LocalStorage (immédiat)
    ↓
IndexedDB (en arrière-plan)
    ↓
Backend PostgreSQL (quand synchronisé)
```

#### Exemple de structure d'un profil:
```javascript
{
  id: "profile-1732000000000-0",
  name: "Jean",
  gradeLevel: "CE1",
  totalStars: 450,
  progress: {
    "CE1": {
      "addition": {
        questionsAnswered: 25,
        correctAnswers: 23,
        currentLevel: 3,
        unlockedLevels: [1, 2, 3]
      },
      "multiplication": {
        questionsAnswered: 10,
        correctAnswers: 8,
        currentLevel: 2,
        unlockedLevels: [1, 2]
      }
    }
  }
}
```

**Code:**
```typescript
// src/utils/storage.ts
export function saveProfile(profile: UserProfile): void {
  // 1. Charger tous les profils
  const profiles = getAllProfiles();
  
  // 2. Chercher ou créer le profil
  const index = profiles.findIndex(p => p.id === profile.id);
  if (index >= 0) {
    profiles[index] = profile;  // Mise à jour
  } else {
    profiles.push(profile);     // Créer nouveau
  }
  
  // 3. Sauvegarder dans LocalStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  
  // 4. Synchroniser vers IndexedDB (en arrière-plan)
  syncProfilesToIndexedDB(profiles);
}
```

### ❓ **Sauvegarde des Questions**

Les questions sont **stockées localement** dans le code:

```
src/data/
├── questions.ts              # Questions générales
├── questionsCE1.ts           # Questions spécifiques CE1
├── questionsCE1Additional.ts # Questions supplémentaires CE1
├── generatedQuestions.ts     # Questions générées dynamiquement
└── constants.ts              # Niveaux et domaines (addition, multiplication, etc.)
```

**Aucune base de données pour les questions** - elles sont:
- ✅ Chargées au démarrage de l'app
- ✅ Mises en cache dans le navigateur
- ✅ Accessibles hors ligne (offline-first)

### 🔄 **Synchronisation Frontend-Backend**

Quand vous lancez avec le backend:

```
1. Frontend récupère les profils locaux
2. Au lancement → POST /api/auth/login
3. Reçoit JWT token
4. POST /api/progress/sync/profile-id
5. Envoie tout le progrès au backend
6. Backend sauvegarde dans PostgreSQL
```

---

## 🚀 Comment LANCER votre application

### **Option 1: Frontend SEULEMENT (Mode rapide)**

Parfait pour développer rapidement, tout fonctionne localement.

#### Étapes:

1. **Ouvrez un terminal** et allez au dossier:
```bash
cd c:\Users\lapin\OneDrive\Documents\Developpement\LapinouMath
```

2. **Lancez le développement**:
```bash
npm run dev
```

3. **L'app s'ouvre automatiquement** sur:
```
http://localhost:5173
```

✅ **Tout fonctionne** - créez des profils, résolvez des exercices, tout est sauvegardé localement!

---

### **Option 2: Frontend + Backend (Complet)**

Pour tester la synchronisation avec le serveur.

#### Étape 1: Démarrez PostgreSQL

```bash
# Avec Docker (recommandé):
cd backend
docker-compose up -d

# Ou lancez PostgreSQL manuellement sur localhost:5432
```

#### Étape 2: Lancez le backend

**Terminal 1:**
```bash
cd backend
npm install  # Si première fois
npm run dev
```

Vous verrez:
```
Server running on http://localhost:3001
Initializing database...
Running migrations...
```

#### Étape 3: Lancez le frontend

**Terminal 2:**
```bash
cd . (retour au dossier principal)
npm run dev
```

L'app s'ouvre sur `http://localhost:5173`

#### Étape 4: Utilisez l'application

- **Créez un compte**: S'inscrire via l'interface
- **Créez un profil**: Jean (CE1)
- **Résolvez des exercices**: Les données se sauvegardent
- **Synchronisez**: L'app envoie vers le backend automatiquement

✅ **Profils dans PostgreSQL** + **Synchronisation en temps réel**

---

## 📱 Vérifier les données

### **Voir les profils locaux (Frontend)**

Ouvrez la console du navigateur:
```javascript
// Dans l'inspecteur (F12 → Console):

// Voir les profils
JSON.parse(localStorage.getItem('lapinoumath_profiles'))

// Voir les étoiles totales
const profiles = JSON.parse(localStorage.getItem('lapinoumath_profiles'));
profiles[0].totalStars
```

### **Voir les profils dans la base de données (Backend)**

Si vous avez PostgreSQL:

```bash
# Se connecter à PostgreSQL
psql -U user -d lapinoumath_dev

# Voir les utilisateurs
SELECT * FROM users;

# Voir les profils
SELECT * FROM profiles;

# Voir le progrès
SELECT * FROM progress;
```

---

## 🔧 Scripts disponibles

### **Frontend**
```bash
npm run dev          # Développement (Vite hot-reload)
npm run build        # Compiler pour production
npm run preview      # Voir la version compilée
npm test             # Lancer les tests
npm test:ui          # Tests avec interface visuelle
npm test:coverage    # Voir la couverture de code
```

### **Backend**
```bash
cd backend
npm run dev          # Développement
npm run build        # Compiler TypeScript
npm start            # Lancer le serveur compilé
npm run test         # Lancer les tests
npm run db:migrate   # Créer les tables
npm run lint         # Vérifier le code
```

---

## ⚙️ Configuration

### **Variables d'environnement Backend**

Créer `backend/.env`:
```
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=lapinoumath_dev
DB_USERNAME=user
DB_PASSWORD=password
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:5173
```

---

## 📊 Structure des données

### **Base de données PostgreSQL** (Backend)

```sql
-- Utilisateurs
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR UNIQUE,
  username VARCHAR UNIQUE,
  password_hash VARCHAR
);

-- Profils
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER FOREIGN KEY,
  name VARCHAR,
  grade_level VARCHAR,
  total_stars INTEGER
);

-- Progrès
CREATE TABLE progress (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER FOREIGN KEY,
  level INTEGER,
  domain VARCHAR,
  stats JSONB  -- Données JSON complexes
);
```

### **LocalStorage** (Frontend)

```javascript
{
  "lapinoumath_profiles": [
    {
      id: "...",
      name: "Jean",
      gradeLevel: "CE1",
      totalStars: 450,
      progress: { ... }
    }
  ]
}
```

---

## ❓ Cas d'usage courants

### **Cas 1: Créer un profil et résoudre des exercices**

```
1. npm run dev (lancez le frontend)
2. Cliquez "Créer un profil"
3. Entrez "Jean", "CE1"
4. Résolvez des additions
5. Gagnez des étoiles ⭐
6. Tout est sauvegardé automatiquement
```

### **Cas 2: Tester la sauvegarde backend**

```
1. Lancez le backend: cd backend && npm run dev
2. Lancez le frontend: npm run dev
3. Inscrivez-vous sur l'app
4. Les données se synchronisent vers PostgreSQL
5. Vérifiez: SELECT * FROM users; (dans PostgreSQL)
```

### **Cas 3: Développer une nouvelle fonctionnalité**

```
1. npm run dev         # Développement frontend
2. npm test:ui         # Tests en direct (F12)
3. Modifiez le code
4. Les changements se rechargent automatiquement
5. npm run build       # Compilez pour production
```

---

## 🐛 Troubleshooting

### **"npm not found"**
```bash
# Installez Node.js: https://nodejs.org/
# Puis redémarrez votre terminal
```

### **"Port 5173 déjà utilisé"**
```bash
# Tuez le processus:
taskkill /PID <PID> /F

# Ou lancez sur un autre port:
npm run dev -- --port 3000
```

### **"PostgreSQL connection refused"**
```bash
# Vérifiez que PostgreSQL/Docker est lancé:
docker ps

# Ou lancez le conteneur:
cd backend && docker-compose up -d
```

### **"Les profils ne se sauvegardent pas"**
```bash
# Vérifiez IndexedDB dans le navigateur:
F12 → Application → IndexedDB → LapinouMath

# Ou vérifiez LocalStorage:
F12 → Application → LocalStorage → http://localhost:5173
```

---

## 📚 Fichiers importants

```
LapinouMath/
├── src/
│   ├── App.tsx                 # Application principale
│   ├── utils/storage.ts        # Gestion profils (LocalStorage + IndexedDB)
│   ├── utils/database.ts       # Interface IndexedDB
│   ├── data/questions.ts       # Base de questions
│   ├── components/             # Composants React
│   └── styles/                 # CSS Tailwind
├── backend/
│   ├── src/server.ts           # Serveur Express
│   ├── src/database.ts         # Connexion PostgreSQL
│   ├── src/migrations/         # Schéma base de données
│   └── src/routes/             # API endpoints
└── package.json                # Dépendances
```

---

## ✅ Checklist de démarrage

- [ ] Installer Node.js (si pas fait)
- [ ] `npm install` (dépendances)
- [ ] `npm run dev` (lancer l'app)
- [ ] Créer un profil
- [ ] Tester une question
- [ ] Voir les étoiles augmenter
- [ ] F12 → Application → Voir les données sauvegardées

---

**Vous êtes prêt!** 🎉

Lancez simplement `npm run dev` et profitez de LapinouMath! 
