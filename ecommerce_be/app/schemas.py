from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal
from datetime import date
from typing import Optional


class ProductBase(BaseModel):
    name: str
    description: str | None = None
    price: Decimal
    quantity: int
    image_url: str | None = None

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    created_at: datetime | None = None
    updated_at: datetime | None = None

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    email: str
    name: str = ""
    gender: str = "other"  
    date_of_birth: date = date(2000, 1, 1)
    picture: Optional[str] = "avatar.jpg"  
    password: Optional[str] = None
    login_provider: str = "google"  


class UserLogin(BaseModel):
    email: str
    password: str
