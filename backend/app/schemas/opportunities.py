# Purpose: Opportunity schema
# Path: backend\app\schemas\opportunities.py

from typing import List

from bson import ObjectId
from pydantic import BaseModel, Field, validator

from app.utils.validators import validate_link


class OpportunityBaseSchema(BaseModel):
    title: str = Field(
        ...,
        description="Title of the opportunity",
        max_length=50,
        min_length=3,
        type="string",
    )
    company: str = Field(
        ...,
        description="Company name",
        max_length=50,
        min_length=3,
        type="string",
    )
    description: str = Field(
        ...,
        description="Description of the opportunity",
        max_length=1000,
        type="string",
    )
    location: str = Field(
        ...,
        description="Location of the opportunity",
        min_length=3,
        max_length=50,
        type="string",
    )
    link: str = Field(
        ...,
        description="Link of the opportunity",
    )
    requirements: List[str] = Field(
        [],
        description="List of requirements for the opportunity",
        type="array",
        min_items=1,
        min_length=3,
    )

    @validator("link")
    def validate_link(cls, link):
        return validate_link(link)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "title": "Opportunity Name",
                "company": "Company Name",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "location": "Location",
                "link": "https://www.google.com",
                "requirements": ["Requirement 1", "Requirement 2"],
            }
        }


class OpportunityDataSchema(BaseModel):
    link: str = Field(
        ...,
        description="Link of the opportunity",
    )
    site: str = Field(
        ...,
        description="Website of the opportunity",
        min_length=3,
        max_length=50,
        type="string",
    )

    @validator("link")
    def validate_link(cls, link):
        return validate_link(link)

    class Config:
        schema_extra = {
            "example": {
                "link": "https://www.google.com/",
                "site": "google",
            }
        }


class OpportunitySkillsSchema(BaseModel):
    description: str = Field(
        ...,
        description="Description of the opportunity",
        max_length=5000,
        type="string",
    )

    class Config:
        schema_extra = {
            "example": {
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            }
        }


class OpportunityResponseSchema:
    def __init__(self, opportunity: dict):
        self.id = opportunity["_id"]
        self.title = opportunity["title"]
        self.company = opportunity["company"]
        self.description = opportunity["description"]
        self.location = opportunity["location"]
        self.link = opportunity["link"]
        self.requirements = opportunity["requirements"]
        self.created_by = opportunity["created_by"]
        self.created_at = opportunity["created_at"]

    def response(self) -> dict:
        return {
            "id": str(self.id),
            "title": self.title,
            "company": self.company,
            "description": self.description,
            "location": self.location,
            "link": self.link,
            "requirements": self.requirements,
            "created_by": str(self.created_by),
            "created_at": self.created_at,
        }


class OportunityRecommenderSchema:
    def __init__(self, opportunity: dict):
        self.id = opportunity["_id"]
        self.title = opportunity["title"]
        self.company = opportunity["company"]
        self.description = opportunity["description"]
        self.location = opportunity["location"]
        self.link = opportunity["link"]
        self.requirements = opportunity["requirements"]

    def response(self) -> dict:
        return {
            "id": str(self.id),
            "title": self.title,
            "company": self.company,
            "description": self.description,
            "location": self.location,
            "link": self.link,
            "requirements": self.requirements,
        }
