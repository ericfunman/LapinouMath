# 🐰 LapinouMath - Installation NAS TerraMaster F4-425

Guide complet d'installation du backend LapinouMath sur votre NAS TerraMaster.

## 📋 Prérequis

### Matériel
- ✅ TerraMaster F4-425 (8GB RAM, Intel Celeron N5105)
- ✅ Connexion Internet Fibre
- ✅ Espace disque : minimum 10GB libres

### Logiciels sur le NAS
- ✅ TOS (TerraMaster OS) à jour
- ✅ Docker installé (depuis App Center)
- ✅ SSH activé (Paramètres > Services > SSH)

---

## 🚀 Installation Rapide (30 minutes)

### Étape 1 : Accéder au NAS via SSH

```bash
# Depuis votre PC Windows (PowerShell)
ssh admin@<IP-DU-NAS>
# Exemple: ssh admin@192.168.1.100
```

**Trouver l'IP du NAS :**
- Interface TOS > Paramètres > Réseau
- Ou depuis votre routeur

### Étape 2 : Copier les fichiers sur le NAS

**Option A : Via WinSCP (recommandé pour Windows)**
1. Télécharger WinSCP : https://winscp.net/
2. Se connecter au NAS
3. Copier le dossier `nas-deploy` vers `/volume1/docker/lapinoumath`

**Option B : Via ligne de commande**
```powershell
# Depuis votre PC Windows
scp -r nas-deploy admin@<IP-DU-NAS>:/volume1/docker/lapinoumath
```

### Étape 3 : Configuration

```bash
# Sur le NAS (via SSH)
cd /volume1/docker/lapinoumath

# Copier et éditer le fichier de configuration
cp .env.example .env
nano .env  # ou vi .env
```

**Modifier ces valeurs OBLIGATOIRES :**
```bash
DB_PASSWORD=VotreMotDePasseSecurise2024!
JWT_SECRET=VotreSecretJWTTresLongEtAleatoire
CORS_ORIGIN=https://ericfunman.github.io
```

### Étape 4 : Lancer l'installation automatique

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

Le script va :
- ✅ Vérifier Docker
- ✅ Créer les répertoires nécessaires
- ✅ Démarrer PostgreSQL
- ✅ Démarrer le backend
- ✅ Configurer les backups automatiques

### Étape 5 : Vérifier que tout fonctionne

```bash
# Vérifier les containers
docker compose ps

# Voir les logs
docker compose logs -f

# Tester l'API
curl http://localhost:3000/health
```

**Résultat attendu :**
```json
{"status":"ok","timestamp":"2024-11-21T..."}
```

---

## 🌐 Configuration Cloudflare Tunnel (accès Internet)

### Pourquoi Cloudflare Tunnel ?
- ✅ Pas de port forwarding (plus sécurisé)
- ✅ HTTPS automatique (certificat SSL gratuit)
- ✅ Cache CDN gratuit
- ✅ Protection DDoS
- ✅ Votre IP publique reste cachée

### Étapes

#### 1. Créer un compte Cloudflare (gratuit)
- Aller sur : https://dash.cloudflare.com
- S'inscrire (gratuit)

#### 2. Créer un Tunnel
1. Aller sur : https://one.dash.cloudflare.com
2. Menu : **Networks** > **Tunnels**
3. Cliquer : **Create a tunnel**
4. Nom du tunnel : `lapinoumath`
5. **Copier le token** affiché

#### 3. Configurer le Tunnel sur le NAS

```bash
# Sur le NAS
nano .env

# Coller le token Cloudflare
CF_TUNNEL_TOKEN=eyJh....votre-token-ici
```

#### 4. Ajouter une route publique

Dans l'interface Cloudflare :
1. Onglet **Public Hostname**
2. **Add a public hostname**
3. Remplir :
   - **Subdomain** : `lapinoumath-api` (ou autre)
   - **Domain** : Choisir un domaine Cloudflare (ou acheter/transférer un domaine)
   - **Type** : HTTP
   - **URL** : `backend:3000`

Si vous n'avez pas de domaine, Cloudflare vous proposera un sous-domaine gratuit en `.trycloudflare.com`

#### 5. Démarrer le tunnel

```bash
docker compose up -d cloudflared
docker compose logs -f cloudflared
```

#### 6. Tester depuis Internet

Votre API est maintenant accessible via :
```
https://lapinoumath-api.votre-domaine.com/health
```

---

## 🔧 Commandes Utiles

