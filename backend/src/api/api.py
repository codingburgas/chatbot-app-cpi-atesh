from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, chats, messages, users

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(chats.router)
app.include_router(messages.router)
app.include_router(users.router)