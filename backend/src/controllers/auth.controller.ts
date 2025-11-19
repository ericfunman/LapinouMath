import { Response } from 'express';
import { validationResult } from 'express-validator';
import { createUser, authenticateUser } from '../services/auth.service.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

export async function register(req: AuthenticatedRequest, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, username, password } = req.body;
    const { user, token } = await createUser(email, username, password);

    res.status(201).json({
      user,
      token,
    });
  } catch (error: unknown) {
    const appError = error instanceof Error ? error : new Error(String(error));
    res.status(400).json({ error: appError.message });
  }
}

export async function login(req: AuthenticatedRequest, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const { user, token } = await authenticateUser(email, password);

    res.json({
      user,
      token,
    });
  } catch (error: unknown) {
    const appError = error instanceof Error ? error : new Error(String(error));
    res.status(401).json({ error: appError.message });
  }
}
