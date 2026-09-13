import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import profileRoutes from './routes/profile.js';
import progressRoutes from './routes/progress.js';
import { authMiddleware } from './middleware/auth.js';
import { loadProfileMiddleware } from './middleware/profile.js';
import { getGeminiReply } from './services/geminiService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root (two levels above server/)
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/progress', progressRoutes);

// Public anonymous AI endpoint (optional — for use without login)
app.post('/api/ai/chat', loadProfileMiddleware, async (req, res) => {
  try {
    const { text, profile } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }
    const mergedProfile = { ...profile, ...req.profile };
    const reply = await getGeminiReply(text, mergedProfile);
    return res.json({ reply });
  } catch (err) {
    console.error('AI chat error:', err);
    return res.status(500).json({ error: 'AI mentor is temporarily unavailable.' });
  }
});

// Serve static frontend in production (optional)
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

// Start server
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Career GenAI backend running on http://localhost:${PORT}`);
      console.log(`🔗 API base: http://localhost:${PORT}/api`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();