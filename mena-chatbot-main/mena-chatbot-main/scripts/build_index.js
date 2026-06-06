const fs = require('fs');
const path = require('path');

const KB_PATH = path.join(process.cwd(), 'knowledge_base', 'mena_kb.txt');
const OUT_DIR = path.join(process.cwd(), 'vectorstore');
const OUT_PATH = path.join(OUT_DIR, 'index.json');

function build() {
  if (!fs.existsSync(KB_PATH)) {
    console.error('Knowledge base not found at', KB_PATH);
    process.exit(1);
  }
  const raw = fs.readFileSync(KB_PATH, 'utf-8');
  const parts = raw.split(/\n\s*\n|---+/).map(s => s.trim()).filter(Boolean);
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify({ entries: parts }, null, 2), 'utf-8');
  console.log('Wrote index with', parts.length, 'entries to', OUT_PATH);
}

if (require.main === module) build();
