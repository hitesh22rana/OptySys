# Purpose: Database operations for analytics.
# Path: backend\app\database\analytics.py

from datetime import datetime, timezone

from app.config import settings
from app.utils.responses import OK


class Analytics:
    version = settings.project_version

    @classmethod
    def __init__(cls) -> None:
        pass

    @classmethod
    async def get_timestamp(cls):
        current_time = datetime.now(timezone.utc)
        timestamp = current_time.astimezone().strftime("%Y-%m-%d %I:%M:%S %p")
        return timestamp

    @classmethod
    async def get_system_status(cls):
        timestamp = await cls.get_timestamp()

        return OK(
            {
                "status": "healthy",
                "message": "All services are up and running.",
                "version": cls.version,
                "timestamp": timestamp,
            }
        )
