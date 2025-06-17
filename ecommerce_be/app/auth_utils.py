from datetime import datetime, timedelta
from jose import JWTError, jwt
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
import os

load_dotenv("app/.env")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user_from_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Token không hợp lệ")
        return {"email": email}
    except JWTError:
        raise HTTPException(status_code=401, detail="Token không hợp lệ")