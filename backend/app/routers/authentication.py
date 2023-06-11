from fastapi import APIRouter, Body, Request

from app.database.users import Users
from app.schemas.users import UserBaseSchema, UserLoginRequestSchema

router = APIRouter(
    tags=["Organizations"],
    prefix="/auth",
)

"""
    Post method for signing up a new user.

    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error
    
    Returns:
        _type_: User
"""


@router.post("/signup", response_description="Sign up a new user")
async def signup(user: UserBaseSchema = Body(...)):
    return await Users().create_user(user)


"""
    Post method for logging in a user.

    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error
    
    Returns:
        _type_: User
"""


@router.post("/login", response_description="Login a user")
async def login(user: UserLoginRequestSchema = Body(...)):
    return await Users().get_user(user)


"""
    Get method for logging out a user.

    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error
    
    Returns:
        _type_: Logout Message
"""


@router.get("/logout/{user_id}", response_description="Logout a user")
async def logout(request: Request, user_id: str):
    current_user = request.scope["current_user"]
    return await Users().logout_user(user_id, current_user)
