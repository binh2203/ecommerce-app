# ecommerce_be/app/routes/product.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas

router = APIRouter()

@router.get("/products", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    products = db.query(models.Product).offset(skip).limit(limit).all()
    return products
