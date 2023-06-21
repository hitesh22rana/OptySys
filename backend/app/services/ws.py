# Purpose: WebSocketService class to handle WebSocket connections
# Path: backend/app/services/ws.py

import asyncio
from typing import Dict, Set

from fastapi import WebSocket

TActiveConnections = Dict[str, Set[WebSocket]]


class WebSocketService:
    def __init__(self):
        self.active_connections: TActiveConnections = {}

    async def connect(self, client_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.setdefault(client_id, set()).add(websocket)

    async def disconnect(self, client_id: str, websocket: WebSocket):
        self.active_connections[client_id].remove(websocket)

    async def send_to_client(cls, client_id: str, data: dict):
        for websocket in cls.active_connections.get(client_id, set()):
            try:
                await websocket.send_json({"id": client_id, "data": data})
            except Exception as _:
                pass

    def broadcast(cls, users: list, data: dict):
        async def broadcast_async():
            tasks = []
            for user in users:
                tasks.append(asyncio.create_task(cls.send_to_client(user, data)))
            await asyncio.gather(*tasks)

        asyncio.run(broadcast_async())


web_socket_service = WebSocketService()
