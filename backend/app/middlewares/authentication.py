from fastapi.responses import JSONResponse
from starlette.datastructures import Headers

from app.utils.jwt_handler import JwtTokenHandler

PUBLIC_ENDPOINTS = [
    {"path": "/docs", "method": "GET"},
    {"path": "/openapi.json", "method": "GET"},
    {"path": "/auth/signup", "method": "POST"},
    {"path": "/auth/login", "method": "POST"},
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
        authorization = headers.get("authorization")

        try:
            user_id = authentication_handler(authorization)
        except Exception as e:
            response = JSONResponse({"status_code": 401, "message": e.args}, 401)
            return await response(scope, receive, send)

        scope["user_id"] = user_id
        return await self.app(scope, receive, send)


def is_public_endpoint(request_path, request_method):
    print(request_path, request_method)
    return {"path": request_path, "method": request_method} in PUBLIC_ENDPOINTS


def authentication_handler(authorization: str):
    try:
        bearer_token = authorization.split(" ")[1]
        data = JwtTokenHandler().decode(bearer_token)
        return data
    except Exception as e:
        raise Exception("Please login to access this resource.") from e
