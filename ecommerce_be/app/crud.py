import bcrypt
from . import models
from sqlalchemy.orm import Session

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
