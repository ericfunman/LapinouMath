import pool from '../database.js';

export interface ProgressRecord {
  id: number;
  profile_id: number;
  level: number;
  domain: string;
  stats: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export async function createProgressRecord(
  profileId: number,
  level: number,
  domain: string,
  stats: Record<string, any>
): Promise<ProgressRecord> {
  const result = await pool.query(
    'INSERT INTO progress (profile_id, level, domain, stats) VALUES ($1, $2, $3, $4) RETURNING id, profile_id, level, domain, stats, created_at, updated_at',
    [profileId, level, domain, JSON.stringify(stats)]
  );
  const row = result.rows[0];
  return {
    ...row,
    stats: typeof row.stats === 'string' ? JSON.parse(row.stats) : row.stats,
  };
}

export async function getProgressByProfileId(profileId: number): Promise<ProgressRecord[]> {
  const result = await pool.query(
    'SELECT id, profile_id, level, domain, stats, created_at, updated_at FROM progress WHERE profile_id = $1 ORDER BY domain, level',
    [profileId]
  );
  return result.rows.map((row) => ({
    ...row,
    stats: typeof row.stats === 'string' ? JSON.parse(row.stats) : row.stats,
  }));
}

export async function updateProgressRecord(
  id: number,
  level?: number,
  stats?: Record<string, any>
): Promise<ProgressRecord | null> {
  const updates: string[] = [];
  const values: (string | number | object)[] = [];
  let paramCount = 1;

  if (level !== undefined) {
    updates.push(`level = $${paramCount++}`);
    values.push(level);
  }
  if (stats !== undefined) {
    updates.push(`stats = $${paramCount++}`);
    values.push(JSON.stringify(stats));
  }

  if (updates.length === 0) {
    const result = await pool.query('SELECT * FROM progress WHERE id = $1', [id]);
    const row = result.rows[0];
    return row
      ? {
          ...row,
          stats: typeof row.stats === 'string' ? JSON.parse(row.stats) : row.stats,
        }
      : null;
  }

  updates.push(`updated_at = NOW()`);
  values.push(id);

  const query = `UPDATE progress SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING id, profile_id, level, domain, stats, created_at, updated_at`;

  const result = await pool.query(query, values);
  const row = result.rows[0];
  return row
    ? {
        ...row,
        stats: typeof row.stats === 'string' ? JSON.parse(row.stats) : row.stats,
      }
    : null;
}

export async function deleteProgressRecord(id: number): Promise<boolean> {
  const result = await pool.query('DELETE FROM progress WHERE id = $1', [id]);
  return result.rowCount! > 0;
}

export async function getProgressByDomain(profileId: number, domain: string): Promise<ProgressRecord | null> {
  const result = await pool.query(
    'SELECT id, profile_id, level, domain, stats, created_at, updated_at FROM progress WHERE profile_id = $1 AND domain = $2',
    [profileId, domain]
  );
  const row = result.rows[0];
  return row
    ? {
        ...row,
        stats: typeof row.stats === 'string' ? JSON.parse(row.stats) : row.stats,
      }
    : null;
}
