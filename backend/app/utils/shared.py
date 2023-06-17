# Purpose: Shared models and enums for the application.
# Path: backend\app\utils\shared.py

from enum import Enum

from bson import ObjectId
from pydantic import BaseModel


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class Experience(BaseModel):
    title: str
    company: str
    description: str


class SocialLinks(str, Enum):
    resume = "resume"
    linkedin = "linkedin"
    github = "github"
    twitter = "twitter"
    behance = "behance"
    dribble = "dribble"
