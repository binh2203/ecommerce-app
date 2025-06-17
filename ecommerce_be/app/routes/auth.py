from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse, RedirectResponse
from sqlalchemy.orm import Session
from .. import schemas, crud, database, models
from ..crud import verify_password
from ..auth_utils import create_access_token
from ..database import get_db
from dotenv import load_dotenv
from authlib.integrations.starlette_client import OAuth
from ..auth_utils import get_current_user_from_token

import os

# Load biến môi trường
load_dotenv("app/.env")

router = APIRouter()

# Cấu hình OAuth
oauth = OAuth()
oauth.register(
    name='google',
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={
        'scope': 'openid email profile'
    }
)

# ===================== GOOGLE LOGIN ======================

@router.get("/auth/google/login")
async def login_via_google(request: Request):
    redirect_uri = request.url_for("google_callback")  # sẽ redirect về endpoint này
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/auth/google/callback")
async def google_callback(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
        resp = await oauth.google.get("https://openidconnect.googleapis.com/v1/userinfo", token=token)
        userinfo = resp.json()
        print(userinfo)
        email = userinfo.get("email")
        name = userinfo.get("name", "")
        picture = userinfo.get("picture", "")
        login_provider = "google"

        if not email:
            raise HTTPException(status_code=400, detail="Không lấy được email từ Google")

        db: Session = next(get_db())
        user = db.query(models.User).filter(models.User.email == email).first()

        if not user:
            user_in = schemas.UserCreate(
                email=email,
                password="google_oauth_dummy",  # không dùng đến
                name=name,
                gender="other",  # mặc định nếu không có
                date_of_birth="2000-01-01",  # mặc định nếu không có
                picture=picture,
                login_provider=login_provider
            )
            user = crud.create_user(db, user_in)

        token = create_access_token(data={"sub": user.email})

        return RedirectResponse(url=f"http://localhost:5173/after-login?access_token={token}")
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})


# ===================== REGISTER & LOGIN ======================

@router.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email đã tồn tại")
    new_user = crud.create_user(db, user)
    return {"message": "Đăng ký thành công!", "user": new_user.email}

@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Sai email hoặc mật khẩu")

    token = create_access_token(data={"sub": db_user.email})
    return {
        "message": "Đăng nhập thành công!",
        "access_token": token,
        "user": {
            "name": db_user.name,
            "email": db_user.email,
            "picture": db_user.picture
        }
    }
@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user_from_token), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == current_user["email"]).first()
    if not user:
        raise HTTPException(status_code=404, detail="Không tìm thấy người dùng")

    return {
        "name": user.name,
        "email": user.email,
        "picture": user.picture
    }