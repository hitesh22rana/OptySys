# Purpose: Rate limiting middleware to prevent brute force attacks
# Path: backend\app\middlewares\rate_limiting.py

from datetime import datetime, timedelta
from typing import Dict, Tuple

from fastapi.responses import JSONResponse
from starlette.datastructures import Headers

TRequestsCount = Dict[str, Tuple[datetime, int]]


class RateLimitingMiddleware:
    def __init__(self, app):
        self.app = app
        self.requests_count: TRequestsCount = {}
        self.threshold = 30

    async def __call__(self, scope, receive, send):
        # Find IP address of the user
        headers = Headers(scope=scope)
        ip_adrress = headers["host"]

        # Get current time and check if the user has made more requests then the threshold value in the last minute
        current_time = datetime.now()
        last_request = self.requests_count.get(ip_adrress, None)

        if last_request is not None:
            last_request_time, last_request_count = last_request

            if last_request_count >= self.threshold:
                if (current_time - last_request_time) < timedelta(seconds=60):
                    response = JSONResponse(
                        {
                            "status_code": 429,
                            "detail": "Too many requests. Please try again later.",
                        },
                        429,
                    )
                    return await response(scope, receive, send)

                else:
                    self.requests_count[ip_adrress] = (current_time, 1)

            else:
                self.requests_count[ip_adrress] = (current_time, last_request_count + 1)

        else:
            # Add the current request timestamp to the requests_count dictionary
            self.requests_count[ip_adrress] = (current_time, 1)

        return await self.app(scope, receive, send)
