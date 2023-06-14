from datetime import datetime, timezone

import jwt

from app.config import settings


class JwtTokenHandler:
    JWT_SECRET: str
    JWT_ALGORITHM: str

    @classmethod
    def __init__(cls):
        cls.JWT_SECRET = settings.jwt_secret
        cls.JWT_ALGORITHM = settings.jwt_algorithm

    @classmethod
    def encode(cls, data: dict) -> str:
        return jwt.encode(data, cls.JWT_SECRET, algorithm=cls.JWT_ALGORITHM)

    @classmethod
    def decode(cls, token: str) -> dict:
        try:
            decode_token = jwt.decode(
                token, cls.JWT_SECRET, algorithms=[cls.JWT_ALGORITHM]
            )

            if decode_token["expiry"] < datetime.now(timezone.utc).isoformat():
                raise jwt.ExpiredSignatureError

            return decode_token
        except jwt.ExpiredSignatureError:
            raise Exception("Token has expired")