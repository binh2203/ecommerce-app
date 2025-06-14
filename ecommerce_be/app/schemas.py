from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal
from datetime import date

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
    name: str
    gender: str
    date_of_birth: date
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str
