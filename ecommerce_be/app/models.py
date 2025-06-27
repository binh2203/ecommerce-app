from sqlalchemy import Column, Integer, String, DECIMAL, Text, TIMESTAMP, func, Date, DateTime, Enum
from sqlalchemy.ext.declarative import declarative_base
from datetime import date
import enum

Base = declarative_base()

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    price = Column(DECIMAL(10, 2), nullable=False)
    quantity = Column(Integer, nullable=False)
    image_url = Column(String(512))
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp())
    updated_at = Column(TIMESTAMP, server_default=func.current_timestamp(), onupdate=func.current_timestamp())

class GenderEnum(str, enum.Enum):
    male = "male"
    female = "female"
    other = "other"

class ProviderEnum(str, enum.Enum):
    google = "google"
    facebook = "facebook"
    email = "email"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    name = Column(String(255), default="")
    gender = Column(Enum(GenderEnum), default=GenderEnum.other)
    date_of_birth = Column(Date, default=date(2000, 1, 1))
    picture = Column(String(255), default="avatar.jpg")
    password = Column(String(255), nullable=True)
    login_provider = Column(Enum(ProviderEnum), default=ProviderEnum.email)
    created_at = Column(DateTime, default=func.now())