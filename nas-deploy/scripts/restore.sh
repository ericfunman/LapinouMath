#!/bin/sh
# ============================================
# RESTAURATION BACKUP POSTGRESQL
# ============================================

set -e

BACKUP_DIR="/backups"

echo "📋 Backups disponibles:"
ls -lh "$BACKUP_DIR"/*.sql.gz 2>/dev/null || echo "❌ Aucun backup trouvé"

if [ -z "$1" ]; then
    echo ""
    echo "Usage: ./restore.sh <backup_file>"
    echo "Exemple: ./restore.sh lapinoumath_backup_20241120_140000.sql.gz"
    exit 1
fi

BACKUP_FILE="$BACKUP_DIR/$1"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Backup introuvable: $BACKUP_FILE"
    exit 1
fi

echo "⚠️  ATTENTION: Cette opération va ÉCRASER la base de données actuelle!"
echo "📁 Backup à restaurer: $BACKUP_FILE"
echo ""
echo "Appuyez sur CTRL+C pour annuler, ou ENTRÉE pour continuer..."
read CONFIRM

echo "🔄 Restauration en cours..."

gunzip -c "$BACKUP_FILE" | PGPASSWORD="$POSTGRES_PASSWORD" psql \
    -h postgres \
    -U "$POSTGRES_USER" \
    -d "$POSTGRES_DB"

echo "✅ Restauration terminée avec succès!"
