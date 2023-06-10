from fastapi import APIRouter, Body

from app.database.organizations import Organizations
from app.models.organizations import OrganizationBaseModel

router = APIRouter(
    tags=["Organizations"],
    prefix="/organizations",
)

"""
    Post method for creating a new organization.
    
    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error
    
    Returns:
        _type_: Organization
"""


@router.post("/", response_description="Create a new organization")
async def create_organization(organization: OrganizationBaseModel = Body(...)):
    return await Organizations().create_organization(organization)
