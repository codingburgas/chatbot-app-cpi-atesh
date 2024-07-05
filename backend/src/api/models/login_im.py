from pydantic import BaseModel

class LoginIM(BaseModel):
    username: str
    password: str