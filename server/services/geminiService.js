import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;

function fallbackReply(text, profile) {
  const lower = text.toLowerCase();
  const domain = profile?.targetDomain || 'Computer Science & AI';
  const stage = profile?.stage || 'Class 11-12';

  if (lower.includes('jee') || lower.includes('cuet')) {
    return `For ${domain}, JEE Main and CUET are your primary entrance exams. Here's a focused strategy:\n\n📌 **Mathematics**: Focus on Calculus, Algebra, and Coordinate Geometry — they carry the highest weightage.\n📌 **Physics**: Mechanics and Electromagnetism are critical. Solve 30 numericals daily.\n📌 **Mock Tests**: Take 2 full-length mock tests per week under timed conditions.\n📌 **Registration**: Keep JEE Main registration windows (Nov–Jan) and CUET (Feb–March) saved in your calendar.\n\nYou are at ${stage} — focus on high-weightage topics first!`;
  }
  if (lower.includes('resume') || lower.includes('ats')) {
    return `To improve your resume score for ${domain}:\n\n✅ **Add 2-3 Full Stack Projects** with live links (GitHub + deployed URL)\n✅ **Technical Keywords**: Include Python, REST APIs, Docker, Git, System Design\n✅ **Metrics**: Add quantifiable impact (e.g., "Reduced API response time by 40%")\n✅ **ATS Format**: Use single-column layout, no tables, no graphics\n✅ **Skills Section**: List languages, frameworks, and tools clearly\n\nYour target domain is ${domain} — tailor every bullet point to matching job descriptions in this field.`;
  }
  if (lower.includes('interview') || lower.includes('technical')) {
    return `For technical interview preparation at top companies:\n\n🔹 **DSA**: Solve 150–200 LeetCode problems (focus on Arrays, Trees, Graphs, DP)\n🔹 **System Design**: Study Grokking the System Design Interview\n🔹 **CS Fundamentals**: Revise OS, DBMS, Networks\n🔹 **Mock Interviews**: Practice on Pramp.com or InterviewBit\n🔹 **HR Questions**: Prepare STAR-method answers\n\nFor ${stage}, I recommend starting DSA now and adding System Design in 2–3 months.`;
  }
  if (lower.includes('roadmap') || lower.includes('career')) {
    return `Here's your personalized roadmap for **${domain}**:\n\n**Stage 1 — ${stage}** (Current)\n• Master core fundamentals\n• Build 1–2 beginner projects\n• Prepare for entrance exams (JEE/CUET)\n\n**Stage 2 — College (Years 1-2)**\n• Learn Data Structures & Algorithms deeply\n• Complete online certifications\n• Contribute to open-source\n\n**Stage 3 — College (Years 3-4)**\n• Build 3-5 full-stack capstone projects\n• Target internships at product companies\n• Solve 200+ LeetCode problems\n\n**Stage 4 — Placement**\n• ATS-optimized resume with measurable impact\n• Mock interviews + system design rounds\n• Apply to Tier-1 companies\n\nYou're at ${stage} — focus on consistency and building your foundation!`;
  }
  return `I'm sorry, I couldn't understand your question. I am **Eshva**, your AI career mentor, and I specialize in exams (JEE, CUET, GATE), resume reviews, career roadmaps, and interview preparation.\n\nCould you try rephrasing your question or select one of the quick prompts below?`;
}

/**
 * Try the free NVIDIA NIM API (build.nvidia.com) — OpenAI-compatible chat completions.
 * Returns null if no key configured or the call fails.
 */
async function getNvidiaReply(text, profile) {
  if (!NVIDIA_API_KEY) return null;
  try {
    const endpoint = process.env.NVIDIA_ENDPOINT || 'https://integrate.api.nvidia.com/v1';
    const model = process.env.NVIDIA_MODEL || 'meta/llama-3.1-8b-instruct';
    const system = buildSystemPrompt(profile);

    const res = await fetch(`${endpoint}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: text },
        ],
        max_tokens: 700,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      console.warn(`[NVIDIA] HTTP ${res.status}`);
      return null;
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    return reply || null;
  } catch (err) {
    console.warn('[NVIDIA] error:', err.message);
    return null;
  }
}

/**
 * Get a real AI reply from Google Gemini (free tier) with NVIDIA NIM as fallback.
 * Falls back to local keyword reply if no API key is configured or the call fails.
 */
export async function getGeminiReply(text, profile) {
  // 1) Gemini first
  if (GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const modelNames = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-flash-lite'];
      for (const modelName of modelNames) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(buildSystemPrompt(profile) + `\n\nStudent question: ${text}\n\nYour response:`);
          const reply = result.response?.text?.() || '';
          if (reply && reply.trim()) return reply.trim();
        } catch (e) {
          console.warn(`[Gemini] ${modelName} failed:`, e.message);
        }
      }
    } catch (err) {
      console.warn('[Gemini] error:', err.message);
    }
  } else {
    console.warn('[AI] No GEMINI_API_KEY configured — trying NVIDIA.');
  }

  // 2) NVIDIA NIM fallback
  const nvidia = await getNvidiaReply(text, profile);
  if (nvidia) return nvidia;

  // 3) Local keyword fallback
  console.warn('[AI] No external AI available — using local fallback reply.');
  return fallbackReply(text, profile);
}

function buildSystemPrompt(profile) {
  const domain = profile?.targetDomain || 'Computer Science & AI';
  const stage = profile?.stage || 'Class 11-12';
  const name = profile?.name || 'Student';
  const interests = (profile?.interests || []).join(', ');

  return `You are **Eshva**, a friendly, safe, and encouraging AI career and academic mentor for Indian students.

Student profile:
- Name: ${name}
- Current academic stage: ${stage}
- Target career domain: ${domain}
- Interests: ${interests || 'not specified'}

Safety rules — ALWAYS follow these:
1. Never provide content that is sexual, violent, or promoting drugs.
2. Never encourage cheating on exams, plagiarism, or academic dishonesty (only legitimate study strategies).
3. If the student asks something inappropriate, politely decline and redirect to healthy career/study topics.
4. Prevent self-harm — if the student shows signs of distress, respond with care and recommend speaking with a trusted adult.

Your job:
- Answer the student's question in clear, structured Markdown (use **bold** headings and emoji sparingly).
- Tailor advice to their stage (${stage}) and target domain (${domain}).
- Keep answers practical and actionable. Indian education context (JEE, CUET, NEET, GATE, NITs, IITs, placements in LPA) is ideal.
- Keep replies concise (under ~200 words unless the student asks for deep detail).`;
}