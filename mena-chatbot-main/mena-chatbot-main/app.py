from fastapi import FastAPI
from pydantic import BaseModel

from chatbot import MenaChatbot

app = FastAPI()

bot = MenaChatbot()


class Question(BaseModel):
    question: str


@app.post("/chat")
def chat(req: Question):

    answer = bot.ask(req.question)

    return {
        "answer": answer
    }