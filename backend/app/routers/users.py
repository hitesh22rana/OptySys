from bson import ObjectId
from fastapi import APIRouter, Body, HTTPException, status
from pymongo.errors import ConnectionFailure, DuplicateKeyError

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
