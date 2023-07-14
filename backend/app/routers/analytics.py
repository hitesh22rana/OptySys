# Purpose: Authentication router for handling analytics related operations.
# Path: backend\app\routers\analytics.py

from fastapi import APIRouter

from app.database import Analytics

router = APIRouter(
    tags=["Analytics"],
    prefix="/analytics",
)

"""
    Get method for health check.

    Raises:
        None

    Returns:
        _type_: Health check message
"""


@router.get("/health", response_description="Health check")
async def health():
    return await Analytics().get_system_status()
