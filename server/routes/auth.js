import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { User } from '../models/User.js';
import { JsonStore, isJsonMode } from '../config/store.js';

const router = Router();

const getToken = (userId) =>
  jwt.sign({ id: String(userId) }, process.env.JWT_SECRET || 'dev_secret_key', { expiresIn: '30d' });

const sanitize = (u) => ({
  id: u._id || u.id,
  email: u.email,
  name: u.name,
  stage: u.stage,
  targetDomain: u.targetDomain,
  interests: u.interests,
  parentName: u.parentName,
  parentEmail: u.parentEmail,
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    let existing;
    let savedUser;
    if (isJsonMode()) {
      existing = await JsonStore.findUserByEmail(email);
      if (existing) return res.status(409).json({ error: 'An account with this email already exists. Please login.' });
      const hashed = await bcrypt.hash(password, 10);
      savedUser = await JsonStore.createUser({
        email: email.toLowerCase(), password: hashed,
        name: name || email.split('@')[0],
        stage: 'Class 11-12', targetDomain: 'Computer Science & AI',
        interests: ['Coding', 'Artificial Intelligence', 'Mathematics'],
        parentName: '', parentEmail: '',
      });
    } else {
      existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) return res.status(409).json({ error: 'An account with this email already exists. Please login.' });
      const hashed = await bcrypt.hash(password, 10);
      savedUser = await User.create({
        email: email.toLowerCase(), password: hashed, name: name || email.split('@')[0],
      });
    }

    return res.status(201).json({ token: getToken(savedUser._id || savedUser.id), user: sanitize(savedUser) });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Server error during registration.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    let user;
    if (isJsonMode()) {
      user = await JsonStore.findUserByEmail(email);
    } else {
      user = await User.findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      return res.status(401).json({ error: 'No account found with this email. Please sign up first.' });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ error: 'Incorrect password. Please try again.' });
    }
    return res.json({ token: getToken(user._id || user.id), user: sanitize(user) });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during login.' });
  }
});

export default router;