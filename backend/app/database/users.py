# Purpose: Database operations for users.
# Path: backend\app\database\users.py

import json
from datetime import datetime, timedelta, timezone

from fastapi import BackgroundTasks, HTTPException, status
from pymongo import ReturnDocument
from pymongo.errors import ConnectionFailure, DuplicateKeyError

from app.models.users import UserBaseModel
from app.schemas.users import (
    UserLoginRequestSchema,
    UserRegisterRequestSchema,
    UserResponseSchema,
    UserUpdateRequestSchema,
    UserVerifyRequestSchema,
)
from app.services.email import email_service
from app.utils.database import MongoDBConnector
from app.utils.hashing import Hasher
from app.utils.jwt_handler import JwtTokenHandler
from app.utils.responses import OK, Created
from app.utils.validators import validate_db_connection


class Users:
    name: str = "Users"
    db: MongoDBConnector = None
    hasher: Hasher
    jwt: JwtTokenHandler

    @classmethod
    def __init__(cls) -> None:
        cls.hasher = Hasher()
        cls.jwt = JwtTokenHandler()
        cls.email_service = email_service

    @classmethod
    def _set_expires(cls):
        return (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()

    @classmethod
    async def __initiate_db(cls):
        if cls.db is not None:
            return cls.db

        cls.db = await MongoDBConnector().connect()
        validate_db_connection(cls.db)

    @classmethod
    async def register_user(
        cls, background_tasks: BackgroundTasks, user_details: UserRegisterRequestSchema
    ):
        await cls.__initiate_db()

        try:
            user = await cls.db[cls.name].find_one({"email": user_details.email})
            if user:
                raise Exception(
                    {
                        "status_code": status.HTTP_400_BAD_REQUEST,
                        "detail": "Error: User already exists",
                    }
                )

        except ConnectionFailure:
            raise Exception(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error: Database connection error",
            )

        except Exception as e:
            status_code, detail = e.args[0].get("status_code", 400), e.args[0].get(
                "detail", "Error: Bad Request"
            )
            raise HTTPException(
                status_code=status_code,
                detail=detail,
            ) from e

        otp = cls.hasher.get_otp()
        expiry = (datetime.now(timezone.utc) + timedelta(minutes=5)).isoformat()

        data = {
            "email": user_details.email,
            "otp": otp,
            "expiry": expiry,
        }

        jwt_token = cls.jwt.encode(data)

        try:
            background_tasks.add_task(
                cls.email_service.send_otp,
                user_details.email,
                "OptySys User Verfication",
                otp,
            )

            return OK(
                {
                    "email": user_details.email,
                    "token": jwt_token,
                }
            )

        except ConnectionFailure:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error: Database connection error",
            )

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Error: Bad request",
            ) from e

        finally:
            await MongoDBConnector().close()

    @classmethod
    async def create_user(cls, payload: UserVerifyRequestSchema):
        await cls.__initiate_db()

        user_details = payload.user_details

        token = payload.token
        otp = payload.otp

        try:
            payload_data = cls.jwt.decode(token)

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Error: {str(e.args[0])}",
            )

        if payload_data["otp"] != otp:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Error: Invalid OTP",
            )

        if payload_data["email"] != user_details.email:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Error: Invalid email",
            )

        hashed_password = cls.hasher.get_password_hash(user_details.password)

        user_details.password = hashed_password

        try:
            user = json.loads(UserBaseModel(**user_details.dict()).json(by_alias=True))
            result = await cls.db[cls.name].insert_one(user)

            response = UserResponseSchema(user).response()
            response = Created(response)

            expiry = cls._set_expires()
            jwt_token = cls.jwt.encode(
                {"user_id": str(result.inserted_id), "expiry": expiry}
            )
            response.set_cookie(
                key="access_token",
                value=f"Bearer {jwt_token}",
                httponly=True,
                expires=expiry,
            )

            return response

        except DuplicateKeyError:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Error: User already exists",
            )

        except ConnectionFailure:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error: Database connection error",
            )

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Error: Bad request",
            )

        finally:
            await MongoDBConnector().close()

    @classmethod
    async def get_user(cls, user_details: UserLoginRequestSchema):
        await cls.__initiate_db()

        try:
            user = await cls.db[cls.name].find_one({"email": user_details.email})

            if user is None:
                raise Exception(
                    {
                        "status_code": status.HTTP_404_NOT_FOUND,
                        "detail": "Error: User not found",
                    }
                )

            if not cls.hasher.verify_password(user_details.password, user["password"]):
                raise Exception(
                    {
                        "status_code": status.HTTP_401_UNAUTHORIZED,
                        "detail": "Error: Incorrect password",
                    }
                )

            response = UserResponseSchema(user).response()
            response = OK(response)

            expiry = cls._set_expires()
            jwt_token = cls.jwt.encode({"user_id": str(user["_id"]), "expiry": expiry})

            response.set_cookie(
                key="access_token",
                value=f"Bearer {jwt_token}",
                httponly=True,
                expires=expiry,
            )

            return response

        except ConnectionFailure:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error: Database connection error",
            )

        except Exception as e:
            status_code, detail = e.args[0].get("status_code", 400), e.args[0].get(
                "detail", "Error: Bad Request"
            )
            raise HTTPException(
                status_code=status_code,
                detail=detail,
            ) from e

        finally:
            await MongoDBConnector().close()

    @classmethod
    async def logout_user(cls):
        response = OK({"message": "Logged out successfully"})

        response.delete_cookie(key="access_token")

        return response

    @classmethod
    async def update_user(cls, current_user, user_details: UserUpdateRequestSchema):
        await cls.__initiate_db()

        try:
            user = await cls.db[cls.name].find_one_and_update(
                {"_id": current_user},
                {"$set": {**user_details.dict(exclude_unset=True), "activated": True}},
                return_document=ReturnDocument.AFTER,
            )

            if user is None:
                raise Exception(
                    {
                        "status_code": status.HTTP_404_NOT_FOUND,
                        "detail": "Error: Unable to update user",
                    }
                )

            response = UserResponseSchema(user).response()

            return OK(response)

        except ConnectionFailure:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error: Database connection error",
            )

        except Exception as e:
            status_code, detail = e.args[0].get("status_code", 400), e.args[0].get(
                "detail", "Error: Bad Request"
            )
            raise HTTPException(
                status_code=status_code,
                detail=detail,
            ) from e

        finally:
            await MongoDBConnector().close()

    @classmethod
    async def _get_user_by_id(cls, user_id: str) -> UserResponseSchema:
        await cls.__initiate_db()

        try:
            user = await cls.db[cls.name].find_one({"_id": user_id})

            if user is None:
                raise Exception(
                    {
                        "status_code": status.HTTP_404_NOT_FOUND,
                        "detail": "Error: User not found",
                    }
                )

            response = UserResponseSchema(user).response()

            return response

        except ConnectionFailure:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error: Database connection error",
            )

        except Exception as e:
            status_code, detail = e.args[0].get("status_code", 400), e.args[0].get(
                "detail", "Error: Bad Request"
            )
            raise HTTPException(
                status_code=status_code,
                detail=detail,
            ) from e

        finally:
            await MongoDBConnector().close()

    @classmethod
    async def is_authorized_user(cls, user_id: str):
        try:
            user = await cls._get_user_by_id(user_id)

            if user is None:
                raise Exception(
                    {
                        "status_code": status.HTTP_404_NOT_FOUND,
                        "detail": "Error: User not found",
                    }
                )

            if not bool(user["activated"]):
                raise Exception(
                    {
                        "status_code": status.HTTP_401_UNAUTHORIZED,
                        "detail": "Error: User not activated",
                    }
                )

        except ConnectionFailure:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error: Database connection error",
            )

        except Exception as e:
            raise e
