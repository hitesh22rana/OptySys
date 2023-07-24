# Purpose: User router for handling user related operations.
# Path: backend\app\routers\users.py

from fastapi import APIRouter, Request

from app.database import Users
from app.schemas import UserUpdateRequestSchema

router = APIRouter(
    tags=["Users"],
    prefix="/users",
)

"""
    Get method for retrieving a user.

    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error

    Returns:
        _type_: User
"""


@router.get("", response_description="Get a user")
async def get_user(request: Request):
    current_user = request.scope["current_user"]
    return await Users().get_user(current_user)


"""
    Update method for registering a new user.

    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error

    Returns:
        _type_: Message
"""


@router.put("", response_description="Update a user")
async def update_user(request: Request, user_details: UserUpdateRequestSchema):
    current_user = request.scope["current_user"]
    return await Users().update_user(current_user, user_details)


"""
    Delete method for deleting a user.

    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error

    Returns:
        _type_: Message
"""


@router.delete("", response_description="Delete a user")
async def delete_user(request: Request):
    current_user = request.scope["current_user"]
    return await Users().delete_user(current_user)


"""
    Post method for requesting to join an organization.

    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error

    Returns:
        _type_: Message
"""


@router.post("/join/{org_id}", response_description="Join an organization")
async def join_organization(request: Request, org_id: str):
    current_user = request.scope["current_user"]
    return await Users().join_organization(current_user, org_id)
