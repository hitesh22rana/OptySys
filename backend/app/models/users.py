# Path: backend\app\models\users.py

from datetime import datetime
from typing import List

from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field

from app.models import Experience, PyObjectId, Role, SocialLinks

"""
Request model for creating a new user
"""


class UserBaseModel(BaseModel):
    # Required Fields
    _id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    email: EmailStr = Field(..., description="Email address of the user")
    password: str = Field(..., description="Password of the user")
    name: str = Field(..., description="Name of the user")
    summary: str = Field("", description="Summary of the user")
    social_links: List[SocialLinks] = Field(
        [], description="List of social links of the user"
    )
    experience: List[Experience] = Field(
        [], description="List of experiences of the user"
    )
    skills: List[str] = Field([], description="List of skills of the user")

    # Default Fields
    created_at: datetime = datetime.utcnow()

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "email": "email@domain.com",
                "password": "password",
                "name": "John Doe",
                "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "social_links": [
                    "resume",
                    "linkedin",
                    "github",
                    "twitter",
                    "behance",
                    "dribble",
                ],
                "experience": [
                    {
                        "title": "Software Engineer",
                        "company": "Google",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    }
                ],
                "skills": ["Python", "JavaScript", "HTML", "CSS"],
            }
        }


class UserModel(UserBaseModel):
    organization: List[PyObjectId] = Field(
        [], description="List of organizations of the user"
    )

    class Config:
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "email": "email@domain.com",
                "password": "password",
                "name": "John Doe",
                "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "social_links": [
                    "resume",
                    "linkedin",
                    "github",
                    "twitter",
                    "behance",
                    "dribble",
                ],
                "experience": [
                    {
                        "title": "Software Engineer",
                        "company": "Google",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    }
                ],
                "skills": ["Python", "JavaScript", "HTML", "CSS"],
                "organization": ["60f7b1f9e13b4a4a9c5e9b3a"],
            }
        }
