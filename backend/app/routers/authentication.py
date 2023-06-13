from fastapi import APIRouter, BackgroundTasks, Body, Request

from app.database.users import Users
from app.schemas.users import (
    UserLoginRequestSchema,
    UserRegisterRequestSchema,
    UserVerifyRequestSchema,
)

router = APIRouter(
    tags=["Organizations"],
    prefix="/auth",
)

"""
    Post method for registering a new user.

    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error

    Returns:
        _type_: OTP for email verification
"""


@router.post("/register", response_description="Register a new user")
async def register(
    background_tasks: BackgroundTasks, user: UserRegisterRequestSchema = Body(...)
):
    return await Users().register_user(background_tasks, user)


"""
    Post method for verifying and signing up a new user.

    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error
    
    Returns:
        _type_: User
"""


@router.post("/verify", response_description="Verify and sign up a new user")
async def verify(payload: UserVerifyRequestSchema = Body(...)):
    return await Users().create_user(payload)


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
