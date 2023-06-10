# Path: backend\app\models\organizations.py

from datetime import datetime
from typing import List

from bson import ObjectId
from pydantic import BaseModel, Field

from app.lib.shared import PyObjectId

"""
ModelName:
    Base model for Organization

Fields:
    id: Id of the user
    name: Name of the organization
    description: Description of the organization
    created_by: Creator of the organization
    admins: List of admins of the organization
    members: List of members of the organization
    created_at: Created at timestamp of the organization
"""


class OrganizationBaseModel(BaseModel):
    # Required Fields
    _id: PyObjectId = Field(default_factory=ObjectId, alias="_id")
    name: str = Field(..., description="Name of the organization")
    description: str = Field("", description="Description of the organization")
    created_by: PyObjectId = Field(..., description="Creator of the organization")
    admins: List[PyObjectId] = Field(
        [], description="List of admins of the organization"
    )
    members: List[PyObjectId] = Field(
        [], description="List of members of the organization"
    )

    # Default Fields
    created_at: datetime = datetime.utcnow()

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Organization Name",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "created_by": "60f7b1f9e13b4a4a9c5e9b3a",
                "admins": ["60f7b1f9e13b4a4a9c5e9b3a"],
                "members": ["60f7b1f9e13b4a4a9c5e9b3a"],
            }
        }
