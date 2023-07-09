import redis.asyncio as redis
from fastapi_limiter import FastAPILimiter
from fastapi_limiter.depends import RateLimiter

from app.logger import logger

"""
Connect to Redis server and return the redis connection.
"""


class RedisConnector:
    # Conncetions
    db: redis.Redis = None

    def __init__(cls):
        cls.url = "redis://localhost:6379"

    async def connect(cls):
        if cls.db is not None:
            return cls.db

        try:
            connection = redis.from_url(
                url=cls.url, encoding="utf-8", decode_responses=True
            )
            await FastAPILimiter.init(connection)
            logger.info("Connected to Redis server (async)")
            return connection

        except Exception as e:
            logger.critical("Error connecting to Redis server (async)" + str(e))
            return None
