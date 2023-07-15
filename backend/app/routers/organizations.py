# Purpose: Organization router for handling organization related operations.
# Path: backend\app\routers\organizations.py

from fastapi import APIRouter, BackgroundTasks, Body, Depends, Request
from fastapi_limiter.depends import RateLimiter

from app.database import Organizations
from app.schemas import OrganizationBaseSchema
from app.schemas.opportunities import OpportunityBaseSchema, OpportunitySkillsSchema

router = APIRouter(
    tags=["Organizations"],
    prefix="/organizations",
)

"""
    Get method to list all organizations.
    
    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error
    
    Returns:
        _type_: Organization
"""


@router.get("", response_description="List all organizations")
async def get_organizations(limit: int = 10, offset: int = 0):
    return await Organizations().get_organizations(limit=limit, offset=offset)


"""
    Post method for creating a new organization.
    
    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error
    
    Returns:
        _type_: JsonObject{
            data: Organization,
            "total_count": int,
            "previous": bool,
            "next": bool,
        }
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
    Post method for extracting skills from a new opportunity.
    
    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error
    
    Returns:
        _type_: List[Skills]
"""


@router.post(
    "/{org_id}/opportunities/skills",
    response_description="Extract skills from an opportunity",
)
async def extract_skills(
    request: Request,
    org_id: str,
    opportunity: OpportunitySkillsSchema = Body(...),
):
    current_user = request.scope["current_user"]
    return await Organizations().extract_skills(current_user, org_id, opportunity)


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
    dependencies=[Depends(RateLimiter(times=5, hours=1))],
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
