import json

from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure, DuplicateKeyError

from app.config import settings
from app.models.organizations import OrganizationBaseModel
from app.schemas.organizations import OrganizationSchema
from app.utils.database import MongoDBConnector
from app.utils.responses import Created
from app.utils.validators import validate_db_connection, validate_object_id_fields


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
    async def create_organization(cls, current_user: str, organization: dict):
        await cls.__initiate_db()

        validate_object_id_fields(current_user)

        organization_details = OrganizationSchema(
            **organization.dict(), created_by=current_user
        )

        try:
            session = await cls.db.client.start_session()
            async with session.start_transaction():
                organization = json.loads(
                    OrganizationBaseModel(**organization_details.dict()).json(
                        by_alias=True
                    )
                )

                organization["admins"] = [str(current_user)]
                organization["members"] = [str(current_user)]

                result = await cls.db[cls.name].insert_one(
                    organization, session=session
                )

                if result:
                    # update the organization id in the user collection
                    res = await cls.db["Users"].update_one(
                        {"_id": current_user},
                        {"$push": {"organizations": result.inserted_id}},
                        session=session,
                    )

                    if res.modified_count == 0:
                        raise HTTPException(
                            status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Error: Unable to update user",
                        )

                return Created({"id": result.inserted_id})

        except ConnectionFailure:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database connection error.",
            )

        except DuplicateKeyError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Error: Organization already exists with this name.",
            )

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Error: Unable to create organization.",
            ) from e

        finally:
            session.end_session()
            await MongoDBConnector().close()
