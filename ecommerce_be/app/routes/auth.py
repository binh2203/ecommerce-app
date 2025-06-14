from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud, database
from .. import models
from ..crud import verify_password

router = APIRouter()

@router.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    new_user = crud.create_user(db, user)
    return {
        "message": "Đăng ký thành công!",
        "user": new_user.email  # hoặc có thể là new_user.id, new_user.name tùy mục đích
    }
@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Email không tồn tại")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Sai mật khẩu")

    return {"message": "Đăng nhập thành công!", "user": db_user.name}
