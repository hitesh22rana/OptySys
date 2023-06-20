# Purpose: WebSocketService class to handle WebSocket connections
# Path: backend/app/services/ws.py

from typing import Dict

from fastapi import WebSocket


class WebSocketService:
    connected_clients: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        self.connected_clients[client_id] = websocket

    def disconnect(self, websocket: WebSocket):
        for client_id, ws in self.connected_clients.items():
            if ws == websocket:
                self.connected_clients.pop(client_id, None)
                break

    async def send_to_client(self, data: dict, client_id: str):
        websocket = self.connected_clients.get(client_id)
        if websocket:
            await websocket.send_json(data)


web_socket_service = WebSocketService()
