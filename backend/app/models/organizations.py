# Purpose: Organization model
# Path: backend\app\models\organizations.py

from datetime import datetime
from typing import List

from bson import ObjectId
from pydantic import BaseModel, Field

from app.utils.shared import PyObjectId

"""
ModelName:
    Base model for Organization

Fields:
    id: Id of the organization
    name: Name of the organization
    description: Description of the organization
    private: Whether the organization is private or not
    created_by: Creator of the organization
    admins: List of admins of the organization
    members: List of members of the organization
    opportunities: Opportunities for the members of the organization
    created_at: Created at timestamp of the organization
"""


class OrganizationBaseModel(BaseModel):
    # Required Fields
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(..., description="Name of the organization")
    description: str = Field(default="", description="Description of the organization")
    private: bool = Field(
        default=False, description="Whether the organization is private or not"
    )
    created_by: PyObjectId = Field(..., description="Creator of the organization")
    admins: List[PyObjectId] = Field(
        default=[], description="List of admins of the organization"
    )
    members: List[PyObjectId] = Field(
        default=[], description="List of members of the organization"
    )
    opportunities: List[PyObjectId] = Field(
        default=[], description="Opportunities for the members of the organization"
    )

    # Default Fields
    created_at: datetime = datetime.utcnow().replace(microsecond=0)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
