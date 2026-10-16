// Gmail API integration (REST + OAuth2) — see gmailapi.md
// Sends emails through: POST /gmail/v1/users/me/messages/send
// Docs: https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/send

const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const GMAIL_MESSAGES_ENDPOINT = 'https://gmail.googleapis.com/gmail/v1/users/me/messages';

// Gmail sending works only when EMAIL_SERVICE=on and OAuth2 credentials are set.
export const isGmailEnabled = () =>
  process.env.EMAIL_SERVICE === 'on' &&
  !!process.env.GMAIL_USER &&
  !!process.env.GMAIL_CLIENT_ID &&
  !!process.env.GMAIL_CLIENT_SECRET &&
  !!process.env.GMAIL_REFRESH_TOKEN;

async function getAccessToken() {
  const params = new URLSearchParams({
    client_id: process.env.GMAIL_CLIENT_ID,
    client_secret: process.env.GMAIL_CLIENT_SECRET,
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    grant_type: 'refresh_token',
  });

  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!res.ok) {
    throw new Error(`Gmail token request failed (${res.status}): ${await res.text()}`);
  }

  const data = await res.json();
  if (!data.access_token) {
    throw new Error('No access_token returned from Google OAuth.');
  }
  return data.access_token;
}

// Build an RFC-822 style message + base64url encode (what Gmail API expects)
function buildRawMessage({ to, from, subject, html }) {
  const body = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject.replace(/\r?\n/g, ' ')}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(html, 'utf8').toString('base64'),
  ].join('\r\n');

  return Buffer.from(body, 'utf8').toString('base64url');
}

/**
 * Send an HTML email via the Gmail REST API.
 * The email is sent FROM process.env.GMAIL_USER (the app's Gmail account).
 */
export async function sendGmail({ to, subject, html }) {
  if (!isGmailEnabled()) return { skipped: true, reason: 'email-not-enabled' };
  if (!to || !to.includes('@')) {
    throw new Error('A valid recipient email address is required.');
  }

  const from = `Career GenAI Eshva <${process.env.GMAIL_USER}>`;
  const raw = buildRawMessage({ to, from, subject, html });
  const accessToken = await getAccessToken();

  const res = await fetch(GMAIL_MESSAGES_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw }),
  });

  if (!res.ok) {
    throw new Error(`Gmail send failed (${res.status}): ${await res.text()}`);
  }

  return res.json();
}

// ── Email content builders ──────────────────────────────────────────

