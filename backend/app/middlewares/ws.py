# Purpose: WebSocket middlware to authenticate WebSocket connections
# Path: backend\app\middlewares\ws.py

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

        access_token: str = scope["query_string"].decode()

        if not access_token or access_token == "":
            return await send(
                {
                    "type": "websocket.close",
                    "code": 403,
                    "reason": "No access token provided",
                }
            )

        access_token = access_token.split("=")[1]

        try:
            access_token = access_token.replace("Bearer%20", "Bearer ")
            current_user = authentication_handler(access_token)
        except Exception as e:
            return await send(
                {
                    "type": "websocket.close",
                    "code": 403,
                    "reason": e.args[0],
                }
            )

        try:
            await check_authorization(current_user, scope["path"], "GET")
        except Exception as e:
            return await send(
                {
                    "type": "websocket.close",
                    "code": 403,
                    "reason": e.args[0],
                }
            )

        scope["current_user"] = current_user
        return await self.app(scope, receive, send)
