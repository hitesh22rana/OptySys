from bson import ObjectId
from fastapi import HTTPException, status
from pymongo.errors import ConnectionFailure

from app.models.organizations import OrganizationBaseModel
from app.utils.database import MongoDBConnector
from app.utils.responses import Created
from app.utils.validators import (
    validate_db_connection,
    validate_object_id_fields,
    validate_string_fields,
)


class Organizations:
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
    async def create_organization(cls, organization_details: dict):
        await cls.__initiate_db()

        validate_string_fields(organization_details.name)
        validate_object_id_fields(organization_details.created_by)

        try:
            organization = OrganizationBaseModel(**organization_details.dict()).dict(
                by_alias=True
            )
            organization["admins"].append(ObjectId(organization_details.created_by))

            organization = await cls.db.organizations.insert_one(organization)

            return Created({"id": organization.inserted_id})

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
