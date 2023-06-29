# Purpose: User router for handling user related operations.
# Path: backend\app\routers\users.py

from fastapi import APIRouter, Request

from app.database.users import Users
from app.schemas.users import UserUpdateRequestSchema

router = APIRouter(
    tags=["Users"],
    prefix="/users",
)

"""
    Update method for registering a new user.

    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error

    Returns:
        _type_: User
"""


@router.put("", response_description="Update a user")
async def update(request: Request, user_details: UserUpdateRequestSchema):
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
async def delete(request: Request):
    current_user = request.scope["current_user"]
    return await Users().delete_user(current_user)
