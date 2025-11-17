# 🚀 DÉMARRAGE RAPIDE - LapinouMath

## ⚡ La façon la plus simple

### **Windows (PowerShell)**

Ouvrez PowerShell dans le dossier `LapinouMath` et tapez:

```powershell
.\StartLapinouMath.ps1
```

**C'est tout!** L'app se lance automatiquement! 🎉

---

### **Mac/Linux (Terminal)**

```bash
npm run dev
```

L'application s'ouvre sur `http://localhost:5173`

---

## 🎮 Qu'est-ce que vous pouvez faire

✅ **Créer des profils** - Jean (CE1), Marie (CM1), etc.

✅ **Résoudre des questions** - Addition, multiplication, etc.

✅ **Gagner des étoiles** ⭐ - Plus de bonne réponses = plus d'étoiles

✅ **Débloquer des niveaux** - Progressez dans chaque domaine

✅ **Tout est sauvegardé** - Rien n'est perdu si vous fermez

---

## 📊 Voir vos données

### Dans le navigateur (F12)

```javascript
// Console (F12 → Console)
JSON.parse(localStorage.getItem('lapinoumath_profiles'))
```

---

## 🔌 Avec le Backend (Optionnel)

Si vous voulez aussi tester la synchronisation serveur:

### Terminal 1 (Backend)
```bash
cd backend
docker-compose up -d     # Lancez PostgreSQL
npm run dev              # Lancez le serveur
```

### Terminal 2 (Frontend)
```bash
npm run dev              # Lancez l'app
```

---

## ✨ C'est prêt!

Amusez-vous à apprendre les maths avec CalcuLapin! 🐰
