# MENA Chatbot — Next.js-ready

This repository contains the original Python chatbot prototype and a lightweight Next.js API wrapper to deploy the chatbot on a Node/Next.js environment.

Quick setup (Node.js + Next):

```bash
cd "c:/Users/MCC/Downloads/MENA Org"
npm install
npm run build-index   # generate vectorstore/index.json from KB
npm run dev           # start Next.js dev server on port 3000
```

API:
- POST /api/chat
  - body: `{ "query": "your question" }`
  - response: `{ "answer": "..." }`

Notes:
- The Node API reads `vectorstore/index.json` if present, otherwise falls back to `knowledge_base/mena_kb.txt`.
- This is a minimal, file-based retrieval implementation intended for light usage and testing. For production, replace the retrieval with a proper vector database and embeddings.
