import json

from bson import ObjectId
from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure

from app.config import settings
from app.models.organizations import OrganizationBaseModel
from app.schemas.organizations import OrganizationBaseSchema
from app.utils.database import MongoDBConnector
from app.utils.responses import Created
from app.utils.validators import (
    validate_db_connection,
    validate_object_id_fields,
    validate_string_fields,
    validate_user_id,
)


class Organizations:
    _client: AsyncIOMotorClient = AsyncIOMotorClient(settings.mongodb_uri)
    name = "Organizations"
    db = None
    hasher = None

    @classmethod
    def __init__(cls) -> None:
        pass

    @classmethod
    async def __initiate_db(cls):
        if cls.db is not None:
            return cls.db

        cls.db = await MongoDBConnector().connect()
        validate_db_connection(cls.db)

    @classmethod
    async def get_client_session(cls):
        return await cls._client.start_session()

    @classmethod
    async def create_organization(cls, current_user: str, organization_details: dict):
        await cls.__initiate_db()
        validate_string_fields(organization_details.name)
        validate_object_id_fields(organization_details.created_by, current_user)
        validate_user_id(organization_details.created_by, current_user)

        try:
            organization = json.loads(
                OrganizationBaseModel(**organization_details.dict()).json(by_alias=True)
            )

            organization["admins"] = [str(organization_details.created_by)]
            organization["members"] = [str(organization_details.created_by)]

            result = await cls.db[cls.name].insert_one(organization)

            if result:
                # update the organization id in the user collection
                await cls.db["Users"].update_one(
                    {"_id": current_user},
                    {"$push": {"organizations": result.inserted_id}},
                )

            return Created({"id": result.inserted_id})

        except ConnectionFailure:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database connection error",
            )

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Error: Unable to create organization.",
            ) from e

        finally:
            # await session.end_session()
            await MongoDBConnector().close()
