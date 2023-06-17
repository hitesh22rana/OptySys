# Purpose: Custom responses for FastAPI
# Path: backend\app\utils\responses.py

import typing
from enum import Enum

import orjson
from bson import ObjectId
from fastapi import Response


def default(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    if isinstance(obj, Enum):
        return str(obj)
    raise TypeError


class OK(Response):
    media_type = "application/json"

    def __init__(self, content: typing.Any = None) -> None:
        super().__init__(content, 200)

    def render(self, content) -> bytes:
        assert orjson is not None, "orjson must be installed"
        return orjson.dumps(content, default=default)


class Created(Response):
    media_type = "application/json"

    def __init__(self, content: typing.Any = None) -> None:
        super().__init__(content, 201)

    def render(self, content) -> bytes:
        assert orjson is not None, "orjson must be installed"
        return orjson.dumps(content, default=default)


class Accepted(Response):
    media_type = "application/json"

    def __init__(self, content: typing.Any = None) -> None:
        super().__init__(content, 202)

    def render(self, content) -> bytes:
        assert orjson is not None, "orjson must be installed"
        return orjson.dumps(content, default=default)
