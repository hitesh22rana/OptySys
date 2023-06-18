# Purpose: Database connection and helper functions
# Path: backend\app\utils\database.py

from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

from app.config import settings

"""
Connect to MongoDB server and return database object
"""


class MongoDBConnector:
    def __init__(self):
        self.client = None
        self.db = None
        self.users = "Users"
        self.organizations = "Organizations"

        self.client_sync = None
        self.db_sync = None

    async def connect(self):
        if self.db is not None:
            return self.db

        try:
            self.client = AsyncIOMotorClient(settings.mongodb_uri)
            self.db = self.client.optysys

            # Create unique index on email
            await self.db[self.users].create_index("email", unique=True)

            # Create unique index on organization name
            await self.db[self.organizations].create_index("name", unique=True)

            print("Connected to MongoDB server")
            return self.db
        except ConnectionFailure:
            print("Error connecting to MongoDB server")
            return None

    async def close(self):
        if self.client is not None:
            self.client.close()
            print("Disconnected from MongoDB server")

    def connect_sync(self):
        if self.db_sync is not None:
            return self.db_sync

        try:
            self.client_sync = MongoClient(settings.mongodb_uri)
            self.db_sync = self.client_sync.optysys

            # Create unique index on email
            self.db_sync[self.users].create_index("email", unique=True)

            # Create unique index on organization name
            self.db_sync[self.organizations].create_index("name", unique=True)

            print("Connected to MongoDB server")
            return self.db_sync
        except ConnectionFailure:
            print("Error connecting to MongoDB server")
            return None

    def close_sync(self):
        if self.client_sync is not None:
            self.client_sync.close()
            print("Disconnected from MongoDB server")
