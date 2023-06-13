from fastapi import APIRouter

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
async def update(user_details: UserUpdateRequestSchema):
    return await Users().update_user(user_details)
