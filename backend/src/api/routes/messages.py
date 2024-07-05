from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt
from jwt.exceptions import InvalidTokenError
import os
from typing import Annotated
import db.db
import db.db_messages
import models.message_im
from models.model.model import model

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")
router = APIRouter()

public_key = "\n".join(os.getenv("RSA_PUBLIC_KEY").split("<end>"))

@router.post("/create/message", tags=["messages"])
async def create_message(token: Annotated[str, Depends(oauth2_scheme)], message: models.message_im.MessageIM):
    try:
        payload = jwt.decode(token, public_key, algorithms=["RS256"])
        username: str = payload["iss"]
        
        db.db_messages.create_message(message, username)

        result: str = model({"query": message.content})["result"]
        first_result = result.strip().split("\n")[0]

        message.content = first_result
        message.author = "AI"

        db.db_messages.create_message(message, username)

        return first_result

    except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")