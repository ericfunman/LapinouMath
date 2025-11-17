import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post(
  '/register',
  body('email').isEmail(),
  body('username').trim().isLength({ min: 3 }),
  body('password').isLength({ min: 6 }),
  authController.register
);

router.post(
  '/login',
  body('email').isEmail(),
  body('password').notEmpty(),
  authController.login
);

export default router;
