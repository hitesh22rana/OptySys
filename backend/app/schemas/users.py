# Path: backend\app\schemas\users.py

from typing import Dict, List

from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field

from app.utils.shared import Experience, SocialLinks


class UserRegisterRequestSchema(BaseModel):
    email: EmailStr = Field(..., description="Email address of the user")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "email": "email@domain.com",
            }
        }


class UserDetailsSchema(BaseModel):
    email: EmailStr = Field(..., description="Email address of the user")
    password: str = Field(..., description="Password of the user")
    name: str = Field(..., description="Name of the user")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "email": "email@domain.com",
                "password": "password",
                "name": "John Doe",
            }
        }


class UserVerifyRequestSchema(BaseModel):
    user_details: UserDetailsSchema = Field(..., description="User details")
    otp: str = Field(..., description="OTP for email verification")
    token: str = Field(..., description="JWT token for email verification")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "user_details": {
                    "email": "email@domain.com",
                    "password": "password",
                    "name": "John Doe",
                },
                "otp": "123456",
                "token": "token",
            }
        }


class UserBaseSchema(BaseModel):
    email: EmailStr = Field(..., description="Email address of the user")
    password: str = Field(..., description="Password of the user")
    name: str = Field(..., description="Name of the user")
    summary: str = Field("", description="Summary of the user")
    social_links: List[Dict[SocialLinks, str]] = Field(
        [], description="List of social links of the user"
    )
    experiences: List[Experience] = Field(
        [], description="List of experiences of the user"
    )
    skills: List[str] = Field([], description="List of skills of the user")

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
                "experiences": [
                    {
                        "title": "Software Engineer",
                        "company": "Google",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    }
                ],
                "skills": ["Python", "JavaScript", "HTML", "CSS"],
                "organizations": ["60f7b1f9e13b4a4a9c5e9b3a"],
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
        self.id = user["_id"]
        self.email = user["email"]
        self.name = user["name"]
        self.summary = user["summary"]
        self.social_links = user["social_links"]
        self.experiences = user["experiences"]
        self.skills = user["skills"]
        self.organizations = user["organizations"]
        self.created_at = user["created_at"]

    def response(self) -> dict:
        return {
            "id": str(self.id),
            "email": self.email,
            "name": self.name,
            "summary": self.summary,
            "social_links": self.social_links,
            "experiences": self.experiences,
            "skills": self.skills,
            "organizations": self.organizations,
            "created_at": self.created_at,
        }
