from fastapi import HTTPException
from fastapi.responses import JSONResponse
from starlette.datastructures import Headers

PUBLIC_ENDPOINTS = [
    {"path": "/api/v1/users", "method": "POST"},
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
            user_id = await authentication_handler(authorization)
        except Exception as e:
            response = JSONResponse({"status_code": 401, "message": e.args}, 401)
            return await response(scope, receive, send)

        scope["user_id"] = user_id
        return await self.app(scope, receive, send)


def is_public_endpoint(request_path, request_method):
    return {"path": request_path, "method": request_method} in PUBLIC_ENDPOINTS


async def authentication_handler(authorization: str):
    return authorization
    # raise Exception("Please login to access this resource.")

    # async def get_user(self, token):
    #     try:
    #         payload = jwt.decode(token, settings.jwt_secret, algorithms=["HS256"])
    #         user = await UserModel.objects.get(id=payload["id"])
    #         return user
    #     except Exception as e:
    #         raise HTTPException(status_code=401, detail="Invalid Token")
