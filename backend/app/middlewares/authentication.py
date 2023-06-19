# Purpose: Authentication middleware to check if the user is authenticated or not.
# Path: backend\app\middlewares\authentication.py

from fastapi.responses import JSONResponse
from starlette.datastructures import Headers

from app.database.organizations import Organizations
from app.database.users import Users
from app.utils.jwt_handler import JwtTokenHandler

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


class AuthenticationMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            return await self.app(scope, receive, send)

        is_public = is_public_endpoint(scope["path"], scope["method"])

        if is_public:
            return await self.app(scope, receive, send)

        headers = Headers(scope=scope)
        access_token = headers.get("Authorization")

        try:
            current_user = authentication_handler(access_token)
        except Exception as e:
            response = JSONResponse({"status_code": 401, "message": e.args}, 401)
            return await response(scope, receive, send)

        is_authorized = await check_authorization(
            current_user, scope["path"], scope["method"]
        )
        if not is_authorized:
            response = JSONResponse(
                {
                    "status_code": 403,
                    "message": "User is not authorized to access this resource.",
                },
                403,
            )
            return await response(scope, receive, send)

        scope["current_user"] = current_user
        return await self.app(scope, receive, send)


def is_public_endpoint(request_path, request_method):
    return {"path": request_path, "method": request_method} in PUBLIC_ENDPOINTS


def is_unauthorized_endpoint(request_path, request_method):
    return {"path": request_path, "method": request_method} in UNAUTHORIZED_ENDPOINTS


async def check_authorization(current_user, request_path: str, request_method: str):
    if is_unauthorized_endpoint(request_path, request_method):
        return True

    if current_user is None:
        return False

    if request_method == "POST" and (
        request_path == "/organizations" or request_path == "/organizations/"
    ):
        try:
            return await Users().is_authorized_user(current_user)
        except Exception as _:
            return False

    if request_method == "POST" and (
        request_path.startswith("/organizations")
        and request_path.endswith("/opportunities")
    ):
        try:
            organization_id = request_path.split("/")[2]
            return await Organizations().is_authorized_user(
                organization_id, current_user
            )
        except Exception as _:
            return False

    return True


def authentication_handler(access_token: str):
    try:
        bearer_token = access_token.split(" ")[1]
        data = JwtTokenHandler().decode(bearer_token)
        return data["user_id"]
    except Exception as e:
        raise Exception("Please login to access this resource.") from e
