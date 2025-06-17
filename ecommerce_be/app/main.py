from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from .database import SessionLocal, engine, get_db
from . import models, schemas
from app.routes import auth
from app.routes import product
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv("app/.env")

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router, prefix="/api")
app.include_router(product.router, prefix="/api")

app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SECRET_KEY"),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
IMAGE_DIR = os.path.join(BASE_DIR, "data_base", "product_images")

app.mount("/images", StaticFiles(directory=IMAGE_DIR), name="images")


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

