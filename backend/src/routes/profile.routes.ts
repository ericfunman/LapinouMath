import { Router } from 'express';
import { body } from 'express-validator';
import { authMiddleware } from '../middleware/auth.middleware.js';
import * as profileController from '../controllers/profile.controller.js';

const router = Router();

router.use(authMiddleware);

router.post(
  '/',
  body('name').trim().notEmpty(),
  body('gradeLevel').trim().notEmpty(),
  profileController.createProfile
);

router.get('/', profileController.listProfiles);

router.get('/:id', profileController.getProfile);

router.put('/:id', profileController.updateProfile);

router.delete('/:id', profileController.deleteProfile);

export default router;
