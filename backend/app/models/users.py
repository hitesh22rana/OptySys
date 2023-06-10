# Path: backend\app\models\users.py

from datetime import datetime
from typing import Dict, List

from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field

from app.lib.shared import Experience, PyObjectId, SocialLinks

"""
ModelName:
    Base model for user

Fields:
    id: Id of the user
    email: Email address of the user
    password: Password of the user
    name: Name of the user
    summary: Summary of the user
    social_links: List of social links of the user
    experience: List of experiences of the user
    skills: List of skills of the user
    organization: List of organizations of the user
    created_at: Created at timestamp of the user
"""


class UserBaseModel(BaseModel):
    # Required Fields
    _id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    email: EmailStr = Field(..., description="Email address of the user")
    password: str = Field(..., description="Password of the user")
    name: str = Field(..., description="Name of the user")
    summary: str = Field("", description="Summary of the user")
    social_links: List[Dict[SocialLinks, str]] = Field(
        [], description="List of social links of the user"
    )
    experience: List[Experience] = Field(
        [], description="List of experiences of the user"
    )
    skills: List[str] = Field([], description="List of skills of the user")
    organization: List[PyObjectId] = Field(
        [], description="List of organizations of the user"
    )

    # Default Fields
    created_at: datetime = datetime.utcnow()

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
