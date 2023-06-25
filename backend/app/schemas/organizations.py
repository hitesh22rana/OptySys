# Purpose: Organization schema
# Path: backend\app\schemas\organizations.py

from bson import ObjectId
from pydantic import BaseModel, Field

from app.utils.shared import PyObjectId


class OrganizationBaseSchema(BaseModel):
    name: str = Field(
        ...,
        description="Name of the organization",
        max_length=50,
        min_length=3,
        regex="^[a-zA-Z0-9_-]+$",
        type="string",
    )
    description: str = Field(
        "",
        description="Description of the organization",
        min_length=3,
        max_length=500,
        type="string",
    )
    private: bool = Field(
        False,
        description="Whether the organization is private or not",
        type="boolean",
    )

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "OrganizationName",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "private": False,
            }
        }


class OrganizationSchema(OrganizationBaseSchema):
    name: str = Field(
        ...,
        description="Name of the organization",
        max_length=50,
        min_length=3,
        regex="^[a-zA-Z0-9_-]+$",
        type="string",
    )
    description: str = Field(
        "",
        description="Description of the organization",
        min_length=3,
        max_length=500,
        type="string",
    )
    private: bool = Field(
        False,
        description="Whether the organization is private or not",
        type="boolean",
    )
    created_by: PyObjectId = Field(..., description="User ID of the creator")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class OrganizationResponseSchema:
    def __init__(self, organization: dict):
        self.id = organization["_id"]
        self.name = organization["name"]
        self.description = organization["description"]
        self.private = organization["private"]
        self.admins = organization["admins"]
        self.members = organization["members"]
        self.opportunities = organization["opportunities"]
        self.created_at = organization["created_at"]

    def response(self) -> dict:
        return {
            "id": str(self.id),
            "name": self.name,
            "description": self.description,
            "private": self.private,
            "admins": self.admins,
            "members": self.members,
            "opportunities": self.opportunities,
            "created_at": self.created_at,
        }
