import os
import chromadb
from chromadb.utils import embedding_functions

# Create vectorstore directory
os.makedirs("vectorstore", exist_ok=True)

# Load knowledge base
with open(
    "knowledge_base/mena_kb.txt",
    "r",
    encoding="utf-8"
) as f:
    text = f.read()

# Chunk text
chunk_size = 1000
overlap = 200

chunks = []

for i in range(0, len(text), chunk_size - overlap):
    chunk = text[i:i + chunk_size]

    if chunk.strip():
        chunks.append(chunk)

print(f"Created {len(chunks)} chunks")

# Embedding model
embedding_function = (
    embedding_functions.SentenceTransformerEmbeddingFunction(
        model_name="intfloat/multilingual-e5-base"
    )
)

# ChromaDB persistent storage
client = chromadb.PersistentClient(
    path="vectorstore"
)

# Delete old collection if exists
try:
    client.delete_collection("mena_kb")
except:
    pass

collection = client.create_collection(
    name="mena_kb",
    embedding_function=embedding_function
)

# Add chunks
collection.add(
    documents=chunks,
    ids=[f"chunk_{i}" for i in range(len(chunks))]
)

print("Knowledge base indexed successfully!")
print("Collection name: mena_kb")
print(f"Total chunks: {len(chunks)}")