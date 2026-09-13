import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { Progress } from '../models/Progress.js';
import { JsonStore, isJsonMode } from '../config/store.js';

const router = Router();

// GET /api/progress
router.get('/', authMiddleware, async (req, res) => {
  try {
    let progress;
    if (isJsonMode()) {
      progress = await JsonStore.findProgressByUser(req.userId);
      if (!progress) progress = await JsonStore.createProgress(req.userId);
    } else {
      progress = await Progress.findOne({ userId: req.userId });
      if (!progress) progress = await Progress.create({ userId: req.userId });
    }
    return res.json({ progress });
  } catch (err) {
    return res.status(500).json({ error: 'Could not load progress.' });
  }
});

// PUT /api/progress/tasks
router.put('/tasks', authMiddleware, async (req, res) => {
  try {
    const { tasks } = req.body;
    if (!Array.isArray(tasks)) return res.status(400).json({ error: 'tasks must be an array.' });

    let progress;
    if (isJsonMode()) {
      progress = await JsonStore.updateProgress(req.userId, (doc) => ({ ...doc, tasks }));
    } else {
      progress = await Progress.findOne({ userId: req.userId });
      if (!progress) progress = await Progress.create({ userId: req.userId });
      progress.tasks = tasks;
      progress.lastUpdated = new Date();
      await progress.save();
    }
    return res.json({ progress });
  } catch (err) {
    return res.status(500).json({ error: 'Could not update tasks.' });
  }
});

// POST /api/progress/quiz
router.post('/quiz', authMiddleware, async (req, res) => {
  try {
    const { score, total, domain } = req.body;
    let progress;
    if (isJsonMode()) {
      progress = await JsonStore.updateProgress(req.userId, (doc) => ({
        ...doc,
        quizScores: [...doc.quizScores, { score, total, domain, date: new Date().toISOString() }],
      }));
    } else {
      progress = await Progress.findOne({ userId: req.userId });
      if (!progress) progress = await Progress.create({ userId: req.userId });
      progress.quizScores.push({ score, total, domain });
      progress.lastUpdated = new Date();
      await progress.save();
    }
    return res.json({ progress });
  } catch (err) {
    return res.status(500).json({ error: 'Could not save quiz score.' });
  }
});

// POST /api/progress/ats
router.post('/ats', authMiddleware, async (req, res) => {
  try {
    const { score, domain, fileName } = req.body;
    let progress;
    if (isJsonMode()) {
      progress = await JsonStore.updateProgress(req.userId, (doc) => ({
        ...doc,
        atsScores: [...doc.atsScores, { score, domain, fileName, date: new Date().toISOString() }],
      }));
    } else {
      progress = await Progress.findOne({ userId: req.userId });
      if (!progress) progress = await Progress.create({ userId: req.userId });
      progress.atsScores.push({ score, domain, fileName });
      progress.lastUpdated = new Date();
      await progress.save();
    }
    return res.json({ progress });
  } catch (err) {
    return res.status(500).json({ error: 'Could not save ATS score.' });
  }
});

export default router;