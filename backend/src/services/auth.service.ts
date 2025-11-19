import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../database.js';
import config from '../config.js';

export interface User {
  id: number;
  email: string;
  username: string;
  created_at: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

function generateToken(userId: number, email: string): string {
  const options = { expiresIn: '7d' } as any;
  return jwt.sign(
    { id: userId, email },
    config.jwt.secret,
    options
  );
}

export async function createUser(email: string, username: string, password: string): Promise<AuthResponse> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING id, email, username, created_at',
      [email, username, hashedPassword]
    );

    const user = result.rows[0];
    const token = generateToken(user.id, user.email);

    return { user, token };
  } catch (error: unknown) {
    const dbError = error as Record<string, unknown>;
    if (dbError.code === '23505') {
      throw new Error('Email or username already exists');
    }
    throw error;
  }
}

export async function authenticateUser(email: string, password: string): Promise<AuthResponse> {
  const result = await pool.query(
    'SELECT id, email, username, password_hash, created_at FROM users WHERE email = $1',
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error('Invalid credentials');
  }

  const user = result.rows[0];
  const passwordMatch = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.id, user.email);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password_hash, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
}

export async function verifyToken(token: string): Promise<{ id: number; email: string }> {
  try {
    const decoded = jwt.verify(token, config.jwt.secret) as { id: number; email: string };
    return decoded;
  } catch {
    throw new Error('Invalid or expired token');
  }
}

export async function getUserById(id: number): Promise<User | null> {
  const result = await pool.query(
    'SELECT id, email, username, created_at FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}
