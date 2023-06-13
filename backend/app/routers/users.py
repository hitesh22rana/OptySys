from fastapi import APIRouter

from app.database.users import Users

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
        _type_: OTP for email verification
"""

# TODO: Implement Update User route

# @router.put("/{user_id}", response_description="Update a user")
# async def update(user_id: str):
# return await Users().update_user(user_id)
