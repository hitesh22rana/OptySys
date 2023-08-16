# Purpose: Main file and entry point of the application
# Path: backend\app\main.py

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.middlewares import AuthenticationMiddleware, WebSocketMiddleMiddleware
from app.routers import analytics, authentication, organizations, users, ws
from app.utils.database import MongoDBConnector, RedisConnector

"""FastAPI Instance"""
app = FastAPI(docs_url=None, redoc_url=None)

"""Middleware"""
middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    ),
    Middleware(
        AuthenticationMiddleware,
    ),
    Middleware(
        WebSocketMiddleMiddleware,
    ),
]

v1 = FastAPI(
    title=settings.project_name,
    description=settings.project_description,
    version=settings.project_version,
    docs_url=settings.debug and "/docs" or None,
    middleware=middleware,
)

app.mount("/api/v1", v1)

"""Routers"""
v1.include_router(analytics.router)
v1.include_router(authentication.router)
v1.include_router(users.router)
v1.include_router(organizations.router)

"""Websocket Router"""
v1.include_router(ws.router)


"""Startup Event for Database"""


@app.on_event("startup")
async def startup_db_client():
    await MongoDBConnector().connect()
    MongoDBConnector().connect_sync()
    await RedisConnector().connect()


"""Shutdown Event for Database"""


@app.on_event("shutdown")
async def shutdown_db_client():
    await MongoDBConnector().disconnect()
    MongoDBConnector().disconnect_sync()
    await RedisConnector().disconnect()


"""Standard Error Handler"""


@v1.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        content={"status_code": "422", "detail": "Error: Unprocessable Entity"},
        status_code=422,
    )
