# Purpose: Authentication router for handling user authentication related operations.
# Path: backend\app\routers\authentication.py

from fastapi import APIRouter, BackgroundTasks, Body, Depends
from fastapi_limiter.depends import RateLimiter

from app.database import Authentication
from app.schemas import (
    UserForgotPasswordRequestSchema,
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


@router.post(
    "/register",
    response_description="Register a new user",
    dependencies=[Depends(RateLimiter(times=5, seconds=60))],
)
async def register_user(
    background_tasks: BackgroundTasks,
    user_details: UserRegisterRequestSchema = Body(...),
):
    return await Authentication().register_user(background_tasks, user_details)


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
async def verify_user(payload: UserVerifyRequestSchema = Body(...)):
    return await Authentication().verify_user(payload)


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
async def login_user(user_details: UserLoginRequestSchema = Body(...)):
    return await Authentication().login_user(user_details)


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
async def logout_user():
    return await Authentication().logout_user()


"""
    Post method to send a password reset link on user's registered email.

    Raises:
        HTTPException: Fields validation error
        HTTPException: Internal server error
        HTTPException: Bad request error
    
    Returns:
        _type_: Password reset link confirmation message
"""


@router.post(
    "/forgot-password", response_description="Send a password reset link to a user"
)
async def forgot_password(
    background_tasks: BackgroundTasks,
    user_details: UserForgotPasswordRequestSchema = Body(...),
):
    return await Authentication().forgot_password(background_tasks, user_details)
