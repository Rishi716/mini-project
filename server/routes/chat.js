import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { ChatMessage, SafetyReport } from '../models/Chat.js';
import { User } from '../models/User.js';
import { JsonStore, isJsonMode } from '../config/store.js';
import { getGeminiReply } from '../services/geminiService.js';

const router = Router();

const INAPPROPRIATE_KEYWORDS = [
  'abuse', 'abusive', 'stupid', 'idiot', 'dumb', 'hate you', 'worthless',
  'shut up', 'shutup', 'kill yourself', 'kys', 'suicide', 'die', 'end my life', 'cut myself',
  'sex', 'sexy', 'nude', 'naked', 'girlfriend', 'boyfriend', 'love you',
  'hot', 'boobs', 'porn', 'xxx', 'vulgar', 'slut', 'whore', 'dick', 'pussy',
  'cheat', 'cheating', 'copy for me', 'do my homework', 'write my assignment',
  'help me cheat', 'exam answers',
  'kill', 'murder', 'shoot', 'bomb', 'attack', 'hurt', 'stab', 'assault', 'rape', 'beat up',
  'drugs', 'weed', 'alcohol', 'smoke', 'cigarette',
];

function detectInappropriate(text) {
  const lower = text.toLowerCase().replace(/[^\w\s]/g, '');
  return INAPPROPRIATE_KEYWORDS.filter(kw => lower.includes(kw));
}

// GET /api/chat/history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    let messages;
    if (isJsonMode()) {
      messages = await JsonStore.findChatMessagesByUser(req.userId, 100);
    } else {
      messages = await ChatMessage.find({ userId: req.userId })
        .sort({ createdAt: -1 }).limit(100).select('-__v -userId');
      messages.reverse();
    }
    return res.json({ messages });
  } catch (err) {
    console.error('History error:', err);
    return res.status(500).json({ error: 'Could not load chat history.' });
  }
});

// GET /api/chat/reports
router.get('/reports', authMiddleware, async (req, res) => {
  try {
    const reports = isJsonMode()
      ? await JsonStore.findSafetyReportsByUser(req.userId, 20)
      : await SafetyReport.find({ userId: req.userId }).sort({ createdAt: -1 }).limit(20);
    return res.json({ reports });
  } catch (err) {
    return res.status(500).json({ error: 'Could not load safety reports.' });
  }
});

// POST /api/chat
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    const flaggedWords = detectInappropriate(text);
    const user = isJsonMode()
      ? await JsonStore.findUserById(req.userId)
      : await User.findById(req.userId);

    const profile = {
      name: user?.name || 'Student',
      stage: user?.stage || 'Class 11-12',
      targetDomain: user?.targetDomain || 'Computer Science & AI',
      interests: user?.interests || [],
    };

    // Save user message
    let userMsg;
    if (isJsonMode()) {
      userMsg = await JsonStore.createChatMessage({ userId: req.userId, sender: 'user', text, flagged: flaggedWords.length > 0 });
    } else {
      userMsg = await ChatMessage.create({ userId: req.userId, sender: 'user', text, flagged: flaggedWords.length > 0 });
    }

    // If inappropriate — create safety report + warning
    if (flaggedWords.length > 0) {
      const ts = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
      let report;
      if (isJsonMode()) {
        report = await JsonStore.createSafetyReport({
          userId: req.userId, studentName: profile.name,
          parentName: user?.parentName || 'Parent/Guardian',
          parentEmail: user?.parentEmail || 'Not provided',
          flaggedWords, originalMessage: text, timestamp: ts, status: 'sent',
        });
      } else {
        report = await SafetyReport.create({
          userId: req.userId, studentName: profile.name,
          parentName: user?.parentName || 'Parent/Guardian',
          parentEmail: user?.parentEmail || 'Not provided',
          flaggedWords, originalMessage: text, timestamp: ts, status: 'sent',
        });
      }

      const warningText = `⚠️ **Eshva Safety Alert**: I noticed your message contained inappropriate content. I'm here to help with your career and studies only. This incident has been automatically reported to your parent/guardian.\n\nPlease remember — this is a safe, academic mentoring space. Let's focus on your goals! 🌿`;

      if (isJsonMode()) {
        await JsonStore.createChatMessage({ userId: req.userId, sender: 'ai', text: warningText, isWarning: true });
      } else {
        await ChatMessage.create({ userId: req.userId, sender: 'ai', text: warningText, isWarning: true });
      }

      return res.json({
        reply: warningText, isWarning: true,
        report: {
          id: report._id, timestamp: ts, parentName: report.parentName,
          parentEmail: report.parentEmail, flaggedWords,
        },
      });
    }

    // Normal flow — real Gemini AI
    const reply = await getGeminiReply(text, profile);
    if (isJsonMode()) {
      await JsonStore.createChatMessage({ userId: req.userId, sender: 'ai', text: reply });
    } else {
      await ChatMessage.create({ userId: req.userId, sender: 'ai', text: reply });
    }

    return res.json({ reply, isWarning: false });

  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({ error: 'AI mentor is temporarily unavailable. Please try again.' });
  }
});

export default router;