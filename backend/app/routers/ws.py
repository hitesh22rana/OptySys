# Purpose: Websocket router for handling websocket related operations.
# Path: backend\app\routers\ws.py

from fastapi import APIRouter, WebSocket

from app.services.ws import web_socket_service

router = APIRouter(
    tags=["Websocket"],
    prefix="/ws",
)


@router.websocket("/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    print("\nwebsocket_endpoint\n")
    await web_socket_service.connect(websocket, client_id)

    try:
        await websocket.send_json({"message": "Hello WebSocket"})

    except Exception as _:
        web_socket_service.disconnect(websocket)
