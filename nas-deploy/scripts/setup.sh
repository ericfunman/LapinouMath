#!/bin/bash
# ============================================
# SCRIPT D'INSTALLATION LAPINOUMATH NAS
# TerraMaster F4-425
# ============================================

set -e

echo "🐰 ====================================="
echo "   INSTALLATION LAPINOUMATH NAS"
echo "   TerraMaster F4-425"
echo "====================================="
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction de vérification
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 installé"
        return 0
    else
        echo -e "${RED}✗${NC} $1 non trouvé"
        return 1
    fi
}

# 1. Vérifications préalables
echo "📋 Vérification des prérequis..."
check_command docker || { echo "❌ Docker doit être installé sur le NAS"; exit 1; }
check_command docker-compose || echo "⚠️  docker-compose non trouvé, on utilisera 'docker compose'"

# 2. Vérifier le fichier .env
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️${NC}  Fichier .env manquant"
    echo "📝 Copie de .env.example vers .env..."
    cp .env.example .env
    echo -e "${RED}❌ IMPORTANT: Éditez le fichier .env avant de continuer!${NC}"
    echo "   Modifiez au minimum:"
    echo "   - DB_PASSWORD"
    echo "   - JWT_SECRET"
    echo "   - CF_TUNNEL_TOKEN (après création du tunnel)"
    echo ""
    echo "Appuyez sur ENTRÉE une fois le fichier .env configuré..."
    read
fi

# 3. Créer les répertoires nécessaires
echo ""
echo "📁 Création des répertoires..."
mkdir -p data/postgres
mkdir -p backups
mkdir -p logs
chmod +x scripts/*.sh

# 4. Générer un JWT secret si vide
if grep -q "votre-secret-jwt" .env; then
    echo -e "${YELLOW}⚠️${NC}  JWT_SECRET non configuré"
    echo "🔑 Génération d'un JWT_SECRET aléatoire..."
    JWT_SECRET=$(openssl rand -base64 32)
    sed -i "s|JWT_SECRET=.*|JWT_SECRET=$JWT_SECRET|" .env
    echo -e "${GREEN}✓${NC} JWT_SECRET généré"
fi

# 5. Afficher les informations de configuration
echo ""
echo "📊 Configuration détectée:"
source .env
echo "   - Base de données: lapinoumath"
echo "   - Port PostgreSQL: 5432"
echo "   - Port Backend: 3000"
if [ ! -z "$CF_TUNNEL_TOKEN" ] && [ "$CF_TUNNEL_TOKEN" != "votre-token-cloudflare-tunnel-ici" ]; then
    echo -e "   - Cloudflare Tunnel: ${GREEN}Configuré${NC}"
else
    echo -e "   - Cloudflare Tunnel: ${YELLOW}Non configuré${NC}"
fi

# 6. Construire et démarrer les containers
echo ""
echo "🐋 Démarrage des containers Docker..."
docker compose down 2>/dev/null || true
docker compose up -d postgres

echo "⏳ Attente de PostgreSQL (30 secondes)..."
sleep 30

echo "🚀 Démarrage du backend..."
docker compose up -d backend

# 7. Vérifier l'état des services
echo ""
echo "🔍 Vérification des services..."
sleep 10

if docker compose ps | grep -q "postgres.*Up"; then
    echo -e "${GREEN}✓${NC} PostgreSQL démarré"
else
    echo -e "${RED}✗${NC} PostgreSQL a échoué"
fi

if docker compose ps | grep -q "backend.*Up"; then
    echo -e "${GREEN}✓${NC} Backend démarré"
else
    echo -e "${RED}✗${NC} Backend a échoué"
fi

# 8. Test de connexion
echo ""
echo "🧪 Test de connexion..."
sleep 5

if curl -f http://localhost:3000/health &>/dev/null; then
    echo -e "${GREEN}✓${NC} API accessible sur http://localhost:3000"
else
    echo -e "${YELLOW}⚠️${NC}  API non accessible (normal si Cloudflare Tunnel pas encore configuré)"
fi

# 9. Instructions Cloudflare Tunnel
echo ""
echo "========================================="
echo "📡 CONFIGURATION CLOUDFLARE TUNNEL"
echo "========================================="
if [ -z "$CF_TUNNEL_TOKEN" ] || [ "$CF_TUNNEL_TOKEN" = "votre-token-cloudflare-tunnel-ici" ]; then
    echo ""
    echo "Pour rendre votre backend accessible depuis Internet:"
    echo ""
    echo "1. Allez sur: https://one.dash.cloudflare.com"
    echo "2. Créez un compte gratuit si nécessaire"
    echo "3. Accédez à 'Zero Trust' > 'Networks' > 'Tunnels'"
    echo "4. Créez un nouveau tunnel"
    echo "5. Choisissez un nom: 'lapinoumath'"
    echo "6. Copiez le token généré"
    echo "7. Collez-le dans le fichier .env (CF_TUNNEL_TOKEN=...)"
    echo "8. Configurez le tunnel:"
    echo "   - Type: HTTP"
    echo "   - URL: http://backend:3000"
    echo "   - Hostname: votre-choix.votre-domaine.com"
    echo "9. Relancez: docker compose up -d cloudflared"
    echo ""
    echo "Votre backend sera accessible via HTTPS automatiquement!"
else
    echo -e "${GREEN}✓${NC} Token Cloudflare détecté"
    echo "🚀 Démarrage du tunnel..."
    docker compose up -d cloudflared
    echo -e "${GREEN}✓${NC} Tunnel démarré"
fi

# 10. Résumé final
echo ""
echo "========================================="
echo "✨ INSTALLATION TERMINÉE!"
echo "========================================="
echo ""
echo "🎯 Prochaines étapes:"
echo ""
echo "1. Vérifier les logs:"
echo "   docker compose logs -f"
echo ""
echo "2. Accéder au backend localement:"
echo "   http://localhost:3000"
echo ""
echo "3. Configurer Cloudflare Tunnel (si pas encore fait)"
echo ""
echo "4. Tester depuis votre frontend:"
echo "   Modifier src/config.ts avec l'URL de votre tunnel"
echo ""
echo "📊 Commandes utiles:"
echo "   - Voir les logs: docker compose logs -f"
echo "   - Arrêter: docker compose down"
echo "   - Redémarrer: docker compose restart"
echo "   - Backup: ./scripts/backup.sh"
echo "   - Restaurer: ./scripts/restore.sh <fichier>"
echo ""
echo "🐰 Bon courage avec LapinouMath!"
