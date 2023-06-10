# Path: backend\app\lib\validators.py

from bson import ObjectId
from fastapi import HTTPException, status


def validate_db_connection(db):
    if db is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection error",
        )


def validate_string_fields(*fields: list[str]):
    for field in fields:
        if field == "" or field is None or not isinstance(field, str):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Invalid field type: {field}",
            )


def validate_object_id_fields(*fields: list[str]):
    for field in fields:
        if not isinstance(field, ObjectId):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Invalid field type: {field}",
            )


def validate_fields_not_empty(*fields: list[str], detail: str):
    for field in fields:
        if field == "" or field is None:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=detail,
            )
