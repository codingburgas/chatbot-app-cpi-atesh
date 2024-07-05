from .db import *
from fastapi.exceptions import HTTPException
from passlib.hash import bcrypt

import models.message_im

def get_messages(chat_id: int):
    curr.execute("""SELECT * FROM messages WHERE chat_id=%s""", (chat_id,))

    messages = curr.fetchall()
    
    return messages

def create_message(message: models.message_im.MessageIM, username: str):
    curr.execute("""SELECT * FROM chats WHERE id=%s""", (message.chat_id,))

    chat = curr.fetchone()

    curr.execute("""SELECT * FROM users WHERE username=%s""", (username,))

    user = curr.fetchone()

    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    
    if chat["user_id"] != user["id"]:
        raise HTTPException(status_code=403, detail="You are not the owner of this chat")

    curr.execute("""INSERT INTO messages (id, chat_id, content, author) VALUES (DEFAULT, %s, %s, %s) RETURNING *""", (message.chat_id, message.content, message.author))
    conn.commit()

    new_message = curr.fetchone()

    return new_message