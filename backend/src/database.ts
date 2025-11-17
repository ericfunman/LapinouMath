import pg from 'pg';
import config from './config.js';

const { Pool } = pg;

export const pool = new Pool({
  host: config.database.host,
  port: config.database.port,
  database: config.database.database,
  user: config.database.user,
  password: config.database.password,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export async function initializeDatabase(): Promise<void> {
  try {
    const client = await pool.connect();
    console.log('✅ Database connection established');
    client.release();
  } catch (err) {
    console.error('❌ Database connection error:', err);
    throw err;
  }
}

export async function closeDatabase(): Promise<void> {
  await pool.end();
  console.log('✅ Database connection closed');
}

export default pool;
