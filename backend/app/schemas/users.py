# Purpose: User schema
# Path: backend\app\schemas\users.py

from typing import Dict, List

from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field, validator

from app.utils.shared import Experience, SocialLinks
from app.utils.validators import validate_experiences, validate_links, validate_skills


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
    password: str = Field(
        ...,
        description="Password of the user",
        min_length=8,
        max_length=50,
        regex="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*])[a-zA-Z\d@!#$%^&*]{8,}$",
        type="string",
    )
    name: str = Field(
        ..., description="Name of the user", min_length=3, max_length=50, type="string"
    )

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "email": "email@domain.com",
                "password": "Password@123",
                "name": "John Doe",
            }
        }


class UserVerifyRequestSchema(BaseModel):
    user_details: UserDetailsSchema = Field(..., description="User details")
    otp: str = Field(
        ...,
        description="OTP for email verification",
        length=6,
        min_length=6,
        max_length=6,
        type="string",
    )
    token: str = Field(
        ..., description="JWT token for email verification", min_length=1, type="string"
    )

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


class UserLoginRequestSchema(BaseModel):
    email: EmailStr = Field(..., description="Registered Email address of the user")
    password: str = Field(
        ...,
        description="Password of the user",
        min_length=8,
        max_length=50,
        type="string",
    )

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


class UserForgotPasswordRequestSchema(BaseModel):
    email: EmailStr = Field(..., description="Registered Email address of the user")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "email": "email@domain.com",
            }
        }


class UserUpdateRequestSchema(BaseModel):
    summary: str = Field(..., description="Summary of the user", max_length=500)
    socials: List[Dict[SocialLinks, str]] = Field(
        ..., description="List of social links of the user", min_items=1
    )
    experiences: List[Experience] = Field(
        ..., description="List of experiences of the user", min_items=0
    )
    skills: List[str] = Field(
        ..., description="List of skills of the user", min_items=1, min_length=1
    )
    achievements: List[str] = Field(
        ..., description="List of achievements of the user", min_items=0, min_length=3
    )

    @validator("socials")
    def validate_socials(cls, socials):
        return validate_links(socials)

    @validator("experiences")
    def validate_experiences(cls, experiences):
        return validate_experiences(experiences)

    @validator("skills")
    def validate_skills(cls, skills):
        return validate_skills(skills)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "socials": [
                    {"resume": "https://example.com/resume"},
                    {"portfolio": "https://example.com/portfolio"},
                    {"linkedin": "https://linkedin.com/in/johndoe"},
                    {"github": "https://github.com/johndoe"},
                    {"twitter": "https://twitter.com/johndoe"},
                    {"behance": "https://behance.com/johndoe"},
                    {"dribbble": "https://dribbble.com/johndoe"},
                ],
                "experiences": [
                    {
                        "title": "Software Engineer",
                        "company": "Google",
                        "description": [
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        ],
                    }
                ],
                "skills": ["python", "javascript", "html", "css"],
                "achievements": [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                ],
            }
        }


class UserResponseSchema:
    def __init__(self, user: dict):
        self.id = user["_id"]
        self.email = user["email"]
        self.name = user["name"]
        self.summary = user["summary"]
        self.socials = user["socials"]
        self.experiences = user["experiences"]
        self.skills = user["skills"]
        self.achievements = user["achievements"]
        self.organizations = user["organizations"]
        self.opportunities = user["opportunities"]
        self.requests = user["requests"]
        self.activated = user["activated"]
        self.created_at = user["created_at"]

    def response(self) -> dict:
        return {
            "id": str(self.id),
            "email": self.email,
            "name": self.name,
            "summary": self.summary,
            "socials": self.socials,
            "experiences": self.experiences,
            "skills": self.skills,
            "achievements": self.achievements,
            "organizations": self.organizations,
            "opportunities": self.opportunities,
            "requests": self.requests,
            "activated": self.activated,
            "created_at": self.created_at,
        }
