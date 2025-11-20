-- ============================================
-- LAPINOUMATH DATABASE SCHEMA
-- Version 1.0 - Initial Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: users
-- Comptes utilisateurs (authentification)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- ============================================
-- TABLE: profiles
-- Profils élèves (un user peut avoir plusieurs enfants)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    avatar VARCHAR(50) DEFAULT '🐰',
    current_level VARCHAR(10) NOT NULL,
    total_stars INTEGER DEFAULT 0,
    selected_accessory VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_level ON profiles(current_level);

-- ============================================
-- TABLE: progress
-- Progression détaillée par niveau/domaine
-- ============================================
CREATE TABLE IF NOT EXISTS progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    level VARCHAR(10) NOT NULL,
    domain VARCHAR(50) NOT NULL,
    questions_answered INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    stars INTEGER DEFAULT 0,
    unlocked BOOLEAN DEFAULT FALSE,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(profile_id, level, domain)
);

CREATE INDEX idx_progress_profile ON progress(profile_id);
CREATE INDEX idx_progress_level_domain ON progress(level, domain);
CREATE INDEX idx_progress_updated ON progress(updated_at);

-- ============================================
-- TABLE: accessories
-- Accessoires débloqués par profil
-- ============================================
CREATE TABLE IF NOT EXISTS profile_accessories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    accessory_id VARCHAR(50) NOT NULL,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(profile_id, accessory_id)
);

CREATE INDEX idx_accessories_profile ON profile_accessories(profile_id);

-- ============================================
-- TABLE: sync_logs
-- Historique des synchronisations
-- ============================================
CREATE TABLE IF NOT EXISTS sync_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL,
    details JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sync_logs_user ON sync_logs(user_id);
CREATE INDEX idx_sync_logs_timestamp ON sync_logs(timestamp);

-- ============================================
-- TABLE: error_reports
-- Signalements d'erreurs dans les questions
-- ============================================
CREATE TABLE IF NOT EXISTS error_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id VARCHAR(100) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    question_text TEXT,
    report_text TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);

CREATE INDEX idx_error_reports_question ON error_reports(question_id);
CREATE INDEX idx_error_reports_status ON error_reports(status);
CREATE INDEX idx_error_reports_created ON error_reports(created_at);

-- ============================================
-- FUNCTION: Auto-update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for profiles
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for progress
CREATE TRIGGER update_progress_updated_at
    BEFORE UPDATE ON progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INITIAL DATA: Admin user (optionnel)
-- ============================================
-- Password: admin123 (à changer immédiatement!)
-- Hash généré avec bcrypt rounds=10
INSERT INTO users (email, password_hash, is_admin) 
VALUES (
    'admin@lapinoumath.local',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    TRUE
) ON CONFLICT (email) DO NOTHING;

-- ============================================
-- VIEW: User Statistics (pour dashboard admin)
-- ============================================
CREATE OR REPLACE VIEW user_statistics AS
SELECT 
    u.id as user_id,
    u.email,
    u.created_at,
    u.last_login,
    COUNT(DISTINCT p.id) as profile_count,
    SUM(p.total_stars) as total_stars,
    MAX(pr.last_activity) as last_activity
FROM users u
LEFT JOIN profiles p ON u.id = p.user_id
LEFT JOIN progress pr ON p.id = pr.profile_id
GROUP BY u.id, u.email, u.created_at, u.last_login;

-- ============================================
-- PERMISSIONS
-- ============================================
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO lapinou_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO lapinou_user;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO lapinou_user;

-- ============================================
-- SCHEMA VERSION
-- ============================================
CREATE TABLE IF NOT EXISTS schema_version (
    version INTEGER PRIMARY KEY,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO schema_version (version) VALUES (1);
