from fastapi import APIRouter, HTTPException, status, Body
from bson import ObjectId
from pymongo.errors import DuplicateKeyError, ConnectionFailure

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