# 🚀 GUIDE INSTALLATION RAPIDE - TERRAMASTER F4-425

## ✅ Ce qui est prêt pour demain

Dans le dossier `nas-deploy/`, vous avez :

```
nas-deploy/
├── docker-compose.yml          ✅ Configuration Docker complète
├── .env.example                ✅ Variables d'environnement à configurer
├── README-NAS.md              ✅ Documentation complète (30 pages!)
├── .gitignore                  ✅ Fichiers à ne pas committer
├── migrations/
│   └── 01-init-schema.sql     ✅ Structure base de données PostgreSQL
└── scripts/
    ├── setup.sh                ✅ Installation automatique
    ├── backup-cron.sh          ✅ Backup automatique quotidien
    └── restore.sh              ✅ Restauration de backup
```

---

## 📋 CHECKLIST DEMAIN MATIN

### ⏰ 09h00 - Branchement et premier boot (15 min)

- [ ] Brancher le NAS
- [ ] Connecter câble Ethernet (fibre)
- [ ] Allumer le NAS
- [ ] Attendre le boot complet (LED verte fixe)
- [ ] Trouver l'IP du NAS (depuis votre routeur ou app TerraMaster)

### ⏰ 09h15 - Configuration initiale TOS (30 min)

- [ ] Accéder à l'interface web : `http://<IP-NAS>:8181`
- [ ] Suivre l'assistant de configuration
- [ ] Créer compte admin
- [ ] Configurer le réseau (IP fixe recommandée)
- [ ] Activer SSH : **Paramètres** > **Services** > **SSH** > **Activer**
- [ ] Installer Docker : **App Center** > Chercher "Docker" > **Installer**

### ⏰ 09h45 - Copie des fichiers (15 min)

**Option A : Interface web TOS**
1. Accéder à **File Manager**
2. Créer dossier : `/volume1/docker/lapinoumath`
3. Uploader tout le contenu de `nas-deploy/`

**Option B : WinSCP (plus rapide)**
1. Télécharger WinSCP : https://winscp.net/
2. Se connecter :
   - Host : IP du NAS
   - User : admin
   - Password : votre mot de passe TOS
3. Copier `nas-deploy/` vers `/volume1/docker/lapinoumath`

### ⏰ 10h00 - Configuration et lancement (30 min)

```powershell
# Depuis PowerShell sur votre PC
ssh admin@<IP-DU-NAS>

# Sur le NAS
cd /volume1/docker/lapinoumath

# Configurer l'environnement
cp .env.example .env
nano .env  # ou vi .env

# À MODIFIER dans .env :
# DB_PASSWORD=VotreMotDePasse2024!
# JWT_SECRET=<généré automatiquement par le script>
# CORS_ORIGIN=https://ericfunman.github.io

# Lancer l'installation
chmod +x scripts/setup.sh
./scripts/setup.sh

# ✨ Le script fait tout automatiquement !
```

### ⏰ 10h30 - Cloudflare Tunnel (30 min)

1. **Créer compte Cloudflare** (gratuit)
   - https://dash.cloudflare.com

2. **Créer le tunnel**
   - https://one.dash.cloudflare.com
   - **Networks** > **Tunnels** > **Create a tunnel**
   - Nom : `lapinoumath`
   - Copier le token

3. **Configurer sur le NAS**
   ```bash
   nano .env
   # Ajouter : CF_TUNNEL_TOKEN=eyJh...votre-token
   
   # Relancer le tunnel
   docker compose up -d cloudflared
   ```

4. **Ajouter route publique** (dans Cloudflare)
   - **Public Hostname** > **Add**
   - Subdomain : `lapinoumath-api`
   - Type : HTTP
   - URL : `backend:3000`

### ⏰ 11h00 - Tests et validation (30 min)

```bash
# Sur le NAS
docker compose ps         # Tout doit être "Up"
docker compose logs -f    # Vérifier pas d'erreurs

# Test local
curl http://localhost:3000/health

# Test depuis Internet (remplacer par votre URL)
curl https://lapinoumath-api.votre-domaine.com/health
```

**Résultat attendu :**
```json
{"status":"ok","timestamp":"2024-11-21T10:00:00.000Z"}
```

---

## 🎯 RÉSULTAT FINAL

À **11h30**, vous aurez :

✅ Backend Node.js fonctionnel
✅ PostgreSQL avec schéma complet
✅ Accessible depuis Internet (HTTPS)
✅ Backups automatiques quotidiens
✅ Monitoring via logs Docker
✅ Prêt à connecter le frontend

---

## 📞 EN CAS DE PROBLÈME

### Le NAS ne démarre pas
- Vérifier alimentation
- LED rouge = erreur disque
- Attendre 5 minutes complètes

### Pas d'accès web TOS
- Vérifier IP (depuis routeur)
- Essayer : `http://192.168.1.100:8181`
- Ou `http://terramaster.local:8181`

### Docker ne s'installe pas
- Vérifier version TOS (minimum 4.2)
- Redémarrer le NAS après install Docker
- Vérifier App Center > Mes Apps

### Le script setup.sh échoue
```bash
# Vérifier Docker
docker --version

# Vérifier permissions
sudo chmod -R 755 /volume1/docker/lapinoumath

# Voir les logs détaillés
./scripts/setup.sh 2>&1 | tee install.log
```

### Backend ne démarre pas
```bash
# Vérifier les logs
docker compose logs backend

# Problème commun : PostgreSQL pas prêt
docker compose restart postgres
sleep 30
docker compose restart backend
```

---

## 📱 CONTACTS D'AIDE

**Documentation TerraMaster :**
- https://www.terra-master.com/global/support/

**Si vraiment bloqué :**
- Prendre des screenshots des erreurs
- Copier les logs : `docker compose logs > debug.log`
- Vérifier README-NAS.md section Dépannage

---

## 🎁 BONUS

### Accès SSH avec clé (plus sécurisé)

```powershell
# Sur votre PC
ssh-keygen -t ed25519 -C "lapinoumath-nas"
ssh-copy-id admin@<IP-NAS>

# Ensuite connexion sans mot de passe
ssh admin@<IP-NAS>
```

### Monitoring avec Portainer (optionnel)

```bash
# Installer Portainer pour interface graphique Docker
docker run -d \
  -p 9000:9000 \
  --name portainer \
  --restart unless-stopped \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce

# Accéder : http://<IP-NAS>:9000
```

---

## ⏱️ PLANNING RÉALISTE

| Heure | Tâche | Durée |
|-------|-------|-------|
| 09h00 | Branchement NAS | 15 min |
| 09h15 | Config TOS + Docker | 30 min |
| 09h45 | Copie fichiers | 15 min |
| 10h00 | Installation backend | 30 min |
| 10h30 | Cloudflare Tunnel | 30 min |
| 11h00 | Tests | 30 min |
| **11h30** | **✅ TERMINÉ** | |

**Prévoir 3h au total** (avec marge pour imprévus)

---

## 🐰 DERNIERS CONSEILS

1. **Café ☕** - Prenez votre temps
2. **Screenshots** - Prenez des photos des écrans si erreur
3. **Patience** - Le premier boot prend 5-10 minutes
4. **Backup** - Une fois configuré, testez le backup immédiatement
5. **Sécurité** - Notez bien vos mots de passe quelque part

---

**🎉 Tout est prêt ! Demain à 11h30 votre backend sera en ligne !**

**Questions avant demain ?** Relisez le **README-NAS.md** (très détaillé)
