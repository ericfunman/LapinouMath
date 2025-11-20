#!/bin/sh
# ============================================
# BACKUP AUTOMATIQUE POSTGRESQL
# ============================================

set -e

BACKUP_DIR="/backups"
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-7}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/lapinoumath_backup_$TIMESTAMP.sql.gz"

echo "📦 [$(date)] Démarrage du backup automatique..."

# Créer le répertoire de backup si nécessaire
mkdir -p "$BACKUP_DIR"

# Fonction de backup
perform_backup() {
    echo "💾 Création du backup: $BACKUP_FILE"
    
    PGPASSWORD="$POSTGRES_PASSWORD" pg_dump \
        -h postgres \
        -U "$POSTGRES_USER" \
        -d "$POSTGRES_DB" \
        --clean \
        --if-exists \
        --no-owner \
        --no-privileges \
        | gzip > "$BACKUP_FILE"
    
    if [ -f "$BACKUP_FILE" ]; then
        SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
        echo "✅ Backup créé avec succès: $SIZE"
    else
        echo "❌ Erreur lors de la création du backup"
        exit 1
    fi
}

# Fonction de nettoyage des anciens backups
cleanup_old_backups() {
    echo "🧹 Nettoyage des backups de plus de $RETENTION_DAYS jours..."
    
    find "$BACKUP_DIR" -name "lapinoumath_backup_*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete
    
    REMAINING=$(find "$BACKUP_DIR" -name "lapinoumath_backup_*.sql.gz" -type f | wc -l)
    echo "📊 Backups restants: $REMAINING"
}

# Exécuter le backup
perform_backup

# Nettoyer les anciens backups
cleanup_old_backups

echo "✨ [$(date)] Backup terminé avec succès!"

# Mode daemon: attendre le prochain backup (toutes les 24h par défaut)
if [ "$1" = "daemon" ]; then
    echo "⏰ Mode daemon activé - prochain backup dans 24h"
    while true; do
        sleep 86400  # 24 heures
        perform_backup
        cleanup_old_backups
    done
fi
