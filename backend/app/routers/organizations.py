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
    Post method for adding a new member to an organization.
    
    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error
    
    Returns:
        _type_: Organization
"""


@router.post("/{org_id}/members", response_description="Add a new member")
async def add_member(request: Request, org_id: str):
    current_user = request.scope["current_user"]
    return await Organizations().add_member(current_user, org_id)


"""
    Post method for removing a member from an organization.
    
    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error
    
    Returns:
        _type_: Message
"""


@router.delete("/{org_id}/members/{user_id}", response_description="Remove a member")
async def remove_member(request: Request, org_id: str, user_id: str):
    current_user = request.scope["current_user"]
    return await Organizations().remove_member(current_user, org_id, user_id)


"""
    Delete method for deleting an organization.

    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error

    Returns:
        _type_: Message
"""


@router.delete("/{org_id}", response_description="Delete an organization")
async def delete_organization(request: Request, org_id: str):
    current_user = request.scope["current_user"]
    return await Organizations().delete_organization(current_user, org_id)


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


"""
    Post method for creating a personalized cover letter for an opportunity.
    
    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error
    
    Returns:
        _type_: Message
"""


@router.post(
    "/{org_id}/opportunities/{opportunity_id}/cover-letter",
    response_description="Create a cover letter",
)
async def create_cover_letter(
    background_tasks: BackgroundTasks,
    request: Request,
    org_id: str,
    opportunity_id: str,
):
    current_user = request.scope["current_user"]
    return await Organizations().create_cover_letter(
        background_tasks, current_user, org_id, opportunity_id
    )
