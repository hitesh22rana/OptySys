# Purpose: Validate data types and values.
# Path: backend\app\lib\validators.py

import validators
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
        if not isinstance(field, str) or field == "" or field is None:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Invalid field type: {field}",
            )


def validate_object_id_fields(*fields: list[str]):
    for field in fields:
        if field is None or not ObjectId.is_valid(field):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Invalid field type: {field}",
            )


def validate_link(link):
    if not validators.url(link, public=True):
        raise ValueError("Invalid link: " + link)
    return link


def validate_links(links):
    for link in links:
        if not link.values():
            raise ValueError("Social link cannot be empty")
        for value in link.values():
            if not validators.url(value, public=True):
                raise ValueError("Invalid link: " + value)
    return links


def validate_experiences(experiences):
    for experience in experiences:
        try:
            validate_string_fields(
                experience.title, experience.company, *experience.description
            )

        except:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Invalid experience fields.",
            )

    return experiences
