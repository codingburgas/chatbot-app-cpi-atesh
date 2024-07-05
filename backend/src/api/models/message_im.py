from pydantic import BaseModel

class MessageIM(BaseModel):
    chat_id: int
    content: str
    author: str