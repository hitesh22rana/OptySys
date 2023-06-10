import orjson
from fastapi import APIRouter, Body, HTTPException, status
from pymongo.errors import ConnectionFailure, DuplicateKeyError

from app.database import get_database_connection
from app.lib.validators import validate_db_connection, validate_fields_not_empty
from app.models.users import UserBaseModel
from app.schemas.users import UserBaseSchema
from app.utils.responses import Created

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
    db = await get_database_connection()
    validate_db_connection(db)

    validate_fields_not_empty(
        user.name,
        user.email,
        user.password,
        detail="Fields cannot be empty",
    )

    try:
        user = UserBaseModel(**user.dict())
        result = await db.users.insert_one(user.dict())

        return Created({"id": result.inserted_id})

    except DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exists",
        )
    except ConnectionFailure:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection error",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error: {e}",
        )
