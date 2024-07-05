from .db import *
from passlib.hash import bcrypt

def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user['password']):
        return False
    return user

def get_user(username: str):
    curr.execute("""SELECT * FROM users WHERE lower(username) = %s""", (username.lower(),))
    user = curr.fetchone()
    return user

def verify_password(plain_password, db_password):
    return bcrypt.verify(plain_password, db_password)

def create_user(username: str, password: str):
    if get_user(username):
        return False

    hashed_password = bcrypt.hash(password)
    curr.execute("""INSERT INTO users (username, password) VALUES (%s, %s)""", (username.lower(), hashed_password))
    conn.commit()
    return True