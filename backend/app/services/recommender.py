# Purpose: OpportunityRecommender service for recommending opportunities to users
# Path: backend/app/services/recommender.py

from fastapi import HTTPException, status
from pymongo.errors import ConnectionFailure, OperationFailure

from app.utils.database import MongoDBConnector
from app.utils.validators import validate_db_connection


# TODO: Implement opportunity recommender service
class OpportunityRecommender:
    organizations: str = "Organizations"
    users: str = "Users"
    db = MongoDBConnector = None

    @classmethod
    def __init__(cls):
        pass

    @classmethod
    def __initiate_db(cls):
        if cls.db is not None:
            return cls.db

        cls.db = MongoDBConnector().connect_sync()
        validate_db_connection(cls.db)

    @classmethod
    def list_users_sync(cls, org_id: str):
        cls.__initiate_db()

        try:
            organization = cls.db[cls.organizations].find_one({"_id": org_id})
            users = list(
                cls.db[cls.users].find(
                    {"_id": {"$in": organization["members"]}},
                    projection={"_id": 1, "skills": 1},
                )
            )
            return users
        except Exception as e:
            raise e

    @classmethod
    def recommend_opportunities(cls, org_id: str, opportunity: dict):
        try:
            users: list = cls.list_users_sync(org_id)
            matched_users: list = []

            for user in users:
                user_skills = set(user["skills"])
                opportunity_requirements = set(opportunity["requirements"])
                skill_match = len(user_skills.intersection(opportunity_requirements))

                # Percentage of skills matched
                total_skills = len(opportunity["requirements"])
                percentage = (skill_match / total_skills) * 100

                if percentage >= 50:
                    matched_users.append(user["_id"])

            filter_query = {"_id": {"$in": matched_users}}
            update_query = {"$push": {"opportunities": opportunity["id"]}}

            cls.db[cls.users].update_many(filter_query, update_query)

        except (OperationFailure, ConnectionFailure) as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database operation error.",
            ) from e

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Error: Unable to create opportunity.",
            ) from e

        finally:
            MongoDBConnector().close_sync()


opportunity_recommender = OpportunityRecommender()
