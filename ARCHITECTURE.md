# 🏗️ Architecture de LapinouMath

## Vue d'ensemble du système

```
┌─────────────────────────────────────────────────────────────────┐
│                      NAVIGATEUR DE L'UTILISATEUR                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │            Application React (localhost:5173)            │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │  • Créer/Gérer profils                                  │    │
│  │  • Afficher les questions (2100 exercices)              │    │
│  │  • Gagner des étoiles                                   │    │
│  │  • Débloquer des niveaux                                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                          ↓                                       │
│              ┌──────────────────────────┐                       │
│              │   MÉMOIRE LOCALE         │                       │
│              ├──────────────────────────┤                       │
│              │ LocalStorage             │ ← Prioritaire         │
│              │ (Sauvegarde immédiate)   │                       │
│              └──────────────────────────┘                       │
│                          ↓                                       │
│              ┌──────────────────────────┐                       │
│              │   IndexedDB              │                       │
│              │ (Cache persistant)       │ ← Backup              │
│              └──────────────────────────┘                       │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                          ↓
              (Optionnel: synchronisation)
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                         SERVEUR                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │    API Express.js (localhost:3001)                       │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │  • POST   /api/auth/register      - Créer compte        │    │
│  │  • POST   /api/auth/login         - Se connecter        │    │
│  │  • POST   /api/profiles           - Créer profil        │    │
│  │  • POST   /api/progress/sync/:id  - Synchroniser       │    │
│  └─────────────────────────────────────────────────────────┘    │
│                          ↓                                       │
│              ┌──────────────────────────┐                       │
│              │   PostgreSQL Database    │                       │
│              ├──────────────────────────┤                       │
│              │ • users                  │                       │
│              │ • profiles               │                       │
│              │ • progress               │                       │
│              │ • quiz_results           │                       │
│              │ • sync_logs              │                       │
│              └──────────────────────────┘                       │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1️⃣ Frontend - React + TypeScript

### Dossier: `src/`

#### Structure:
```
src/
├── App.tsx                      # Composant racine
├── components/
│   ├── Dashboard.tsx            # Affichage des profils
│   ├── ProfileSelection.tsx     # Choix du profil
│   ├── QuizGame.tsx             # Jeu des questions
│   └── ...autres composants
├── utils/
│   ├── storage.ts               # Gestion LocalStorage + IndexedDB
│   ├── database.ts              # Interface IndexedDB
│   ├── questionStats.ts         # Statistiques
│   └── ...fonctions utiles
├── data/
│   ├── questions.ts             # Base de 2100 questions
│   ├── constants.ts             # Niveaux (CE1-4ème)
│   └── ...données
├── types.ts                     # Interfaces TypeScript
└── styles/                      # CSS Tailwind
```

### Flux de données:

```
App.tsx
  ↓
┌─────────────────────────────────┐
│ 1. Charger profils (storage)    │
│    localStorage → IndexedDB     │
└─────────────────────────────────┘
  ↓
┌─────────────────────────────────┐
│ 2. Afficher dashboard           │
│    Voir tous les profils        │
└─────────────────────────────────┘
  ↓ [Clic sur un profil]
┌─────────────────────────────────┐
│ 3. Charger questions            │
│    Afficher d'un exercice       │
└─────────────────────────────────┘
  ↓ [Répondre à une question]
┌─────────────────────────────────┐
│ 4. Valider réponse              │
│    Calculer points/étoiles      │
│    Mettre à jour profil         │
└─────────────────────────────────┘
  ↓
┌─────────────────────────────────┐
│ 5. Sauvegarder                  │
│    → LocalStorage               │
│    → IndexedDB (async)          │
│    → Backend si connecté        │
└─────────────────────────────────┘
```

### Technologies:
- **React 18.3.1** - UI framework
- **TypeScript 5.5** - Type safety
- **Vite 5.3** - Build tool
- **Tailwind CSS 3.4** - Styling
- **Vitest** - Testing

---

## 2️⃣ Storage Local - IndexedDB + LocalStorage

### Comment ça marche:

```typescript
// 1. Charger les profils
const profiles = await getAllProfilesAsync();
// → Cherche dans IndexedDB en priorité
// → Fallback sur LocalStorage
// → Retourne un Array de UserProfile

// 2. Créer un profil
const newProfile = createProfile("Jean", "CE1");
// → Génère un ID unique (timestamp + counter)
// → Ajoute la structure de progrès
// → Sauvegarde dans localStorage immédiatement
// → Sync vers IndexedDB en arrière-plan

