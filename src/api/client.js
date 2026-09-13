const API_BASE = import.meta.env.VITE_API_BASE || '';

function getToken() {
  return localStorage.getItem('career_genai_token') || '';
}

function setToken(token) {
  if (token) localStorage.setItem('career_genai_token', token);
  else localStorage.removeItem('career_genai_token');
}

async function request(method, path, body, { auth = true, formData = false } = {}) {
  const headers = {};
  if (!formData) headers['Content-Type'] = 'application/json';
  const token = getToken();
  if (auth && token) headers['Authorization'] = `Bearer ${token}`;

  let payload;
  if (body) payload = formData ? body : JSON.stringify(body);
  else if (method !== 'GET') payload = JSON.stringify({});

  try {
    const res = await fetch(`${API_BASE}${path}`, { method, headers, body: payload });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.error || 'Request failed');
      err.status = res.status;
      throw err;
    }
    return data;
  } catch (err) {
    if (err.status === 401 && auth && path !== '/api/auth/login') {
      setToken('');
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
    throw err;
  }
}

export const api = {
  // Auth
  register: (data) => request('POST', '/api/auth/register', data, { auth: false }),
  login: (data) => request('POST', '/api/auth/login', data, { auth: false }),

  // Profile
  getProfile: () => request('GET', '/api/profile'),
  updateProfile: (data) => request('PUT', '/api/profile', data),

  // Chat
  sendChat: (data) => request('POST', '/api/chat', data),
  getChatHistory: () => request('GET', '/api/chat/history'),
  getReports: () => request('GET', '/api/chat/reports'),
  sendAIChat: (data) => request('POST', '/api/ai/chat', data, { auth: false }),

  // Progress
  getProgress: () => request('GET', '/api/progress'),
  updateTasks: (tasks) => request('PUT', '/api/progress/tasks', { tasks }),
  saveQuizScore: (data) => request('POST', '/api/progress/quiz', data),
  saveAtsScore: (data) => request('POST', '/api/progress/ats', data),

  token: getToken,
  setToken,
};