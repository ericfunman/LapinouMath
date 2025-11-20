# 🌐 CLOUDFLARE TUNNEL - GUIDE VISUEL

## 🎯 Objectif
Rendre votre backend accessible depuis Internet **SANS** ouvrir de ports sur votre routeur !

---

## 📋 ÉTAPE PAR ÉTAPE (30 minutes)

### 1️⃣ Créer un compte Cloudflare (5 min)

🔗 **https://dash.cloudflare.com/sign-up**

- Email + mot de passe
- Vérifier l'email
- **Plan gratuit** suffit amplement !

---

### 2️⃣ Accéder à Zero Trust (2 min)

1. Une fois connecté, chercher **"Zero Trust"** dans le menu
2. Ou aller directement sur : **https://one.dash.cloudflare.com**
3. Première fois : Choisir un nom d'organisation (ex: "lapinoumath")

---

### 3️⃣ Créer le Tunnel (10 min)

#### A. Navigation
```
Zero Trust Dashboard
└─ Networks (menu gauche)
   └─ Tunnels
      └─ [Create a tunnel]
```

#### B. Configuration du tunnel
1. **Cliquer** : "Create a tunnel"
2. **Type** : Cloudflared (sélectionné par défaut)
3. **Nom** : `lapinoumath` (ou ce que vous voulez)
4. **Cliquer** : "Save tunnel"

#### C. Installer le connecteur
**⚠️ IMPORTANT : Ne PAS installer manuellement !**

Cloudflare va afficher un token qui ressemble à :
```
eyJhIjoiNzM4Y2RmODQ5ZjYwNGE3MGI0MjQzOTU3NGI0ZGVmMGEiLCJ0IjoiNGE4...
```

**👉 COPIER CE TOKEN** (vous en aurez besoin pour le .env)

#### D. Cliquer "Next" sans installer

---

### 4️⃣ Configurer la route publique (10 min)

#### A. Ajouter un Public Hostname

Dans la configuration du tunnel :
1. Onglet **"Public Hostname"**
2. Cliquer **"Add a public hostname"**

#### B. Remplir le formulaire

**Option 1 : Sans domaine personnel** (gratuit)
```
Subdomain: lapinoumath-api
Domain: <laissez vide ou choisissez un domaine temporaire>
```
➜ Cloudflare donnera un domaine gratuit en `.trycloudflare.com`

**Option 2 : Avec domaine personnel** (si vous en achetez un)
```
Subdomain: api
Domain: mondomaine.com
Path: (laisser vide)
```

**Service Configuration :**
```
Type: HTTP
URL: backend:3000
```

**Important :**
- ✅ `backend:3000` (nom du service Docker)
- ❌ PAS `localhost:3000`
- ❌ PAS `http://backend:3000`
- ❌ PAS l'IP du NAS

#### C. Options supplémentaires (laisser par défaut)
- TLS Verification : ✅ No TLS Verify
- HTTP Host Header : (vide)
- Origin Server Name : (vide)

#### D. Sauvegarder
Cliquer **"Save hostname"**

---

### 5️⃣ Configurer le NAS (5 min)

#### A. Copier le token dans .env

```bash
# Sur le NAS via SSH
cd /volume1/docker/lapinoumath
nano .env

# Ajouter cette ligne (remplacer par votre token)
CF_TUNNEL_TOKEN=eyJhIjoiNzM4Y2RmODQ5ZjYwNGE3MGI0MjQzOTU3NGI0ZGVmMGEi...
```

**Sauvegarder** : `Ctrl+X` puis `Y` puis `Enter`

#### B. Démarrer le tunnel

```bash
docker compose up -d cloudflared

# Vérifier les logs
docker compose logs -f cloudflared
```

**✅ Vous devriez voir :**
```
INFO Connection established to cloudflare
INFO Registered tunnel connection
```

---

### 6️⃣ Tester ! (5 min)

#### Test depuis Internet

Ouvrir un navigateur (sur votre PC ou téléphone en 4G) :

```
https://lapinoumath-api.votre-domaine.com/health
```

**Résultat attendu :**
```json
{
  "status": "ok",
  "timestamp": "2024-11-21T10:30:00.000Z"
}
```

---

## 🎨 EXEMPLE VISUEL DE CONFIGURATION

```
┌─────────────────────────────────────────┐
│  Public Hostname Configuration         │
├─────────────────────────────────────────┤
│                                         │
│  Subdomain: [lapinoumath-api        ]  │
│  Domain:    [votre-domaine.com   ▼ ]  │
│  Path:      [                       ]  │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ Service                           │ │
│  │                                   │ │
│  │ Type: [HTTP ▼]                    │ │
│  │ URL:  [backend:3000            ]  │ │
│  └───────────────────────────────────┘ │
│                                         │
│  [ Save hostname ]                      │
└─────────────────────────────────────────┘
```

---

## 🔒 OPTION : Domaine personnalisé (optionnel)

### Si vous voulez un vrai domaine (type lapinoumath.fr)

#### Acheter un domaine
- **OVH** : ~8€/an (.fr)
- **Namecheap** : ~12€/an (.com)
- **Cloudflare** : prix coûtant (le moins cher)

#### Transférer vers Cloudflare
1. Dans Cloudflare Dashboard
2. **Websites** > **Add a site**
3. Entrer votre domaine
4. Suivre les instructions (changer les nameservers)

#### Créer le sous-domaine
Une fois le domaine sur Cloudflare :
1. **DNS** > **Records** > **Add record**
2. Type : CNAME
3. Name : `api`
4. Target : `<tunnel-id>.cfargotunnel.com`
5. Proxy status : ✅ Proxied (orange cloud)

---

## 🆘 DÉPANNAGE

### "Tunnel not connected"
```bash
# Vérifier le token
cat .env | grep CF_TUNNEL_TOKEN

# Vérifier les logs
docker compose logs cloudflared

# Régénérer le token si invalide
# Sur Cloudflare : Tunnels > lapinoumath > Configure > Regenerate
```

### "502 Bad Gateway"
- Le backend n'est pas démarré
- Vérifier : `docker compose ps backend`
- Voir logs : `docker compose logs backend`

### "Cannot resolve backend:3000"
- Le service s'appelle bien `backend` dans docker-compose.yml
- Les services sont sur le même réseau Docker

### Test en local fonctionne, mais pas via Cloudflare
- Vérifier la route publique (Public Hostname)
- Le Type doit être **HTTP** (pas HTTPS)
- L'URL doit être **backend:3000** (pas localhost)

---

## 📊 AVANTAGES DE CETTE CONFIG

✅ **Sécurité** : IP publique cachée
✅ **HTTPS** : Certificat SSL automatique
✅ **Cache** : CDN Cloudflare gratuit
✅ **Simplicité** : Pas de config routeur
✅ **Mobilité** : Fonctionne même si votre IP change
✅ **Protection** : DDoS protection gratuite

---

## 🎯 RÉCAP DES URLs

```
Local (sur le NAS) :
http://localhost:3000/health

Internet (via Cloudflare) :
https://lapinoumath-api.votre-domaine.com/health

Frontend (GitHub Pages) :
https://ericfunman.github.io/LapinouMath
```

---

## 💡 ASTUCE : Tester sans domaine

Si vous voulez juste tester rapidement :

```bash
# Sur le NAS
docker compose up cloudflared

# Cloudflare créera une URL temporaire visible dans les logs
# Exemple : https://abc-def-ghi.trycloudflare.com
```

**⚠️ Cette URL change à chaque redémarrage !**

---

**✨ C'est tout ! Simple, sécurisé, gratuit !**
