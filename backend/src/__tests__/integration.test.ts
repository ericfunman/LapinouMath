import { describe, it, expect, beforeAll } from 'vitest';
import supertest from 'supertest';
import app from '../server';

let request: ReturnType<typeof supertest>;

beforeAll(() => {
  request = supertest(app);
});

describe('Backend API Integration Tests', () => {
  describe('Health Check', () => {
    it('should return health status', async () => {
      const res = await request.get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe('Authentication', () => {
    it('should register a new user', async () => {
      const res = await request.post('/api/auth/register').send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'testpassword123',
      });
      
      expect([201, 400]).toContain(res.status);
      if (res.status === 201) {
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('user');
      }
    });

    it('should handle missing required fields', async () => {
      const res = await request.post('/api/auth/register').send({
        email: 'test@example.com',
      });
      
      expect(res.status).toBe(400);
    });
  });

  describe('404 Handling', () => {
    it('should return 404 for non-existent route', async () => {
      const res = await request.get('/api/nonexistent');
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error', 'Not found');
    });
  });
});
