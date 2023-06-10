from fastapi import APIRouter, Body

from app.database.users import create_new_user
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
    
    Returns:
        _type_: User
"""


@router.post("/")
async def create_user(user: UserBaseSchema = Body(...)):
    return await create_new_user(user.dict())
