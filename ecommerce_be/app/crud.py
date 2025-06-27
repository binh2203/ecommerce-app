import bcrypt
from . import models
from sqlalchemy.orm import Session
from PIL import Image
from io import BytesIO
import os
import re
import requests


BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())

def create_user(db: Session, user_data):
    hashed_pw = hash_password(user_data.password)
    user = models.User(
        email=user_data.email,
        name=user_data.name,
        gender=user_data.gender,
        date_of_birth=user_data.date_of_birth,
        picture=user_data.picture,
        login_provider=user_data.login_provider,
        password=hashed_pw,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user or not verify_password(password, user.password):
        return None
    return user

def sanitize_filename(email: str) -> str:
    """Chuyển email thành tên file an toàn, ví dụ: diemcongbinh2002_gmail_com.jpg"""
    return re.sub(r'[^a-zA-Z0-9]', '_', email) + ".jpg"

def save_avatar(image_url: str, email: str) -> str:
    response = requests.get(image_url)
    filename = f"{email}"
    folder = os.path.join(BASE_DIR, "data_base", "avatar_images")
    os.makedirs(folder, exist_ok=True)

    path = os.path.join(folder, filename)
    with open(path, "wb") as f:
        f.write(response.content)
    
    return f"/avatars/{filename}"