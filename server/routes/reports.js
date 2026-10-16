import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { User } from '../models/User.js';
import { Progress } from '../models/Progress.js';
import { SafetyReport } from '../models/Chat.js';
import { JsonStore, isJsonMode } from '../config/store.js';
import { sendGmail, isGmailEnabled, progressReportHTML } from '../services/gmailService.js';

const router = Router();

// POST /api/reports/send — email the full progress report to the parent's Gmail
router.post('/send', authMiddleware, async (req, res) => {
  try {
    const user = isJsonMode()
      ? await JsonStore.findUserById(req.userId)
      : await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const parentEmail = user.parentEmail;
    if (!parentEmail || !parentEmail.includes('@')) {
      return res.status(400).json({
        error: 'No valid parent email saved. Add it in Student Profile → Parent / Guardian Email first.',
      });
    }
    if (!isGmailEnabled()) {
      return res.status(503).json({
        error: 'Gmail sending is not configured on the server yet (EMAIL_SERVICE is off or credentials are missing).',
      });
    }

    const progress = isJsonMode()
      ? await JsonStore.findProgressByUser(req.userId)
      : await Progress.findOne({ userId: req.userId });

    const reports = isJsonMode()
      ? await JsonStore.findSafetyReportsByUser(req.userId, 10)
      : await SafetyReport.find({ userId: req.userId }).sort({ createdAt: -1 }).limit(10);

    const html = progressReportHTML({ user, progress, reports });

    await sendGmail({
      to: parentEmail,
      subject: `📊 Progress Report — ${user.name || 'Student'}`,
      html,
    });

    return res.json({ ok: true, to: parentEmail, sentAt: new Date().toISOString() });
  } catch (err) {
    console.error('Parent report send error:', err);
    return res.status(500).json({ error: 'Could not send the parent report.' });
  }
});

export default router;