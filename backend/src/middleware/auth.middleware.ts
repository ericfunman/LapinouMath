import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth.service.js';

export interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string };
}

export async function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const token = authHeader.substring(7);
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}
