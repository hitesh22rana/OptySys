from datetime import datetime
from typing import List

from bson import ObjectId
from models import PyObjectId, Role
from pydantic import BaseModel, EmailStr, Field

"""
Request model for creating a new user
"""


class UserBaseModel(BaseModel):
    _id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    email: EmailStr = Field(..., description="Email address of the user")
    password: str
    name: str
    contact: str
    role: Role = Field(..., description="Role of the user")
    skills: List[str] = Field([], description="List of skills of the user")
    created_at: datetime
    updated_at: datetime

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "email": "email@domain.com",
                "password": "password",
                "name": "John Doe",
                "contact": "+911234567890",
                "role": "admin",
                "created_at": "2021-01-01T00:00:00.000Z",
                "updated_at": "2021-01-01T00:00:00.000Z",
            }
        }
