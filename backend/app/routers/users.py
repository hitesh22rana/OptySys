from fastapi import APIRouter, Body

from app.database.users import Users
from app.schemas.users import UserBaseSchema

router = APIRouter(
    tags=["Users"],
    prefix="/users",
)

"""
    Post method for creating a new user.
    
    Raises:
        HTTPException: Fields validation error
        HTTPException: Duplicate user error
        HTTPException: Internal server error
        HTTPException: Bad request error
    
    Returns:
        _type_: user id
"""


@router.post("/")
async def create_user(user: UserBaseSchema = Body(...)):
    return await Users().create_new_user(user)
