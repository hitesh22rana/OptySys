# Purpose: Organization router for handling organization related operations.
# Path: backend\app\routers\organizations.py

from fastapi import APIRouter, BackgroundTasks, Body, Request

from app.database.organizations import Organizations
from app.schemas.opportunities import OpportunityBaseSchema
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


"""
    Post method for creating a new opportunity.
    
    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error
    
    Returns:
        _type_: Opportunity
"""


@router.post("/{org_id}/opportunities", response_description="Add a new opportunity")
async def create_opportunity(
    background_tasks: BackgroundTasks,
    request: Request,
    org_id: str,
    opportunity: OpportunityBaseSchema = Body(...),
):
    current_user = request.scope["current_user"]
    return await Organizations().create_opportunity(
        background_tasks, current_user, org_id, opportunity
    )
