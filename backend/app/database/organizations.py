# Purpose: Database operations for organizations.
# Path: backend\app\database\organizations.py

import json

from fastapi import BackgroundTasks, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure, DuplicateKeyError

from app.config import settings
from app.models.opportunities import OpportunityBaseModel
from app.models.organizations import OrganizationBaseModel
from app.schemas.opportunities import (
    OportunityRecommenderSchema,
    OpportunityBaseSchema,
    OpportunityResponseSchema,
)
from app.schemas.organizations import (
    OrganizationBaseSchema,
    OrganizationResponseSchema,
    OrganizationSchema,
)
from app.services.ai import ai_service
from app.services.recommender import opportunity_recommender
from app.utils.database import MongoDBConnector
from app.utils.responses import OK, Created
from app.utils.validators import validate_db_connection, validate_object_id_fields


class Organizations:
    _client: AsyncIOMotorClient = AsyncIOMotorClient(settings.mongodb_uri)
    name: str = "Organizations"
    db: MongoDBConnector = None

    users: str = "Users"
    opportunities: str = "Opportunities"

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
    async def create_organization(
        cls, current_user: str, organization: OrganizationBaseSchema
    ):
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
                    res = await cls.db[cls.users].update_one(
                        {"_id": current_user},
                        {"$push": {"organizations": result.inserted_id}},
                        session=session,
                    )

                    if res.modified_count == 0:
                        raise Exception(
                            {
                                "status_code": status.HTTP_400_BAD_REQUEST,
                                "detail": "Error: Unable to update user",
                            }
                        )

                response = OrganizationResponseSchema(organization).response()

                return Created(response)

        except ConnectionFailure:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error: Database connection error.",
            )

        except DuplicateKeyError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Error: Organization already exists with this name.",
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
            await MongoDBConnector().close()

    @classmethod
    async def create_opportunity(
        cls,
        background_tasks: BackgroundTasks,
        current_user: str,
        org_id: str,
        opportunity: OpportunityBaseSchema,
    ):
        await cls.__initiate_db()

        validate_object_id_fields(current_user, org_id)

        opportunity = json.loads(
            OpportunityBaseModel(
                organization_id=org_id,
                created_by=current_user,
                **opportunity.dict(by_alias=True),
            ).json(by_alias=True)
        )

        try:
            session = await cls.db.client.start_session()
            async with session.start_transaction():
                result = await cls.db[cls.opportunities].insert_one(
                    opportunity, session=session
                )

                if result:
                    # update the opportunity id in the organization collection
                    res = await cls.db[cls.name].update_one(
                        {"_id": org_id},
                        {"$push": {"opportunities": result.inserted_id}},
                        session=session,
                    )

                    if res.modified_count == 0:
                        raise Exception(
                            {
                                "status_code": status.HTTP_400_BAD_REQUEST,
                                "detail": "Error: Unable to update organization",
                            }
                        )

                opportunity_data = OportunityRecommenderSchema(opportunity).response()
                background_tasks.add_task(
                    opportunity_recommender.recommend_opportunities,
                    org_id,
                    opportunity_data,
                )

                response = OpportunityResponseSchema(opportunity).response()

                return Created(response)

        except ConnectionFailure:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error: Database connection error.",
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
            await MongoDBConnector().close()

    @classmethod
    async def is_authorized_user(cls, org_id: str, user_id: str):
        await cls.__initiate_db()

        validate_object_id_fields(org_id, user_id)

        try:
            organization = await cls.db[cls.name].find_one(
                {"_id": org_id, "admins": user_id},
                {"_id": 1},
            )

            if organization is None:
                raise Exception(
                    {
                        "status_code": status.HTTP_401_UNAUTHORIZED,
                        "detail": "Error: Unauthorized user.",
                    }
                )

        except ConnectionFailure:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error: Database connection error.",
            )

        except Exception as e:
            raise e

        finally:
            await MongoDBConnector().close()

    @classmethod
    async def add_member(cls, current_user: str, org_id: str):
        await cls.__initiate_db()

        validate_object_id_fields(org_id, current_user)

        try:
            session = await cls.db.client.start_session()
            async with session.start_transaction():
                organization = await cls.db[cls.name].find_one(
                    {"_id": org_id},
                    {"members": 1, "admins": 1, "private": 1},
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

                # check if the organization is private
                if organization["private"]:
                    raise Exception(
                        {
                            "status_code": status.HTTP_401_UNAUTHORIZED,
                            "detail": "Error: Organization is private.",
                        }
                    )

                # update the user id in the organization collection
                res = await cls.db[cls.name].update_one(
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
                res = await cls.db[cls.users].update_one(
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

                return Created(
                    {
                        "detail": "Success: User added to the organization.",
                    }
                )

        except ConnectionFailure:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error: Database connection error.",
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
            await MongoDBConnector().close()

    @classmethod
    async def remove_member(cls, current_user: str, org_id: str, user_id: str):
        await cls.__initiate_db()

        validate_object_id_fields(current_user, org_id, user_id)

        try:
            session = await cls.db.client.start_session()
            async with session.start_transaction():
                # get the organization details
                organization = await cls.db[cls.name].find_one(
                    {"_id": org_id},
                    {"created_by": 1, "admins": 1, "members": 1, "opportunities": 1},
                    session=session,
                )

                if organization is None:
                    raise Exception(
                        {
                            "status_code": status.HTTP_404_NOT_FOUND,
                            "detail": "Error: Organization not found.",
                        }
                    )

                created_by = organization["created_by"]
                admins = organization["admins"]
                members = organization["members"]
                opportunities = organization["opportunities"]

                # check if the user is a part of the organization or not
                if str(user_id) not in members:
                    raise Exception(
                        {
                            "status_code": status.HTTP_404_NOT_FOUND,
                            "detail": "Error: User is not a member of the organization.",
                        }
                    )

                # check if the current user and requested user are same and requested user is the creator of the organization, if yes then delete the organization because the creator cannot be removed
                if (str(current_user) == str(user_id)) and (
                    str(current_user) == str(created_by)
                ):
                    return await cls.delete_organization(current_user, org_id)

                # check if the user is an admin of the organization and is not removing himself
                if str(current_user) not in admins and (
                    str(current_user) != str(user_id)
                ):
                    raise Exception(
                        {
                            "status_code": status.HTTP_401_UNAUTHORIZED,
                            "detail": "Error: Unauthorized user.",
                        }
                    )

                # remove the user from the organizations members list and admins list if he is an admin
                res = await cls.db[cls.name].update_many(
                    {"_id": org_id},
                    {
                        "$pull": {
                            "members": user_id,
                            "admins": user_id if str(user_id) in admins else None,
                        }
                    },
                    session=session,
                )

                if res.modified_count == 0:
                    raise Exception(
                        {
                            "status_code": status.HTTP_400_BAD_REQUEST,
                            "detail": "Error: Unable to remove user.",
                        }
                    )

                # remove the organization from the user
                res = await cls.db[cls.users].update_one(
                    {"_id": user_id},
                    {"$pull": {"organizations": org_id}},
                    session=session,
                )

                if res.modified_count == 0:
                    raise Exception(
                        {
                            "status_code": status.HTTP_400_BAD_REQUEST,
                            "detail": "Error: Unable to remove user.",
                        }
                    )

                # remove the opportunities assigned to the user from the organization
                res = await cls.db[cls.users].update_one(
                    {"_id": user_id},
                    {"$pull": {"opportunities": {"$in": opportunities}}},
                    session=session,
                )

                return OK(
                    {
                        "detail": "Success: User removed from the organization.",
                    }
                )

        except ConnectionFailure:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error: Database connection error.",
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
            await MongoDBConnector().close()

    @classmethod
    async def delete_organization(cls, current_user: str, org_id: str):
        await cls.__initiate_db()

        validate_object_id_fields(org_id, current_user)

        try:
            session = await cls.db.client.start_session()
            async with session.start_transaction():
                # check if the user is an creater of the organization
                organization = await cls.db[cls.name].find_one(
                    {"_id": org_id},
                    {"_id": 1, "created_by": 1, "members": 1, "opportunities": 1},
                    session=session,
                )

                if organization is None:
                    raise Exception(
                        {
                            "status_code": status.HTTP_401_UNAUTHORIZED,
                            "detail": "Error: Organization not found.",
                        }
                    )

                if str(current_user) != str(organization["created_by"]):
                    raise Exception(
                        {
                            "status_code": status.HTTP_401_UNAUTHORIZED,
                            "detail": "Error: Unauthorized user.",
                        }
                    )

                members = organization["members"]
                opportunities = organization["opportunities"]

                # delete the organization from the organization collection
                res = await cls.db[cls.name].delete_one(
                    {"_id": org_id},
                    session=session,
                )

                if res.deleted_count == 0:
                    raise Exception(
                        {
                            "status_code": status.HTTP_400_BAD_REQUEST,
                            "detail": "Error: Unable to delete organization.",
                        }
                    )

                # delete the organization id from the user collection
                res = await cls.db[cls.users].update_many(
                    {"_id": {"$in": members}},
                    {"$pull": {"organizations": org_id}},
                    session=session,
                )

                if res.modified_count == 0:
                    raise Exception(
                        {
                            "status_code": status.HTTP_400_BAD_REQUEST,
                            "detail": "Error: Unable to update user.",
                        }
                    )

                # delete all the opportunities linked to the organization
                res = await cls.db[cls.opportunities].delete_many(
                    {"_id": {"$in": opportunities}},
                    session=session,
                )

                if len(opportunities) > 0 and res.deleted_count == 0:
                    raise Exception(
                        {
                            "status_code": status.HTTP_400_BAD_REQUEST,
                            "detail": "Error: Unable to delete oppurtunities.",
                        }
                    )

                # delete all the opportunities linked to users
                res = await cls.db[cls.users].update_many(
                    {"opportunities": {"$in": opportunities}},
                    {"$pull": {"opportunities": {"$in": opportunities}}},
                    session=session,
                )

                if len(opportunities) > 0 and res.modified_count == 0:
                    raise Exception(
                        {
                            "status_code": status.HTTP_400_BAD_REQUEST,
                            "detail": "Error: Unable to delete oppurtunities.",
                        }
                    )

                return OK(
                    {
                        "detail": "Success: Organization deleted Successfully.",
                    }
                )

        except ConnectionFailure:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error: Database connection error.",
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
            await MongoDBConnector().close()

    @classmethod
    async def create_cover_letter(
        cls,
        background_tasks: BackgroundTasks,
        current_user: str,
        org_id: str,
        opportunity_id: str,
    ):
        await cls.__initiate_db()

        validate_object_id_fields(org_id, opportunity_id, current_user)

        try:
            session = await cls.db.client.start_session()
            async with session.start_transaction():
                # check if the organization exits, user is a member of the organization, and the opportunity is linked to the organization
                res = await cls.db[cls.name].find_one(
                    {
                        "_id": org_id,
                        "members": {"$elemMatch": {"$eq": current_user}},
                        "opportunities": {"$elemMatch": {"$eq": opportunity_id}},
                    },
                    {"_id": 1},
                    session=session,
                )

                # check if the opportunity is linked to the organization
                if res is None:
                    raise Exception(
                        {
                            "status_code": status.HTTP_404_NOT_FOUND,
                            "detail": "Error: Opportunity not found.",
                        }
                    )

                opportunity = await cls.db[cls.opportunities].find_one(
                    {"_id": opportunity_id},
                    projection={
                        "title": 1,
                        "company": 1,
                        "description": 1,
                        "requirements": 1,
                    },
                    session=session,
                )

                user = await cls.db[cls.users].find_one(
                    {"_id": current_user},
                    projection={
                        "name": 1,
                        "email": 1,
                        "summary": 1,
                        "social_links": 1,
                        "experiences": 1,
                        "skills": 1,
                        "achievements": 1,
                    },
                    session=session,
                )

                background_tasks.add_task(
                    ai_service.generate_cover_letter,
                    user,
                    opportunity,
                )

                return OK(
                    {
                        "detail": "Success: Cover letter created Successfully.",
                    }
                )

        except ConnectionFailure:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error: Database connection error.",
            )

        except Exception as e:
            status_code, detail = e.args[0].get("status_code", 400), e.args[0].get(
                "detail", "Error: Bad Request"
            )
            raise HTTPException(
                status_code=status_code,
                detail=detail,
            ) from e
