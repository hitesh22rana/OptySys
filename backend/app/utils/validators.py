# Path: backend\app\lib\validators.py

import re

from bson import ObjectId
from fastapi import HTTPException, status

ORGANIZATION_NAME_PATTERN = r"^[a-zA-Z0-9_-]+$"

pattern = re.compile(ORGANIZATION_NAME_PATTERN)


def validate_db_connection(db):
    if db is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection error",
        )


def validate_string_fields(*fields: list[str]):
    for field in fields:
        if not isinstance(field, str) or field == "" or field is None:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Invalid field type: {field}",
            )


def validate_object_id_fields(*fields: list[str]):
    for field in fields:
        if not ObjectId.is_valid(field):
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


def validate_empty_fields(*fields: list[str], detail: str):
    for field in fields:
        if field != "" or field is not None:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=detail,
            )


def validate_organization_name(organization_name: str):
    if not pattern.match(organization_name) or len(organization_name) > 50:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Invalid organization name.",
        )
