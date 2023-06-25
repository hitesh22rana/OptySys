# Purpose: User model
# Path: backend\app\models\users.py

from datetime import datetime
from typing import Dict, List

from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field

from app.utils.shared import Experience, PyObjectId, SocialLinks

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
    achievements: List of achievements of the user
    organization: List of organizations of the user
    opprtunities: List of opportunities of the user
    activated: Activation status of the user
    created_at: Created at timestamp of the user
"""


class UserBaseModel(BaseModel):
    # Required Fields
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    email: EmailStr = Field(..., description="Email address of the user")
    password: str = Field(..., description="Password of the user")
    name: str = Field(..., description="Name of the user")
    summary: str = Field(default="", description="Summary of the user")
    social_links: List[Dict[SocialLinks, str]] = Field(
        default=[], description="List of social links of the user"
    )
    experiences: List[Experience] = Field(
        default=[], description="List of experiences of the user"
    )
    skills: List[str] = Field(default=[], description="List of skills of the user")
    achievements: List[str] = Field(
        default=[], description="List of achievements of the user"
    )
    organizations: List[PyObjectId] = Field(
        default=[], description="List of organizations of the user"
    )
    opportunities: List[PyObjectId] = Field(
        default=[], description="List of opportunities of the user"
    )

    # Default Fields
    activated: bool = False
    created_at: datetime = datetime.utcnow().replace(microsecond=0)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
