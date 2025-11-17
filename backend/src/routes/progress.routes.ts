import { Router } from 'express';
import { body } from 'express-validator';
import { authMiddleware } from '../middleware/auth.middleware.js';
import * as progressController from '../controllers/progress.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/:profileId', progressController.getProgress);

router.put(
  '/:profileId/:domain',
  body('level').isInt(),
  progressController.updateProgress
);

router.post(
  '/sync/:profileId',
  body('progressData').isArray(),
  progressController.syncProgress
);

export default router;