// 3. Mettre à jour le progrès
saveProfile(updatedProfile);
// → LocalStorage (immédiat)
// → IndexedDB (sync async)
```

### Avantages de ce système:

✅ **Offline-first** - Tout fonctionne sans internet

✅ **Performance** - IndexedDB = rapide pour gros volumes

✅ **Fiabilité** - LocalStorage = fallback simple

✅ **Pas de compte** - Pas besoin de backend pour jouer

---

## 3️⃣ Backend - Express + PostgreSQL

### Dossier: `backend/`

#### Structure:
```
backend/
├── src/
│   ├── server.ts                # Express app
│   ├── database.ts              # Connexion PostgreSQL
│   ├── config.ts                # Variables d'env
│   ├── controllers/             # Logique des routes
│   ├── services/                # Logique métier
│   ├── routes/                  # Définition API
│   ├── middleware/              # Auth, validation
│   └── migrations/              # Schéma DB
├── package.json
├── tsconfig.json
└── docker-compose.yml
```

### Base de données PostgreSQL:

```sql
-- 1. UTILISATEURS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  username VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. PROFILS (lié à un utilisateur)
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER FOREIGN KEY REFERENCES users(id),
  name VARCHAR NOT NULL,
  grade_level VARCHAR NOT NULL,
  total_stars INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. PROGRÈS (niveau + domaine pour chaque profil)
CREATE TABLE progress (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER FOREIGN KEY REFERENCES profiles(id),
  level INTEGER NOT NULL,
  domain VARCHAR NOT NULL,
  stats JSONB,  -- Données complexes en JSON
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. RÉSULTATS DE QUIZ
CREATE TABLE quiz_results (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER FOREIGN KEY REFERENCES profiles(id),
  level INTEGER NOT NULL,
  domain VARCHAR NOT NULL,
  score FLOAT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- 5. LOGS DE SYNC (audit)
CREATE TABLE sync_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER FOREIGN KEY REFERENCES users(id),
  action VARCHAR NOT NULL,
  entity_type VARCHAR NOT NULL,
  entity_id INTEGER,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

### API REST:

```
Authentication
├── POST /api/auth/register
│   └─ { email, username, password }
│      → { user, token }
└── POST /api/auth/login
    └─ { email, password }
       → { user, token }

Profiles
├── POST /api/profiles
│   └─ { name, gradeLevel }
│      → { id, name, grade_level, ... }
├── GET /api/profiles
│   └─ → [{ id, name, ... }, ...]
├── GET /api/profiles/:id
│   └─ → { id, name, ... }
├── PUT /api/profiles/:id
│   └─ { name?, gradeLevel?, totalStars? }
│      → { id, name, ... }
└── DELETE /api/profiles/:id
    └─ → 204 No Content

Progress
├── GET /api/progress/:profileId
│   └─ → [{ domain, level, stats }, ...]
├── PUT /api/progress/:profileId/:domain
│   └─ { level, stats }
│      → { domain, level, stats, ... }
└── POST /api/progress/sync/:profileId
    └─ { progressData: [...] }
       → { synced: N, data: [...] }
```

---

## 🔄 Flux de synchronisation complet

### Scénario: Un utilisateur joue et se connecte

```
ÉTAPE 1: Démarrage
├─ App charge les profils locaux (localStorage → IndexedDB)
└─ Affiche le dashboard avec tous les profils

ÉTAPE 2: Joueur choisi un profil
├─ Charge les questions
├─ Affiche la première question
└─ Attends la réponse

ÉTAPE 3: Répondre à une question
├─ Utilisateur donne une réponse
├─ App valide (correct/incorrect)
├─ Calcule les points et étoiles
├─ Déverrouille éventuellement un niveau
└─ Met à jour le profil

ÉTAPE 4: Sauvegarder
├─ Sauvegarde immédiate: localStorage.setItem(...)
├─ Sauvegarde en arrière-plan: IndexedDB.put(...)
└─ Si backend connecté:
    ├─ POST /api/progress/sync/profile-id
    ├─ Backend reçoit les données
    └─ PostgreSQL sauvegarde

ÉTAPE 5: Prochaine question
└─ Retour à l'ÉTAPE 3
```

---

## 🔐 Sécurité

### Frontend
- ✅ Données en localStorage (non sensibles)
- ✅ IndexedDB également local
- ✅ Validation des réponses côté client

### Backend
- ✅ JWT authentication (token expire après 7 jours)
- ✅ Bcryptjs pour les mots de passe (10 rounds)
- ✅ CORS whitelist (seulement localhost:5173)
- ✅ Helmet.js pour les en-têtes de sécurité
- ✅ Parameterized queries (pas d'injection SQL)

---

## 📈 Scalabilité

### Frontend:
- 2100 questions chargées au démarrage
- IndexedDB peut stocker plusieurs GB
- Fonctionne hors ligne

### Backend:
- PostgreSQL + Express = production-ready
- Peut gérer 1000+ utilisateurs
- API REST standard

---

## 🎯 Points clés à retenir

| Concept | Où? | Utilité |
|---------|-----|---------|
| Profils | LocalStorage + IndexedDB | Sauvegarde rapide, offline |
| Questions | Code (src/data/) | 2100 exercices toujours disponibles |
| Utilisateurs | PostgreSQL (backend) | Compte utilisateur, sync |
| Progrès | Les deux | Sauvegarde + sync serveur |
| Authentification | Backend | JWT token |

---

## 🚀 Lancement

### Frontend seul:
```bash
npm run dev
```

### Frontend + Backend:
```bash
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
npm run dev
```

**C'est tout! L'architecture est complète et prête à l'emploi.** 🎉
