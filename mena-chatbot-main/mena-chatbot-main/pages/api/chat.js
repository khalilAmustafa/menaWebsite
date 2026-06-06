import { chat } from '../../lib/chatbot';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body || {};
  if (!query) return res.status(400).json({ error: 'missing query' });

  try {
    const answer = await chat(String(query));
    return res.status(200).json({ answer });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal error' });
  }
}
