# Purpose: Authentication middleware to check if the user is authenticated or not.
# Path: backend\app\middlewares\authentication.py

from fastapi.responses import JSONResponse
from starlette.datastructures import Headers

from app.utils.middlewares import (
    authentication_handler,
    check_authorization,
    is_public_endpoint,
)


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
            status_code, detail = e.args[0].get("status_code", 400), e.args[0].get(
                "detail", "Error: Bad Request"
            )
            response = JSONResponse(
                {
                    "status_code": status_code,
                    "detail": detail,
                },
                status_code,
            )
            return await response(scope, receive, send)

        try:
            await check_authorization(current_user, scope["path"], scope["method"])
        except Exception as e:
            status_code, detail = e.args[0].get("status_code", 400), e.args[0].get(
                "detail", "Error: Bad Request"
            )
            response = JSONResponse(
                {
                    "status_code": status_code,
                    "detail": detail,
                },
                status_code,
            )
            return await response(scope, receive, send)

        scope["current_user"] = current_user
        return await self.app(scope, receive, send)
