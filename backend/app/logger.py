# Purpose: Logger configuration
# Path: backend\app\logger.py

import sys

from loguru import logger

from app.config import settings

# Configure the logger
logger.remove(0)
logger.configure(
    handlers=[
        dict(sink=sys.stdout, level="TRACE", colorize=True),
        dict(sink=sys.stdout, level="DEBUG", colorize=True),
        dict(sink=sys.stdout, level="INFO", colorize=True),
        dict(sink=sys.stdout, level="SUCCESS", colorize=True),
        dict(sink=sys.stdout, level="WARNING", colorize=True),
        dict(sink=sys.stderr, level="ERROR", colorize=True),
        dict(sink=sys.stderr, level="CRITICAL", colorize=True),
    ],
)

# Bind the service name
logger = logger.bind(service=settings.project_name)
