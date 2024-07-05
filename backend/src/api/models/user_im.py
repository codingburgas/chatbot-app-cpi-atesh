from pydantic import BaseModel

class UserIM(BaseModel):
    username: str
    password: str