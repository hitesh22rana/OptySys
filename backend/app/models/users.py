# Path: backend\app\models\users.py

from datetime import datetime
from typing import List

from bson import ObjectId
from models import Experience, PyObjectId, Role, SocialLinks
from pydantic import BaseModel, EmailStr, Field

"""
Request model for creating a new user
"""


class UserBaseModel(BaseModel):
    _id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    email: EmailStr = Field(..., description="Email address of the user")
    password: str = Field(..., description="Password of the user")
    name: str = Field(..., description="Name of the user")
    summary: str = Field("", description="Summary of the user")
    social_links: List[SocialLinks] = Field(
        [], description="List of social links of the user"
    )
    role: Role = Field(..., description="Role of the user")
    experience: List[Experience] = Field(
        [], description="List of experiences of the user"
    )
    skills: List[str] = Field([], description="List of skills of the user")
    organization: PyObjectId = Field(..., description="Organization of the user")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

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
                "role": "admin",
                "experience": [
                    {
                        "title": "Software Engineer",
                        "company": "Google",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    }
                ],
                "skills": ["Python", "JavaScript", "HTML", "CSS"],
                "organization": "5ff1e194b6a9d4a5f0f0b1b5",
                "created_at": "2021-01-01T00:00:00.000Z",
                "updated_at": "2021-01-01T00:00:00.000Z",
            }
        }
