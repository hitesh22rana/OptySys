# Path: backend\app\models\organizations.py

from datetime import datetime
from typing import List

from bson import ObjectId
from models import PyObjectId
from pydantic import BaseModel, Field


class OrganizationBaseModel(BaseModel):
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
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
