# Path: backend\app\schemas\organizations.py

from bson import ObjectId
from pydantic import BaseModel, Field

from app.utils.shared import PyObjectId


class OrganizationBaseSchema(BaseModel):
    name: str = Field(..., description="Name of the organization")
    description: str = Field("", description="Description of the organization")
    created_by: PyObjectId = Field(..., description="Creator of the organization")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Organization Name",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "created_by": "60f7b1f9e13b4a4a9c5e9b3a",
            }
        }
