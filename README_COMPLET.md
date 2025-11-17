# 📚 RÉSUMÉ COMPLET - LapinouMath

## 🎯 Qu'est-ce que LapinouMath?

Une **application éducative** pour apprendre les mathématiques du CE1 à la 4ème.

- 🐰 CalcuLapin vous guide
- ⭐ Gagnez des étoiles en répondant correctement
- 🎮 Système de niveaux de difficulté
- 💾 Progression automatiquement sauvegardée
- 📱 Fonctionne sans internet

---

## 💾 Système de SAUVEGARDE

### **3 niveaux de sauvegarde (du plus rapide au plus durable)**

#### 1️⃣ **LocalStorage** (Instantané)
- Sauvegarde **immédiate** quand vous modifiez un profil
- Accessible dans F12 → Application → LocalStorage
- Fiable et simple

#### 2️⃣ **IndexedDB** (Cache performant)
- Synchronisé automatiquement en arrière-plan
- Meilleure performance pour gros volumes
- Vous ne le voyez pas, mais il fonctionne

#### 3️⃣ **PostgreSQL Backend** (Optionnel)
- Si vous lancez le backend avec Docker
- Vos profils se synchronisent au serveur
- Permet d'accéder depuis d'autres appareils

**Flux:**
```
Vous créez/modifiez un profil
        ↓
Sauvegarde instantanée (LocalStorage)
        ↓
Cache persistant (IndexedDB - async)
        ↓
Serveur PostgreSQL (si backend actif)
```

### ✅ Résultat: Vos données ne sont JAMAIS perdues!

---

## ❓ **QUESTIONS (2100 exercices)**

Les questions sont **stockées dans le CODE**, pas dans une base de données.

```
src/data/
├── questions.ts              (Questions générales)
├── questionsCE1.ts           (Questions CE1)
├── questionsCE1Additional.ts (Extras CE1)
└── constants.ts              (Domaines et niveaux)
```

**Avantages:**
- ✅ Application fonctionne **hors ligne**
- ✅ Pas de requête serveur pour charger les questions
- ✅ Très rapide

**Chaque question contient:**
- L'énoncé (ex: "2 + 3 = ?")
- La réponse correcte
- Le niveau de difficulté (1-5)
- Le domaine (addition, multiplication, etc.)

---

## 🚀 Comment LANCER l'application

### **MÉTHODE 1: La plus simple (Frontend seul)**

#### Windows - PowerShell:
```powershell
.\StartLapinouMath.ps1
```

#### Mac/Linux - Terminal:
```bash
npm run dev
```

**Résultat:** Application ouverte sur `http://localhost:5173` ✅

**Vous pouvez faire:**
- Créer des profils
- Jouer aux 2100 questions
- Gagner des étoiles
- Débloquer des niveaux
- **Tout est sauvegardé automatiquement**

---

### **MÉTHODE 2: Frontend + Backend (Avec synchronisation serveur)**

#### Terminal 1 - Backend:
```bash
cd backend
docker-compose up -d     # Lancez PostgreSQL
npm run dev              # Lancez le serveur
```

#### Terminal 2 - Frontend:
```bash
npm run dev              # Lancez l'application
```

**Résultat:**
- Frontend sur `http://localhost:5173`
- Backend sur `http://localhost:3001`
- PostgreSQL sur `localhost:5432`

**Nouvelles fonctionnalités:**
- Créer un compte utilisateur
- Se connecter/déconnecter
- Les profils se synchronisent au serveur
- Vos données persistent dans PostgreSQL

---

## 📂 Structure du projet

```
LapinouMath/
├── src/                          (Frontend - React)
│   ├── App.tsx                   (Composant principal)
│   ├── components/               (Composants React)
│   ├── utils/                    (Utilitaires)
│   ├── utils/storage.ts          (Gestion de la sauvegarde)
│   ├── data/                     (2100 questions)
│   └── styles/                   (CSS Tailwind)
├── backend/                      (Serveur - Express)
│   ├── src/server.ts             (Serveur Express)
│   ├── src/database.ts           (Connexion PostgreSQL)
│   ├── src/migrations/           (Schéma base de données)
│   ├── src/controllers/          (Logique des API)
│   ├── src/services/             (Logique métier)
│   ├── src/routes/               (Endpoints API)
│   └── docker-compose.yml        (PostgreSQL en Docker)
├── package.json                  (Dépendances frontend)
├── backend/package.json          (Dépendances backend)
└── Documentation/
    ├── DEMARRAGE_RAPIDE.md       (Quick start)
    ├── FAQ_SAUVEGARDE_LANCEMENT.md (Cette FAQ)
    ├── GUIDE_COMPLET_FR.md       (Guide détaillé)
    ├── ARCHITECTURE.md           (Architecture système)
    └── backend/README.md         (Documentation backend)
```

