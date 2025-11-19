import { Response } from 'express';
import { validationResult } from 'express-validator';
import * as progressService from '../services/progress.service.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import * as profileService from '../services/profile.service.js';

export async function getProgress(req: AuthenticatedRequest, res: Response) {
  try {
    const { profileId } = req.params;
    const profile = await profileService.getProfileById(Number.parseInt(profileId, 10));

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    if (profile.user_id !== req.user?.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const progress = await progressService.getProgressByProfileId(Number.parseInt(profileId, 10));
    res.json(progress);
  } catch (error: unknown) {
    const appError = error instanceof Error ? error : new Error(String(error));
    res.status(500).json({ error: appError.message });
  }
}

export async function updateProgress(req: AuthenticatedRequest, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { profileId, domain } = req.params;
    const { level, stats } = req.body;

    const profile = await profileService.getProfileById(Number.parseInt(profileId, 10));
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    if (profile.user_id !== req.user?.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    let progress = await progressService.getProgressByDomain(Number.parseInt(profileId, 10), domain);

    if (progress) {
      progress = await progressService.updateProgressRecord(progress.id, level, stats);
    } else {
      progress = await progressService.createProgressRecord(
        Number.parseInt(profileId, 10),
        level,
        domain,
        stats || {}
      );
    }
    }

    res.json(progress);
  } catch (error: unknown) {
    const appError = error instanceof Error ? error : new Error(String(error));
    res.status(400).json({ error: appError.message });
  }
}

export async function syncProgress(req: AuthenticatedRequest, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { profileId, progressData } = req.body;

    const profile = await profileService.getProfileById(profileId);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    if (profile.user_id !== req.user?.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const results = [];
    for (const item of progressData) {
      const { domain, level, stats } = item;
      let progress = await progressService.getProgressByDomain(profileId, domain);

      if (progress) {
        progress = await progressService.updateProgressRecord(progress.id, level, stats);
      } else {
        progress = await progressService.createProgressRecord(profileId, level, domain, stats || {});
      }
      results.push(progress);
    }

    res.json({ synced: results.length, data: results });
  } catch (error: unknown) {
    const appError = error instanceof Error ? error : new Error(String(error));
    res.status(400).json({ error: appError.message });
  }
}
