from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt
from jwt.exceptions import InvalidTokenError
import os
from typing import Annotated
import db.db_chats
import db.db_messages
import models.chat_im

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")
router = APIRouter()

public_key = "\n".join(os.getenv("RSA_PUBLIC_KEY").split("<end>"))

@router.get("/get/chats", tags=["chats"])
async def get_user_chats(token: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = jwt.decode(token, public_key, algorithms=["RS256"])
        username: str = payload["iss"]

        chats = db.db_chats.get_chats(username)
        returnable_chats = []

        for chat in chats:
            returnable_chats.append({"id": chat["id"], "name": chat["name"]})

        return returnable_chats
    
    except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
@router.post("/create/chat", tags=["chats"])
async def create_user_chat(token: Annotated[str, Depends(oauth2_scheme)], chat: models.chat_im.ChatIM):
    try:
        payload = jwt.decode(token, public_key, algorithms=["RS256"])
        username: str = payload["iss"]

        new_chat = db.db_chats.create_chat(username, chat)

        return new_chat
    
    except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

@router.get("/get/chat/{chat_id}", tags=["chats"])
async def get_user_chat(token: Annotated[str, Depends(oauth2_scheme)], chat_id: int):
    try:
        payload = jwt.decode(token, public_key, algorithms=["RS256"])
        username: str = payload["iss"]

        chat = db.db_chats.get_chat(username, chat_id)
        messages = db.db_messages.get_messages(chat_id)

        for i in range(len(messages)):
            messages[i] = {
                "content": messages[i]["content"],
                "author": messages[i]["author"]
            }

        return {
            "name": chat["name"],
            "messages": messages
        }
    
    except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    

@router.delete("/delete/chat/{chat_id}", tags=["chats"])
async def delete_user_chat(token: Annotated[str, Depends(oauth2_scheme)], chat_id: int):
    try:
        payload = jwt.decode(token, public_key, algorithms=["RS256"])
        username: str = payload["iss"]

        db.db_chats.delete_chat(username, chat_id)
        
    except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
@router.delete("/delete/chats", tags=["chats"])
async def delete_all_user_chats(token: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = jwt.decode(token, public_key, algorithms=["RS256"])
        username: str = payload["iss"]

        db.db_chats.delete_all_chats(username)
    
    except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
@router.get("/search/chats", tags=["chats"])
async def search_all_user_chats(token: Annotated[str, Depends(oauth2_scheme)], query: str = ""):
    try:
        payload = jwt.decode(token, public_key, algorithms=["RS256"])
        username: str = payload["iss"]

        chats = db.db_chats.search_all_chats(username, query)
        returnable_chats = []

        for chat in chats:
            returnable_chats.append({"id": chat["id"], "name": chat["name"]})

        return returnable_chats

    except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")