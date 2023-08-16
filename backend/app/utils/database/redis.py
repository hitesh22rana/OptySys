# Purpose: Caching and Ratelimiting connection and helper functions
# Path: backend\app\utils\database\redis.py

import redis.asyncio as redis
from fastapi_limiter import FastAPILimiter

from app.config import settings
from app.logger import logger

"""
Connect to Redis server and return the redis connection.
"""


class RedisConnector:
    # Conncetions
    db: redis.Redis = None

    # Environment variables
    host: str = settings.redis_host
    port: int = settings.redis_port
    password: str = settings.redis_password

    @classmethod
    def __init__(cls):
        pass

    @classmethod
    async def connect(cls):
        if cls.db is not None:
            return cls.db

        try:
            connection = redis.Redis(
                host=cls.host, port=cls.port, password=cls.password
            )
            await FastAPILimiter.init(connection)
            logger.info("Connected to Redis server (async)")
            return connection

        except Exception as e:
            logger.critical("Error connecting to Redis server (async)" + str(e))
            return None

    @classmethod
    async def disconnect(cls):
        if cls.db is not None:
            await cls.db.close()
            logger.info("Disconnected from Redis server (async)")
