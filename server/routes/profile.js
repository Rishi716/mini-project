import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { User } from '../models/User.js';
import { JsonStore, isJsonMode } from '../config/store.js';

const router = Router();

const mapUser = (u) => ({
  id: u._id || u.id,
  email: u.email,
  name: u.name,
  stage: u.stage,
  targetDomain: u.targetDomain,
  interests: u.interests,
  parentName: u.parentName,
  parentEmail: u.parentEmail,
});

// GET /api/profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = isJsonMode()
      ? await JsonStore.findUserById(req.userId)
      : await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    return res.json({ user: mapUser(user) });
  } catch (err) {
    return res.status(500).json({ error: 'Could not load profile.' });
  }
});

// PUT /api/profile
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { name, stage, targetDomain, interests, parentName, parentEmail } = req.body;
    const updates = {};

    if (name !== undefined) updates.name = name;
    if (stage !== undefined) updates.stage = stage;
    if (targetDomain !== undefined) updates.targetDomain = targetDomain;
    if (interests !== undefined && Array.isArray(interests)) updates.interests = interests;
    if (parentName !== undefined) updates.parentName = parentName;
    if (parentEmail !== undefined) updates.parentEmail = parentEmail;

    let user;
    if (isJsonMode()) {
      user = await JsonStore.updateUserById(req.userId, updates);
    } else {
      user = await User.findById(req.userId);
      if (!user) return res.status(404).json({ error: 'User not found.' });
      Object.assign(user, updates);
      await user.save();
    }
    if (!user) return res.status(404).json({ error: 'User not found.' });
    return res.json({ user: mapUser(user) });
  } catch (err) {
    return res.status(500).json({ error: 'Could not update profile.' });
  }
});

export default router;