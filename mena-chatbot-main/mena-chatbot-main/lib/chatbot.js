import fs from 'fs';
import path from 'path';

const KB_PATH = path.join(process.cwd(), 'knowledge_base', 'mena_kb.txt');
const INDEX_PATH = path.join(process.cwd(), 'vectorstore', 'index.json');

function loadIndex() {
  try {
    if (fs.existsSync(INDEX_PATH)) {
      const raw = fs.readFileSync(INDEX_PATH, 'utf-8');
      const j = JSON.parse(raw);
      if (Array.isArray(j.entries)) return j.entries;
    }
  } catch (e) {
    // fallthrough
  }
  // fallback to plain text KB
  if (fs.existsSync(KB_PATH)) {
    const raw = fs.readFileSync(KB_PATH, 'utf-8');
    // split on blank lines and separators
    const parts = raw.split(/\n\s*\n|---+/).map(s => s.trim()).filter(Boolean);
    return parts;
  }
  return [];
}

const KB = loadIndex();

export async function chat(query) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return 'Please provide a question.';

  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length) {
    for (const line of KB) {
      const low = line.toLowerCase();
      if (tokens.every(t => low.includes(t))) return line;
    }
  }

  // fallback: overlap score
  let best = '';
  let bestScore = 0;
  const qSet = new Set(q.split(/\s+/));
  for (const line of KB) {
    const words = new Set(line.toLowerCase().split(/\s+/));
    let score = 0;
    for (const w of qSet) if (words.has(w)) score++;
    if (score > bestScore) {
      bestScore = score;
      best = line;
    }
  }
  if (bestScore > 0) return best;

  return "I couldn't find that information in the MENA knowledge base.";
}
