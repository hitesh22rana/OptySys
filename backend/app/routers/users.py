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


@router.post("/", response_description="Create new user")
async def create_user(user: UserBaseSchema = Body(...)):
    return await Users().create_user(user)


"""
    Get method for getting a user.
    
    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error
    
    Returns:
        _type_: User Response
"""


@router.get("/{user_id}", response_description="Get user")
async def get_user(user_id: str):
    return await Users().get_user(user_id=user_id)
