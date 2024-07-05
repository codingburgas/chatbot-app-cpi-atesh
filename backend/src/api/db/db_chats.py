from .db import *
from passlib.hash import bcrypt
from fastapi.exceptions import HTTPException
import models.chat_im

def get_chats(username: str):
    curr.execute("""SELECT chats.* FROM chats LEFT JOIN users ON chats.user_id=users.id WHERE users.username=%s""", (username,))

    chats = curr.fetchall()
    
    returnable_chats = []

    for chat in chats:
        returnable_chats.append({"id": chat["id"], "name": chat["name"]})

    return chats

def get_chat(username: str, chat_id: int): 
    curr.execute("""SELECT * FROM chats WHERE chats.id=%s""", (chat_id, ))

    chat = curr.fetchone()

    curr.execute("""SELECT * FROM users WHERE username=%s""", (username, ))

    user = curr.fetchone()

    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    
    if chat["user_id"] != user["id"]:
        raise HTTPException(status_code=403, detail="You are not the owner of this chat")

    return chat

def create_chat(username: str, chat: models.chat_im.ChatIM):
    curr.execute("""INSERT INTO chats (id, user_id, name) VALUES (DEFAULT, (SELECT id FROM users WHERE username=%s), %s) RETURNING *""", (username, chat.name))
    conn.commit()

    new_chat = curr.fetchone()

    return new_chat


def delete_chat(username: str, chat_id: int):
    curr.execute("""SELECT * FROM chats WHERE chats.id=%s""", (chat_id, ))

    chat = curr.fetchone()

    curr.execute("""SELECT * FROM users WHERE username=%s""", (username, ))

    user = curr.fetchone()

    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    
    if chat["user_id"] != user["id"]:
        raise HTTPException(status_code=403, detail="You are not the owner of this chat")
    
    curr.execute("""DELETE FROM messages WHERE chat_id=%s""", (chat_id, ))
    
    curr.execute("""DELETE FROM chats WHERE id=%s""", (chat_id, ))

    conn.commit()

def delete_all_chats(username: str):
    curr.execute("""SELECT * FROM users WHERE username=%s""", (username, ))

    user = curr.fetchone()

    curr.execute("""DELETE FROM messages WHERE chat_id IN (SELECT id FROM chats WHERE user_id=%s)""", (user["id"], ))

    curr.execute("DELETE FROM chats WHERE user_id=%s", (user["id"], ))

    conn.commit()

def search_all_chats(username: str, query: str):
    curr.execute("""SELECT * FROM users WHERE username=%s""", (username, ))

    user = curr.fetchone()

    curr.execute("""SELECT * FROM chats WHERE user_id=%s AND name ILIKE %s""", (user["id"], f"%{query}%"))

    chats = curr.fetchall()

    returnable_chats = []

    for chat in chats:
        returnable_chats.append({"id": chat["id"], "name": chat["name"]})

    return returnable_chats