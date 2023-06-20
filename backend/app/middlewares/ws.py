# Purpose: WebSocket middlware to authenticate WebSocket connections
# Path: backend\app\middlewares\ws.py

from fastapi.responses import JSONResponse
from starlette.datastructures import Headers

from app.utils.middlewares import (
    authentication_handler,
    check_authorization,
    is_web_socket_endpoint,
)


class WebSocketMiddleMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        is_web_socket = is_web_socket_endpoint(scope["path"])

        if not is_web_socket and scope["type"] != "websocket":
            return await self.app(scope, receive, send)

        headers = Headers(scope=scope)
        access_token = headers.get("Authorization")

        try:
            current_user = authentication_handler(access_token)
        except Exception as e:
            response = JSONResponse({"status_code": 401, "message": e.args[0]}, 401)
            return await response(scope, receive, send)

        try:
            await check_authorization(current_user, scope["path"], "GET")
        except Exception as e:
            response = JSONResponse(
                {
                    "status_code": 403,
                    "message": e.args[0],
                },
                403,
            )
            return await response(scope, receive, send)

        scope["current_user"] = current_user
        return await self.app(scope, receive, send)
