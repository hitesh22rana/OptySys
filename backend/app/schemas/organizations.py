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

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "OrganizationName",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
    created_by: PyObjectId = Field(..., description="User ID of the creator")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
