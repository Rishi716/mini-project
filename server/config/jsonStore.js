import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function fileFor(name) {
  return path.join(DATA_DIR, `${name}.json`);
}

function readCollection(name) {
  try {
    const raw = fs.readFileSync(fileFor(name), 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeCollection(name, items) {
  fs.writeFileSync(fileFor(name), JSON.stringify(items, null, 2), 'utf8');
}

const nextId = () => {
  const ids = readCollection('_counters');
  const next = (ids[0]?.value || 0) + 1;
  writeCollection('_counters', [{ value: next }]);
  return String(next);
};

const DEFAULT_TASKS = [
  { id: 1, title: 'Solve 10 Practice Questions on Binary Search Trees', category: 'Lesson', isCompleted: true },
  { id: 2, title: 'Revise Physics Weightage Topics for JEE / CUET', category: 'Revision', isCompleted: false },
  { id: 3, title: 'Take 5-Min Career Aptitude Quiz', category: 'Quiz', isCompleted: false },
  { id: 4, title: 'Review ATS Resume Keywords for Software Engineer Role', category: 'Project', isCompleted: false },
];

export const JsonStore = {
  // ── Users ─────────────────────────────────────────────
  async findUserByEmail(email) {
    const users = readCollection('users');
    return users.find(u => u.email === email.toLowerCase()) || null;
  },

  async findUserById(id) {
    const users = readCollection('users');
    return users.find(u => u.id === String(id)) || null;
  },

  async createUser(data) {
    const users = readCollection('users');
    const user = {
      id: nextId(),
      createdAt: new Date().toISOString(),
      ...data,
      email: data.email.toLowerCase(),
      stage: data.stage || 'Class 11-12',
      targetDomain: data.targetDomain || 'Computer Science & AI',
      interests: data.interests || ['Coding', 'Artificial Intelligence', 'Mathematics'],
      parentName: data.parentName || '',
      parentEmail: data.parentEmail || '',
    };
    users.push(user);
    writeCollection('users', users);
    return user;
  },

  async updateUserById(id, updates) {
    const users = readCollection('users');
    const idx = users.findIndex(u => u.id === String(id));
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...updates };
    writeCollection('users', users);
    return users[idx];
  },

  // ── Chat Messages ─────────────────────────────────────
  async createChatMessage(data) {
    const msgs = readCollection('chat');
    const msg = { _id: nextId(), createdAt: new Date().toISOString(), ...data };
    msgs.push(msg);
    writeCollection('chat', msgs);
    return msg;
  },

  async findChatMessagesByUser(userId, limit = 100) {
    return readCollection('chat')
      .filter(m => String(m.userId) === String(userId))
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .slice(-limit)
      .map(m => ({
        sender: m.sender,
        text: m.text,
        flagged: Boolean(m.flagged),
        isWarning: Boolean(m.isWarning),
      }));
  },

  // ── Safety Reports ────────────────────────────────────
  async createSafetyReport(data) {
    const reports = readCollection('reports');
    const report = { _id: nextId(), createdAt: new Date().toISOString(), ...data };
    reports.push(report);
    writeCollection('reports', reports);
    return report;
  },

  async findSafetyReportsByUser(userId, limit = 20) {
    return readCollection('reports')
      .filter(r => String(r.userId) === String(userId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  },

  // ── Progress ──────────────────────────────────────────
  async findProgressByUser(userId) {
    return readCollection('progress').find(p => String(p.userId) === String(userId)) || null;
  },

  async createProgress(userId) {
    const all = readCollection('progress');
    const doc = {
      userId: String(userId),
      tasks: DEFAULT_TASKS.map(t => ({ ...t })),
      quizScores: [],
      atsScores: [],
      lastUpdated: new Date().toISOString(),
    };
    all.push(doc);
    writeCollection('progress', all);
    return doc;
  },

  async updateProgress(userId, mutator) {
    const all = readCollection('progress');
    let idx = all.findIndex(p => String(p.userId) === String(userId));
    if (idx === -1) {
      const doc = await this.createProgress(userId);
      all.push(doc);
      idx = all.length - 1;
    }
    const updated = mutator(all[idx]);
    all[idx] = { ...all[idx], ...updated, lastUpdated: new Date().toISOString() };
    writeCollection('progress', all);
    return all[idx];
  },
};