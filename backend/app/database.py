from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure

from .config import settings

"""
Connect to MongoDB server and return database object
"""
db = None


async def get_database_connection():
    global db
    if db is not None:
        return db
    try:
        client = AsyncIOMotorClient(settings.mongodb_uri)
        db = client.optysys

        print(f"Connected to MongoDB server")
        return db
    except ConnectionFailure:
        print(f"Error connecting to MongoDB server")
        return None
