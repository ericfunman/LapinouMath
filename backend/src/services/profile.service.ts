import pool from '../database.js';

export interface Profile {
  id: number;
  user_id: number;
  name: string;
  grade_level: string;
  total_stars: number;
  created_at: Date;
  updated_at: Date;
}

export async function createProfile(
  userId: number,
  name: string,
  gradeLevel: string
): Promise<Profile> {
  const result = await pool.query(
    'INSERT INTO profiles (user_id, name, grade_level) VALUES ($1, $2, $3) RETURNING id, user_id, name, grade_level, total_stars, created_at, updated_at',
    [userId, name, gradeLevel]
  );
  return result.rows[0];
}

export async function getProfilesByUserId(userId: number): Promise<Profile[]> {
  const result = await pool.query(
    'SELECT id, user_id, name, grade_level, total_stars, created_at, updated_at FROM profiles WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
}

export async function getProfileById(id: number): Promise<Profile | null> {
  const result = await pool.query(
    'SELECT id, user_id, name, grade_level, total_stars, created_at, updated_at FROM profiles WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export async function updateProfile(
  id: number,
  name?: string,
  gradeLevel?: string,
  totalStars?: number
): Promise<Profile | null> {
  const updates: string[] = [];
  const values: (string | number)[] = [];
  let paramCount = 1;

  if (name !== undefined) {
    updates.push(`name = $${paramCount++}`);
    values.push(name);
  }
  if (gradeLevel !== undefined) {
    updates.push(`grade_level = $${paramCount++}`);
    values.push(gradeLevel);
  }
  if (totalStars !== undefined) {
    updates.push(`total_stars = $${paramCount++}`);
    values.push(totalStars);
  }

  if (updates.length === 0) return getProfileById(id);

  updates.push(`updated_at = NOW()`);
  values.push(id);

  const query = `UPDATE profiles SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING id, user_id, name, grade_level, total_stars, created_at, updated_at`;

  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

export async function deleteProfile(id: number): Promise<boolean> {
  const result = await pool.query('DELETE FROM profiles WHERE id = $1', [id]);
  return result.rowCount! > 0;
}
