# Purpose: Database connection and helper functions
# Path: backend\app\utils\database.py

from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

from app.config import settings
from app.logger import logger

"""
Connect to MongoDB server and return database object
"""


class MongoDBConnector:
    def __init__(self):
        # Async connections
        self.client = None
        self.db = None

        # Sync connections
        self.client_sync = None
        self.db_sync = None

        # Collections
        self.users = "Users"
        self.organizations = "Organizations"
        self.opportunities = "Opportunities"

    async def connect(self):
        if self.db:
            return self.db

        try:
            self.client = AsyncIOMotorClient(settings.mongodb_uri)
            self.db = self.client.optysys

            # Create unique index on email
            await self.db[self.users].create_index("email", unique=True)

            # Create unique index on organization name
            await self.db[self.organizations].create_index("name", unique=True)

            logger.info("Connected to MongoDB server (async)")
            return self.db
        except ConnectionFailure:
            logger.critical("Error connecting to MongoDB server (async)")
            return None

    async def close(self):
        if self.client:
            self.client.close()
            logger.info("Disconnected from MongoDB server (async)")

    def connect_sync(self):
        if self.db_sync:
            return self.db_sync

        try:
            self.client_sync = MongoClient(settings.mongodb_uri)
            self.db_sync = self.client_sync.optysys

            # Create unique index on email
            self.db_sync[self.users].create_index("email", unique=True)

            # Create unique index on organization name
            self.db_sync[self.organizations].create_index("name", unique=True)

            logger.info("Connected to MongoDB server (sync)")
            return self.db_sync
        except ConnectionFailure:
            logger.critical("Error connecting to MongoDB server (sync)")
            return None

    def close_sync(self):
        if self.client_sync:
            self.client_sync.close()
            logger.info("Disconnected from MongoDB server (sync)")