export function safetyAlertHTML({ studentName, parentName, flaggedWords, originalMessage, timestamp }) {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;border:1px solid #E2E4D8;border-radius:12px;overflow:hidden">
      <div style="background:#E0455B;padding:16px 24px">
        <h2 style="margin:0;color:#fff;font-size:18px">⚠️ Safety Alert — Career GenAI Eshva</h2>
      </div>
      <div style="padding:24px;background:#FFFFFF;color:#243027">
        <p style="margin:0 0 12px">Dear <strong>${esc(parentName || 'Parent/Guardian')}</strong>,</p>
        <p style="margin:0 0 12px">During a guidance session, <strong>${esc(studentName || 'your child')}</strong> used language that triggered our safety system. We monitor conversations to keep this a safe, academic space, and we report concerning content to guardians as required.</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px">
          <tr><td style="padding:8px 12px;background:#F4F7F1;border:1px solid #E2E4D8;font-weight:bold">Time</td><td style="padding:8px 12px;border:1px solid #E2E4D8">${esc(timestamp || '—')}</td></tr>
          <tr><td style="padding:8px 12px;background:#F4F7F1;border:1px solid #E2E4D8;font-weight:bold">Flagged words</td><td style="padding:8px 12px;border:1px solid #E2E4D8">${esc((flaggedWords || []).join(', '))}</td></tr>
          <tr><td style="padding:8px 12px;background:#F4F7F1;border:1px solid #E2E4D8;font-weight:bold">Original message</td><td style="padding:8px 12px;border:1px solid #E2E4D8">${esc(originalMessage || '—')}</td></tr>
        </table>
        <p style="margin:0;font-size:13px;color:#6B7D70">If you have any concerns, please reach out. — Eshva, your AI career mentor 🌿</p>
      </div>
    </div>`;
}

export function progressReportHTML({ user, progress, reports }) {
  const tasks = progress?.tasks || [];
  const done = tasks.filter((t) => t.isCompleted).length;
  const quizScores = progress?.quizScores || [];
  const atsScores = progress?.atsScores || [];
  const alerts = reports || [];

  const taskRows = tasks.length
    ? tasks
        .map(
          (t) => `<tr>
            <td style="padding:6px 10px;border:1px solid #E2E4D8">${esc(t.title || '')}</td>
            <td style="padding:6px 10px;border:1px solid #E2E4D8">${esc(t.category || '')}</td>
            <td style="padding:6px 10px;border:1px solid #E2E4D8;color:${t.isCompleted ? '#3F7D58' : '#D4A373'}">${t.isCompleted ? '✅ Done' : '⏳ Pending'}</td>
          </tr>`
        )
        .join('')
    : '<tr><td colspan="3" style="padding:10px;border:1px solid #E2E4D8;color:#6B7D70">No tasks yet.</td></tr>';

  const quizRows = quizScores.length
    ? quizScores
        .map(
          (q) => `<tr>
            <td style="padding:6px 10px;border:1px solid #E2E4D8">${esc(q.domain || '—')}</td>
            <td style="padding:6px 10px;border:1px solid #E2E4D8">${Number(q.score) || 0} / ${Number(q.total) || 0}</td>
            <td style="padding:6px 10px;border:1px solid #E2E4D8">${esc(fmtDate(q.date))}</td>
          </tr>`
        )
        .join('')
    : '<tr><td colspan="3" style="padding:10px;border:1px solid #E2E4D8;color:#6B7D70">No quizzes taken yet.</td></tr>';

  const atsRows = atsScores.length
    ? atsScores
        .map(
          (a) => `<tr>
            <td style="padding:6px 10px;border:1px solid #E2E4D8">${esc(a.fileName || a.domain || 'Resume')}</td>
            <td style="padding:6px 10px;border:1px solid #E2E4D8">${esc(a.domain || '—')}</td>
            <td style="padding:6px 10px;border:1px solid #E2E4D8">${Number(a.score) || 0}%</td>
          </tr>`
        )
        .join('')
    : '<tr><td colspan="3" style="padding:10px;border:1px solid #E2E4D8;color:#6B7D70">No resume scores yet.</td></tr>';

  const alertRows = alerts.length
    ? alerts
        .map(
          (r) => `<tr>
            <td style="padding:6px 10px;border:1px solid #E2E4D8">${esc(r.timestamp || fmtDate(r.createdAt))}</td>
            <td style="padding:6px 10px;border:1px solid #E2E4D8;color:#E0455B">${esc((r.flaggedWords || []).join(', '))}</td>
          </tr>`
        )
        .join('')
    : '<tr><td colspan="2" style="padding:10px;border:1px solid #E2E4D8;color:#6B7D70">No safety alerts recorded. ✅</td></tr>';

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:0 auto;border:1px solid #E2E4D8;border-radius:12px;overflow:hidden">
      <div style="background:#3F7D58;padding:16px 24px;color:#fff">
        <h2 style="margin:0;font-size:18px">📊 Progress Report — Career GenAI Eshva</h2>
        <p style="margin:4px 0 0;font-size:13px;opacity:.9">Generated ${new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
      </div>
      <div style="padding:24px;background:#FFFFFF;color:#243027">
        <p style="margin:0 0 16px">Dear <strong>${esc(user?.parentName || 'Parent/Guardian')}</strong>, here is the latest progress for <strong>${esc(user?.name || 'your child')}</strong> (${esc(user?.stage || '—')} · ${esc(user?.targetDomain || '—')}).</p>

        <h3 style="font-size:15px;margin:0 0 8px;color:#3F7D58">Daily plan — ${done} / ${tasks.length} tasks completed</h3>
        <table style="width:100%;border-collapse:collapse;margin:0 0 20px;font-size:13px">${taskRows}</table>

        <h3 style="font-size:15px;margin:0 0 8px;color:#3F7D58">Quiz scores</h3>
        <table style="width:100%;border-collapse:collapse;margin:0 0 20px;font-size:13px"><tr style="background:#F4F7F1"><th style="text-align:left;padding:6px 10px;border:1px solid #E2E4D8">Domain</th><th style="text-align:left;padding:6px 10px;border:1px solid #E2E4D8">Score</th><th style="text-align:left;padding:6px 10px;border:1px solid #E2E4D8">Date</th></tr>${quizRows}</table>

        <h3 style="font-size:15px;margin:0 0 8px;color:#3F7D58">Resume (ATS) scores</h3>
        <table style="width:100%;border-collapse:collapse;margin:0 0 20px;font-size:13px"><tr style="background:#F4F7F1"><th style="text-align:left;padding:6px 10px;border:1px solid #E2E4D8">Resume</th><th style="text-align:left;padding:6px 10px;border:1px solid #E2E4D8">Role</th><th style="text-align:left;padding:6px 10px;border:1px solid #E2E4D8">Score</th></tr>${atsRows}</table>

        <h3 style="font-size:15px;margin:0 0 8px;color:#E0455B">Safety alerts</h3>
        <table style="width:100%;border-collapse:collapse;margin:0 0 20px;font-size:13px"><tr style="background:#F4F7F1"><th style="text-align:left;padding:6px 10px;border:1px solid #E2E4D8">Time</th><th style="text-align:left;padding:6px 10px;border:1px solid #E2E4D8">Flagged</th></tr>${alertRows}</table>

        <p style="margin:0;font-size:13px;color:#6B7D70">This report was requested by the student from the Career GenAI dashboard. — Eshva, your AI career mentor 🌿</p>
      </div>
    </div>`;
}

function esc(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fmtDate(value) {
  if (!value) return '—';
  const d = new Date(value);
  return isNaN(d.getTime()) ? '—' : d.toLocaleDateString('en-IN', { dateStyle: 'medium' });
}