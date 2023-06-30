# Purpose: Environment configuration for the application.
# Path: backend\app\config.py

from pydantic import BaseSettings


class Settings(BaseSettings):
    mongodb_uri: str
    project_name: str
    project_description: str
    project_version: str
    debug: bool
    jwt_secret: str
    jwt_algorithm: str
    smtp_host: str
    smtp_port: int
    smtp_username: str
    smtp_password: str
    bard_token: str

    class Config:
        env_file = ".env"


settings = Settings()