### Gestion des containers
```bash
# Voir l'état
docker compose ps

# Voir les logs
docker compose logs -f
docker compose logs backend  # Seulement le backend
docker compose logs postgres  # Seulement la DB

# Redémarrer un service
docker compose restart backend

# Arrêter tout
docker compose down

# Démarrer tout
docker compose up -d

# Reconstruire et redémarrer
docker compose up -d --build
```

### Base de données
```bash
# Accéder à PostgreSQL
docker compose exec postgres psql -U lapinou_user -d lapinoumath

# Commandes SQL utiles
\dt              # Lister les tables
\d users         # Voir structure table users
SELECT * FROM users;
\q              # Quitter
```

### Backups
```bash
# Backup manuel
docker compose exec backup /scripts/backup-cron.sh

# Voir les backups
ls -lh backups/

# Restaurer un backup
docker compose exec backup /scripts/restore.sh lapinoumath_backup_20241121_140000.sql.gz
```

---

## 📊 Monitoring et Maintenance

### Vérifier l'espace disque
```bash
df -h
du -sh /volume1/docker/lapinoumath/*
```

### Nettoyer Docker
```bash
# Supprimer images inutilisées
docker image prune -a

# Supprimer volumes orphelins
docker volume prune
```

### Logs rotatifs
Les logs Docker sont limités à 10MB par défaut. Pour modifier :

```yaml
# Dans docker-compose.yml, ajouter pour chaque service:
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

---

## 🔒 Sécurité

### Checklist de sécurité

- [ ] Mot de passe DB fort (dans .env)
- [ ] JWT_SECRET aléatoire et long
- [ ] Fichier .env non accessible publiquement
- [ ] SSH avec clé publique (pas juste mot de passe)
- [ ] Firewall NAS activé
- [ ] Backups automatiques configurés
- [ ] Cloudflare Tunnel (pas de port forwarding direct)
- [ ] TOS à jour régulièrement
- [ ] Monitoring des logs d'accès

### Changer le mot de passe admin
```bash
# Accéder à la DB
docker compose exec postgres psql -U lapinou_user -d lapinoumath

# Générer un nouveau hash (sur votre PC avec Node.js)
node -e "console.log(require('bcryptjs').hashSync('nouveau_mot_de_passe', 10))"

# Mettre à jour dans la DB
UPDATE users SET password_hash = '$2a$10$...' WHERE email = 'admin@lapinoumath.local';
```

---

## 🆘 Dépannage

### Le backend ne démarre pas
```bash
# Vérifier les logs
docker compose logs backend

# Erreurs communes:
# - Port 3000 déjà utilisé → Modifier dans docker-compose.yml
# - PostgreSQL pas prêt → Attendre 30s et relancer
# - Erreur de connexion DB → Vérifier DB_PASSWORD dans .env
```

### PostgreSQL ne démarre pas
```bash
# Vérifier les permissions
ls -la data/postgres/
sudo chown -R 999:999 data/postgres/

# Vérifier les logs
docker compose logs postgres
```

### Cloudflare Tunnel ne se connecte pas
```bash
# Vérifier le token
cat .env | grep CF_TUNNEL_TOKEN

# Vérifier les logs
docker compose logs cloudflared

# Erreur "bad token" → Regénérer le token sur Cloudflare
```

### L'API n'est pas accessible depuis Internet
```bash
# Vérifier que le tunnel est actif
docker compose ps cloudflared

# Tester en local d'abord
curl http://localhost:3000/health

# Vérifier la configuration Cloudflare (Public Hostname)
```

---

## 📞 Support

### Fichiers de logs importants
```bash
# Exporter les logs pour diagnostic
docker compose logs > logs/debug_$(date +%Y%m%d).log

# État complet du système
docker compose ps > logs/status_$(date +%Y%m%d).txt
```

### Redémarrage complet
```bash
# Arrêter tout proprement
docker compose down

# Nettoyer (⚠️ supprime les containers)
docker compose down -v

# Relancer l'installation
./scripts/setup.sh
```

---

## 🎯 Prochaines Étapes

Une fois le backend fonctionnel :

1. **Frontend** : Modifier `src/config.ts` avec l'URL de votre API
2. **Tests** : Créer un compte test et synchroniser des données
3. **Dashboard Admin** : Créer l'interface d'administration
4. **Monitoring** : Configurer des alertes (optionnel)

---

## 📚 Ressources

- [Documentation TerraMaster](https://www.terra-master.com/global/support/)
- [Documentation Docker](https://docs.docker.com/)
- [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [PostgreSQL](https://www.postgresql.org/docs/)

---

**🐰 Bon déploiement !**
