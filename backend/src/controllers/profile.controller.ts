import { Response } from 'express';
import { validationResult } from 'express-validator';
import * as profileService from '../services/profile.service.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

export async function createProfile(req: AuthenticatedRequest, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, gradeLevel } = req.body;
    const profile = await profileService.createProfile(req.user.id, name, gradeLevel);

    res.status(201).json(profile);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function listProfiles(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const profiles = await profileService.getProfilesByUserId(req.user.id);
    res.json(profiles);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getProfile(req: AuthenticatedRequest, res: Response) {
  try {
    const { id } = req.params;
    const profile = await profileService.getProfileById(Number.parseInt(id, 10));

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    if (profile.user_id !== req.user?.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateProfile(req: AuthenticatedRequest, res: Response) {
  try {
    const { id } = req.params;
    const profile = await profileService.getProfileById(Number.parseInt(id, 10));

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    if (profile.user_id !== req.user?.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { name, gradeLevel, totalStars } = req.body;
    const updated = await profileService.updateProfile(Number.parseInt(id, 10), name, gradeLevel, totalStars);

    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteProfile(req: AuthenticatedRequest, res: Response) {
  try {
    const { id } = req.params;
    const profile = await profileService.getProfileById(Number.parseInt(id, 10));

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    if (profile.user_id !== req.user?.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const deleted = await profileService.deleteProfile(Number.parseInt(id, 10));

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Failed to delete profile' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
