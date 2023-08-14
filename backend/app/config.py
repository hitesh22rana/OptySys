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
    token_expiry_time: int
    smtp_host: str
    smtp_port: int
    smtp_username: str
    smtp_password: str
    bard_token_1psid: str
    bard_token_1psidcc: str
    bard_token_1psidts: str
    redis_host: str
    redis_port: int
    redis_password: str
    frontend_base_url: str
    allowed_origins: list

    class Config:
        env_file = ".env"


settings = Settings()
