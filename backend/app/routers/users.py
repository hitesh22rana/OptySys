from fastapi import APIRouter

from app.database.users import Users

router = APIRouter(
    tags=["Users"],
    prefix="/users",
)

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
