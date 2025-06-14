from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal

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
