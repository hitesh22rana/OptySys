from pydantic import BaseSettings


class Settings(BaseSettings):
    mongodb_uri: str
    project_name: str
    project_description: str
    project_version: str
    debug: bool

    class Config:
        env_file = ".env"


settings = Settings()
