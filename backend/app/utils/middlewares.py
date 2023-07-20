# Purpose: Middleware utility functions
# Path: backend\app\utils\middlewares.py

from fastapi import status

from app.database.organizations import Organizations
from app.database.users import Users
from app.utils.jwt_handler import JwtTokenHandler
from app.utils.validators import validate_object_id_fields

PUBLIC_ENDPOINTS = [
    {"path": "/docs", "method": "GET"},
    {"path": "/openapi.json", "method": "GET"},
    {"path": "/analytics/health", "method": "GET"},
    {"path": "/auth/register", "method": "POST"},
    {"path": "/auth/verify", "method": "POST"},
    {"path": "/auth/login", "method": "POST"},
]

UNAUTHORIZED_ENDPOINTS = [
    {"path": "/docs", "method": "GET"},
    {"path": "/openapi.json", "method": "GET"},
    {"path": "/analytics/health", "method": "GET"},
    {"path": "/auth/register", "method": "POST"},
    {"path": "/auth/verify", "method": "POST"},
    {"path": "/auth/login", "method": "POST"},
    {"path": "/users", "method": "POST"},
]

WEB_SOCKET_ENDPOINTS = [
    {"path": "/ws"},
]


def is_public_endpoint(request_path, request_method):
    return {"path": request_path, "method": request_method} in PUBLIC_ENDPOINTS


def is_unauthorized_endpoint(request_path, request_method):
    return {"path": request_path, "method": request_method} in UNAUTHORIZED_ENDPOINTS


def is_web_socket_endpoint(path: str) -> bool:
    return {"path": path} in WEB_SOCKET_ENDPOINTS


def authentication_handler(access_token: str):
    try:
        if access_token is None or access_token == "":
            raise Exception(
                {
                    "status_code": status.HTTP_401_UNAUTHORIZED,
                    "detail": "Error: Please login to access this resource.",
                }
            )

        bearer_token = access_token.split(" ")
        if len(bearer_token) != 2:
            raise Exception(
                {
                    "status_code": status.HTTP_401_UNAUTHORIZED,
                    "detail": "Error: Please login to access this resource.",
                }
            )

        data = JwtTokenHandler().decode(bearer_token[1])

        current_user = data["user_id"]

        if validate_object_id_fields(current_user):
            raise Exception(
                {
                    "status_code": status.HTTP_401_UNAUTHORIZED,
                    "detail": "Error: Please login to access this resource.",
                }
            )

        return current_user
    except Exception as e:
        raise e


async def check_authorization(current_user, request_path: str, request_method: str):
    if is_unauthorized_endpoint(request_path, request_method):
        return

    if current_user is None:
        raise Exception(
            {
                "status_code": status.HTTP_401_UNAUTHORIZED,
                "detail": "Error: Please login to access this resource.",
            }
        )

    if (
        (request_method == "POST" and (request_path == "/organizations"))
        or (request_path == "/ws" and request_method == "GET")
        or (
            (request_method == "POST" or request_method == "DELETE")
            and (request_path.find("/members/") != -1)
        )
        or (request_method == "POST" and (request_path.startswith("/users/join/")))
    ):
        try:
            await Users().is_authorized_user(current_user)
        except Exception as e:
            raise e

    if request_method == "POST" and (
        request_path.startswith("/organizations")
        and (
            request_path.endswith("/opportunities")
            or request_path.endswith("/opportunities/extract-skills")
            or request_path.endswith("/opportunities/extract-data")
        )
    ):
        try:
            organization_id = request_path.split("/")[2]
            await Organizations().is_authorized_user(organization_id, current_user)
        except Exception as e:
            raise e
    return
