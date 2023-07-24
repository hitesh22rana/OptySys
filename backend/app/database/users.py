# Purpose: Database operations for users.
# Path: backend\app\database\users.py

import json
from datetime import datetime, timedelta, timezone

from fastapi import BackgroundTasks, HTTPException, status
from pymongo import ReturnDocument
from pymongo.errors import ConnectionFailure, DuplicateKeyError

from app.config import settings
from app.database import Organizations
from app.models import UserBaseModel
from app.schemas import (
    UserLoginRequestSchema,
    UserRegisterRequestSchema,
    UserResponseSchema,
    UserUpdateRequestSchema,
    UserVerifyRequestSchema,
)
from app.services import email_service
from app.utils.database import MongoDBConnector
from app.utils.hashing import Hasher
from app.utils.jwt_handler import JwtTokenHandler
from app.utils.responses import OK, Created
from app.utils.validators import validate_db_connection, validate_object_id_fields


class Users:
    # Token expiry time in hours
    token_expiry_time: int = settings.token_expiry_time

    name: str = "Users"
    db: MongoDBConnector = None
    hasher: Hasher
    jwt: JwtTokenHandler

    organizations: str = "Organizations"

    # Sync db
    db_sync = MongoDBConnector = None

    @classmethod
    def __init__(cls) -> None:
        cls.hasher = Hasher()
        cls.jwt = JwtTokenHandler()

    @classmethod
    def _set_expires(cls):
        return (
            datetime.now(timezone.utc) + timedelta(hours=cls.token_expiry_time)
        ).isoformat()

    @classmethod
    async def __initiate_db(cls):
        if cls.db is not None:
            return cls.db

        cls.db = await MongoDBConnector().connect()
        validate_db_connection(cls.db)

    @classmethod
    def __initiate_db_sync(cls):
        if cls.db_sync is not None:
            return cls.db_sync

        cls.db_sync = MongoDBConnector().connect_sync()
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
                email_service.send_otp,
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
            await MongoDBConnector().disconnect()

    @classmethod
    async def verify_user(cls, payload: UserVerifyRequestSchema):
        await cls.__initiate_db()

        user_details = payload.user_details

        token = payload.token
        otp = payload.otp

        try:
            payload_data = cls.jwt.decode(token)

        except Exception as e:
            status_code, detail = e.args[0].get("status_code", 400), e.args[0].get(
                "detail", "Error: Bad Request"
            )
            raise HTTPException(
                status_code=status_code,
                detail=detail,
            ) from e

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
            response = Created(
                {
                    "detail": "Success: User verified successfully",
                }
            )

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
            await MongoDBConnector().disconnect()

    @classmethod
    async def login_user(cls, user_details: UserLoginRequestSchema):
        await cls.__initiate_db()

        try:
            user = await cls.db[cls.name].find_one(
                {"email": user_details.email},
                {"_id": 1, "password": 1},
            )

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

            response = OK({"detail": "Success: User logged in successfully"})

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
            await MongoDBConnector().disconnect()

    @classmethod
    async def logout_user(cls):
        response = OK({"detail": "Success: User logged out successfully"})

        response.delete_cookie(key="access_token")

        return response

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

            return user

        except ConnectionFailure:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error: Database connection error",
            )

        except Exception as e:
            raise e

        finally:
            await MongoDBConnector().disconnect()

    @classmethod
    async def get_user(cls, current_user):
        validate_object_id_fields(current_user)

        try:
            user = await cls._get_user_by_id(current_user)

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

    @classmethod
    async def update_user(cls, current_user, user_details: UserUpdateRequestSchema):
        await cls.__initiate_db()

        validate_object_id_fields(current_user)

        try:
            user = await cls.db[cls.name].find_one_and_update(
                {"_id": current_user},
                {"$set": {**user_details.dict(exclude_unset=True), "activated": True}},
                {"_id": 1}
            )

            if user is None:
                raise Exception(
                    {
                        "status_code": status.HTTP_404_NOT_FOUND,
                        "detail": "Error: User not found",
                    }
                )

            return OK({
                "deatil": "Success: User updated successfully"
            })

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
            await MongoDBConnector().disconnect()

    @classmethod
    async def is_authorized_user(cls, user_id: str):
        validate_object_id_fields(user_id)
        try:
            user = await cls._get_user_by_id(user_id)

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

    @classmethod
    async def join_organization(cls, current_user: str, org_id: str):
        await cls.__initiate_db()

        validate_object_id_fields(current_user, org_id)

        try:
            session = await cls.db.client.start_session()
            async with session.start_transaction():
                organization = await cls.db[cls.organizations].find_one(
                    {"_id": org_id},
                    {"members": 1, "requests": 1, "private": 1},
                    session=session,
                )

                if organization is None:
                    raise Exception(
                        {
                            "status_code": status.HTTP_404_NOT_FOUND,
                            "detail": "Error: Organization not found.",
                        }
                    )

                # check if the user is already a member
                if current_user in organization["members"]:
                    raise Exception(
                        {
                            "status_code": status.HTTP_400_BAD_REQUEST,
                            "detail": "Error: User is already a member of the organization.",
                        }
                    )

                # check if the user has already requested to join the organization
                if current_user in organization["requests"]:
                    raise Exception(
                        {
                            "status_code": status.HTTP_400_BAD_REQUEST,
                            "detail": "Error: User has already requested to join the organization.",
                        }
                    )

                # if organization is private then request to join the private organization
                if organization["private"]:
                    # update the requested user id in the organization collection
                    res = await cls.db[cls.organizations].update_one(
                        {"_id": org_id},
                        {"$push": {"requests": current_user}},
                        session=session,
                    )

                    if res.modified_count == 0:
                        raise Exception(
                            {
                                "status_code": status.HTTP_400_BAD_REQUEST,
                                "detail": "Error: Unable to update user",
                            }
                        )

                    # update the requested organization id in the user collection
                    res = await cls.db[cls.name].update_one(
                        {"_id": current_user},
                        {"$push": {"requests": org_id}},
                        session=session,
                    )

                    if res.modified_count == 0:
                        raise Exception(
                            {
                                "status_code": status.HTTP_400_BAD_REQUEST,
                                "detail": "Error: Unable to update user",
                            }
                        )

                    return OK(
                        {"detail": "Success: User requested to join organization"}
                    )

                # update the user id in the organization collection
                res = await cls.db[cls.organizations].update_one(
                    {"_id": org_id},
                    {"$push": {"members": current_user}},
                    session=session,
                )

                if res.modified_count == 0:
                    raise Exception(
                        {
                            "status_code": status.HTTP_400_BAD_REQUEST,
                            "detail": "Error: Unable to update user",
                        }
                    )

                # update the organization id in the user collection
                res = await cls.db[cls.name].update_one(
                    {"_id": current_user},
                    {"$push": {"organizations": org_id}},
                    session=session,
                )

                if res.modified_count == 0:
                    raise Exception(
                        {
                            "status_code": status.HTTP_400_BAD_REQUEST,
                            "detail": "Error: Unable to update user.",
                        }
                    )

                return Created({"detail": "Success: User added to the organization."})

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
            session.end_session()
            await MongoDBConnector().disconnect()

    @classmethod
    async def delete_user(cls, user_id):
        await cls.__initiate_db()

        validate_object_id_fields(user_id)

        try:
            session = await cls.db.client.start_session()
            async with session.start_transaction():
                user = await cls.db[cls.name].find_one(
                    {"_id": user_id},
                    projection={"organizations": 1},
                    session=session,
                )

                if user is None:
                    raise Exception(
                        {
                            "status_code": status.HTTP_404_NOT_FOUND,
                            "detail": "Error: User not found",
                        }
                    )

                # Delete all organizations created by the user, if any and remove user from all organizations as a member or admin
                organizations = user["organizations"]

                for organization in organizations:
                    try:
                        await Organizations().remove_member(
                            user_id, organization, user_id
                        )

                    except Exception as e:
                        raise e

                # Sync user deletion
                cls.__initiate_db_sync()

                res = cls.db_sync[cls.name].delete_one({"_id": user_id})

                if res.deleted_count == 0:
                    raise Exception(
                        {
                            "status_code": status.HTTP_404_NOT_FOUND,
                            "detail": "Error: User not found",
                        }
                    )

                # Remove cookies and logout user
                response = OK(
                    {
                        "detail": "Success: User deleted successfully.",
                    }
                )

                response.delete_cookie(key="access_token")

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
            session.end_session()
            await MongoDBConnector().disconnect()
