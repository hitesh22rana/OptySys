# Purpose: Authentication router for handling user authentication related operations.
# Path: backend\app\routers\authentication.py

from fastapi import APIRouter, BackgroundTasks, Body

from app.database.users import Users
from app.schemas.users import (
    UserLoginRequestSchema,
    UserRegisterRequestSchema,
    UserVerifyRequestSchema,
)

router = APIRouter(
    tags=["Authentication"],
    prefix="/auth",
)

"""
    Post method for registering a new user.

    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error

    Returns:
        _type_: Dict of email and token
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


@router.post("/logout", response_description="Logout a user")
async def logout():
    return await Users().logout_user()
