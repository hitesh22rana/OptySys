from bson import ObjectId
from fastapi import HTTPException, status
from pymongo.errors import ConnectionFailure, DuplicateKeyError

from app.models.users import UserBaseModel
from app.schemas.users import UserResponseSchema
from app.utils.database import MongoDBConnector
from app.utils.hashing import Hasher
from app.utils.responses import OK, Created
from app.utils.validators import validate_db_connection, validate_string_fields


class Users:
    name = "Users"
    db = None
    hasher = None

    @classmethod
    def __init__(cls) -> None:
        cls.hasher = Hasher()

    @classmethod
    async def __initiate_db(cls):
        if cls.db is not None:
            return cls.db

        cls.db = await MongoDBConnector().connect()
        validate_db_connection(cls.db)

    @classmethod
    async def create_user(cls, user_details: dict):
        await cls.__initiate_db()

        validate_string_fields(
            user_details.name,
            user_details.email,
            user_details.password,
        )

        hashed_password = cls.hasher.get_password_hash(user_details.password)

        user_details.password = hashed_password

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

        finally:
            await MongoDBConnector().close()

    @classmethod
    async def get_user(cls, user_id: str):
        await cls.__initiate_db()

        validate_string_fields(user_id)

        try:
            user = await cls.db[cls.name].find_one({"_id": ObjectId(user_id)})

            if user is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User not found",
                )

            user = UserResponseSchema(user).response()

            return OK(user)

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

        finally:
            await MongoDBConnector().close()
