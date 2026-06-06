import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")

with open(
    "knowledge_base/mena_kb.txt",
    "r",
    encoding="utf-8"
) as f:
    KNOWLEDGE_BASE = f.read()


class MenaChatbot:

    def ask(self, question):

        prompt = f"""
        You are the official AI assistant for MENA Organization.

        Rules:
        - Answer only using the provided knowledge base.
        - Be concise and professional.
        - If information is unavailable, say:
         "I could not find that information in the MENA knowledge base, please contact a MENA advisor for more information."
        - Do not invent facts.
        - When possible, provide bullet points.
        - If the question is about MENA programs, missions, advisors, founders, vision, or activities, provide complete details.

Knowledge Base:
{KNOWLEDGE_BASE}

Question:
{question}
"""

        response = model.generate_content(prompt)

        return response.text