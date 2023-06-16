# Path: backend\app\models\opportunities.py

from datetime import datetime
from typing import List

from bson import ObjectId
from pydantic import BaseModel, Field

from app.utils.shared import PyObjectId

"""
ModelName:
    Base model for Opportunity

Fields:
    id: Id of the opportunity
    title: Title of the opportunity
    company: Company name
    description: Description of the opportunity
    location: Location of the opportunity
    link: Link to the opportunity
    requirements: List of requirements for the opportunity
    organization_id: Id of the organization
    created_by: Creator of the organization
    created_at: Created at timestamp of the organization
"""


class OpportunityBaseModel(BaseModel):
    # Required Fields
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str = Field(..., description="Title of the opportunity")
    company: str = Field(..., description="Company name")
    description: str = Field(..., description="Description of the opportunity")
    location: str = Field(..., description="Location of the opportunity")
    link: str = Field(..., description="Link to the opportunity")
    requirements: List[str] = Field(
        [], description="List of requirements for the opportunity"
    )
    organization_id: PyObjectId = Field(..., description="Id of the organization")
    created_by: PyObjectId = Field(..., description="Creator of the opportunity")

    # Default Fields
    created_at: datetime = datetime.utcnow().replace(microsecond=0)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
