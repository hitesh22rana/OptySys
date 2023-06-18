# Purpose: Database operations for analytics.
# Path: backend\app\database\analytics.py

from datetime import datetime, timezone

from fastapi import HTTPException, status

from app.config import settings
from app.utils.responses import OK


class Analytics:
    version = settings.project_version

    @classmethod
    def __init__(cls) -> None:
        pass

    @classmethod
    async def get_timestamp(cls):
        try:
            current_time = datetime.now(timezone.utc)
            timestamp = current_time.astimezone().strftime("%Y-%m-%d %I:%M:%S %p")

            return timestamp
        except Exception as e:
            raise RuntimeError("Error while getting timestamp.") from e

    @classmethod
    async def get_system_status(cls):
        try:
            timestamp = await cls.get_timestamp()

            return OK(
                {
                    "status": "healthy",
                    "message": "All services are up and running.",
                    "version": cls.version,
                    "timestamp": timestamp,
                }
            )

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=str(e),
            )
