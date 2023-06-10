from fastapi import HTTPException, status
from pymongo.errors import ConnectionFailure, DuplicateKeyError

from app.models.users import UserBaseModel
from app.utils.database import get_database_connection
from app.utils.responses import Created
from app.utils.validators import validate_db_connection, validate_fields_not_empty


class Users:
    name = "Users"
    db = None

    @classmethod
    async def __initiate_db(cls):
        if cls.db is not None:
            return cls.db
        cls.db = await get_database_connection()
        validate_db_connection(cls.db)

    @classmethod
    async def create_new_user(cls, user_details: dict):
        await cls.__initiate_db()

        validate_fields_not_empty(
            user_details.name,
            user_details.email,
            user_details.password,
            detail="Fields cannot be empty",
        )

        try:
            user = UserBaseModel(**user_details.dict())
            result = await cls.db[cls.name].insert_one(user.dict(by_alias=True))

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