---

## 🎮 Comment jouer

### Étape 1: Créer un profil
```
Accueil → "Créer un profil"
Nom: Jean
Classe: CE1
Cliquez: Créer
```

### Étape 2: Choisir le profil
```
Dashboard → Cliquez sur "Jean"
```

### Étape 3: Choisir le domaine
```
"Additions", "Multiplications", etc.
```

### Étape 4: Résoudre les questions
```
Voyez la question
Entrez votre réponse
Appuyez: Valider
```

### Étape 5: Gagner des étoiles
```
Correcte → +1 ⭐ + points
Incorrecte → Essayez à nouveau
```

### Étape 6: Débloquer les niveaux
```
Niveau 1 débloqué au début
Débloquez niveau 2 → 70% de réussite
Débloquez niveau 3 → 80% de réussite
...
```

---

## 📊 Voir vos données

### **Dans le navigateur (F12)**

#### LocalStorage:
```
F12 → Application → LocalStorage → http://localhost:5173
Cherchez: lapinoumath_profiles
```

#### IndexedDB:
```
F12 → Application → IndexedDB → LapinouMath
```

### **Dans la base de données** (si backend)

```bash
# Se connecter
psql -U user -d lapinoumath_dev

# Voir les utilisateurs
SELECT * FROM users;

# Voir les profils
SELECT * FROM profiles;

# Voir le progrès
SELECT * FROM progress;
```

---

## 🔐 Sécurité

### Frontend:
- Données stockées **localement** (pas d'envoi à un tiers)
- IndexedDB est **privé** au navigateur

### Backend:
- Mots de passe **hashés** avec bcryptjs
- **JWT token** pour authentification
- **CORS** configuré (seulement localhost)
- **Helmet.js** pour sécurité des headers

---

## 📈 Statistiques

| Élément | Valeur |
|---------|--------|
| Nombre de questions | 2100 |
| Classes supportées | CE1 → 4ème |
| Domaines | Addition, Soustraction, Multiplication, Division |
| Niveaux par domaine | 5 |
| Étoiles par question | 1 (si correcte) |

---

## 🎯 Cas d'usage

### Cas 1: Jouer localement
```
1. npm run dev
2. Créer un profil
3. Jouer
4. Les données sont sauvegardées localement
5. Fermer l'app
6. Rouvrir → Les profils sont toujours là!
```

### Cas 2: Avec synchronisation serveur
```
1. docker-compose up -d (backend)
2. npm run dev (frontend)
3. Créer un compte
4. Créer un profil
5. Les données vont dans PostgreSQL
6. Vous pouvez vous reconnecter plus tard
```

### Cas 3: Développer
```
1. npm run dev (frontend)
2. npm test:ui (voir les tests)
3. Modifiez le code
4. Les changements se rechargent automatiquement
```

---

## ⚡ Commandes rapides

```bash
# Frontend
npm run dev              # Lancer en développement
npm run build            # Compiler pour production
npm test                 # Lancer les tests
npm test:ui              # Tests avec interface

# Backend (cd backend/)
npm run dev              # Lancer le serveur
npm run build            # Compiler TypeScript
npm run db:migrate       # Créer les tables
npm test                 # Lancer les tests
```

---

## 🆘 Besoin d'aide?

### Document à consulter:
1. **DEMARRAGE_RAPIDE.md** - Pour commencer
2. **FAQ_SAUVEGARDE_LANCEMENT.md** - Pour vos questions
3. **GUIDE_COMPLET_FR.md** - Guide détaillé
4. **ARCHITECTURE.md** - Comment ça marche
5. **backend/README.md** - Documentation backend

### Problèmes courants:

**"npm: commande non trouvée"**
→ Installez Node.js: https://nodejs.org/

**"Port 5173 déjà utilisé"**
→ Changez de port: `npm run dev -- --port 3000`

**"Les données ne se sauvegardent pas"**
→ Vérifiez: F12 → Application → LocalStorage

**"Impossible de se connecter au backend"**
→ Vérifiez que Docker/PostgreSQL fonctionne: `docker ps`

---

## ✅ Checklist final

- [ ] Node.js installé
- [ ] Terminal ouvert dans le bon dossier
- [ ] `npm install` lancé (une fois)
- [ ] `npm run dev` lancé
- [ ] Application ouverte sur http://localhost:5173
- [ ] Profil créé
- [ ] Une question résolvue
- [ ] Étoile gagnée ⭐

---

## 🎉 Vous êtes prêt!

**Lancez simplement:**
```bash
npm run dev
```

**Et amusez-vous à apprendre les maths avec CalcuLapin!** 🐰🚀

---

**Dernière mise à jour:** 17 novembre 2025

**Version:** 1.0.0 - Production Ready

**Statut:** ✅ Complètement fonctionnel

[Voir les guides détaillés](.)
