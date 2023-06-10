# Path: backend\app\schemas\users.py

from typing import Dict, List

from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field

from app.utils.shared import Experience, PyObjectId, SocialLinks


class UserBaseSchema(BaseModel):
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
                    {"resume": "https://example.com/resume"},
                    {"linkedin": "https://linkedin.com/in/johndoe"},
                    {"github": "https://github.com/johndoe"},
                    {"twitter": "https://twitter.com/johndoe"},
                    {"behance": "https://behance.com/johndoe"},
                    {"dribble": "https://dribble.com/johndoe"},
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


class UserLoginRequestSchema(BaseModel):
    email: EmailStr = Field(..., description="Email address of the user")
    password: str = Field(..., description="Password of the user")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "email": "email@domain.com",
                "password": "password",
            }
        }


class UserResponseSchema:
    def __init__(self, user: dict):
        self._id = user["_id"]
        self.email = user["email"]
        self.name = user["name"]
        self.summary = user["summary"]
        self.social_links = user["social_links"]
        self.experience = user["experience"]
        self.skills = user["skills"]
        self.organization = user["organization"]
        self.created_at = user["created_at"]

    def response(self):
        return {
            "_id": str(self._id),
            "email": self.email,
            "name": self.name,
            "summary": self.summary,
            "social_links": self.social_links,
            "experience": self.experience,
            "skills": self.skills,
            "organization": self.organization,
            "created_at": self.created_at,
        }
