# Purpose: Database connection and helper functions
# Path: backend\app\utils\database\mongodb.py

from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

from app.config import settings
from app.logger import logger

"""
Connect to MongoDB server and return database connection
"""


class MongoDBConnector:
    # Async connections
    client: AsyncIOMotorClient = None
    db = None

    # Sync connections
    client_sync: MongoClient = None
    db_sync = None

    # Collections
    users: str = "Users"
    organizations: str = "Organizations"
    opportunities: str = "Opportunities"

    # Environment variables
    uri: str = settings.mongodb_uri

    @classmethod
    def __init__(cls) -> None:
        # Async connections
        cls.client = None
        cls.db = None

        # Sync connections
        cls.client_sync = None
        cls.db_sync = None

    @classmethod
    async def connect(cls):
        if cls.db is not None:
            return cls.db

        try:
            cls.client = AsyncIOMotorClient(cls.uri)
            cls.db = cls.client.optysys

            # Create unique index on email
            await cls.db[cls.users].create_index("email", unique=True)

            # Create unique index on organization name
            await cls.db[cls.organizations].create_index("name", unique=True)

            logger.info("Connected to MongoDB server (async)")
            return cls.db
        except ConnectionFailure:
            logger.critical("Error connecting to MongoDB server (async)")
            return None

    @classmethod
    async def disconnect(cls):
        if cls.client is not None:
            cls.client.close()
            logger.info("Disconnected from MongoDB server (async)")

    @classmethod
    def connect_sync(cls):
        if cls.db_sync is not None:
            return cls.db_sync

        try:
            cls.client_sync = MongoClient(settings.mongodb_uri)
            cls.db_sync = cls.client_sync.optysys

            # Create unique index on email
            cls.db_sync[cls.users].create_index("email", unique=True)

            # Create unique index on organization name
            cls.db_sync[cls.organizations].create_index("name", unique=True)

            logger.info("Connected to MongoDB server (sync)")
            return cls.db_sync
        except ConnectionFailure:
            logger.critical("Error connecting to MongoDB server (sync)")
            return None

    @classmethod
    def disconnect_sync(cls):
        if cls.client_sync is not None:
            cls.client_sync.close()
            logger.info("Disconnected from MongoDB server (sync)")
