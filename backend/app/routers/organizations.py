from fastapi import APIRouter, Body, Request

from app.database.organizations import Organizations
from app.schemas.organizations import OrganizationBaseSchema

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


@router.post("", response_description="Create a new organization")
async def create_organization(
    request: Request, organization: OrganizationBaseSchema = Body(...)
):
    current_user = request.scope["current_user"]
    return await Organizations().create_organization(current_user, organization)
