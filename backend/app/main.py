from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import organizations, users
from app.utils.database import MongoDBConnector

"""FastAPI Instance"""
app = FastAPI(docs_url=None, redoc_url=None)

v1 = FastAPI(
    title=settings.project_name,
    description=settings.project_description,
    version=settings.project_version,
    docs_url=settings.debug and "/docs" or None,
)

app.mount("/api/v1", v1)

"""MiddleWares"""
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"])

"""Routers"""
v1.include_router(users.router)
v1.include_router(organizations.router)


"""Startup Event for Database"""


@app.on_event("startup")
async def startup_db_client():
    await MongoDBConnector().connect()
