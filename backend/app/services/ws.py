# Purpose: WebSocketService class to handle WebSocket connections
# Path: backend/app/services/ws.py

import asyncio
from typing import Dict

from fastapi import WebSocket


class WebSocketService:
    connected_clients: Dict[str, WebSocket] = {}
    lock = asyncio.Lock()

    @classmethod
    async def connect(cls, websocket: WebSocket, client_id: str):
        await websocket.accept()
        async with cls.lock:
            cls.connected_clients[client_id] = websocket

    @classmethod
    async def disconnect(cls, websocket: WebSocket):
        async with cls.lock:
            for client_id, ws in cls.connected_clients.items():
                if ws == websocket:
                    cls.connected_clients.pop(client_id, None)
                    break

    @classmethod
    async def send_to_client(cls, client_id: str, data: dict):
        websocket = cls.connected_clients.get(client_id)
        if websocket:
            try:
                await websocket.send_json(data)
            except Exception as _:
                pass

    @classmethod
    def broadcast(cls, users: list, data: dict):
        async def broadcast_async():
            tasks = []

            for user in users:
                tasks.append(asyncio.create_task(cls.send_to_client(user, data)))

            await asyncio.gather(*tasks)

        asyncio.run(broadcast_async())


web_socket_service = WebSocketService()
