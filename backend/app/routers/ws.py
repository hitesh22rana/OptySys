# Purpose: Websocket router for handling websocket related operations.
# Path: backend\app\routers\ws.py

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.services.ws import web_socket_service

router = APIRouter(
    tags=["Websocket"],
    prefix="/ws",
)

"""
    Websocket endpoint for handling notifications.

    Raises:
        WebSocketDisconnect: Websocket disconnect error
        RuntimeException: Runtime error

    Returns:
        _type_: Notification 
"""


@router.websocket("/notifications")
async def websocket_endpoint(websocket: WebSocket):
    current_user = websocket.scope["current_user"]

    await web_socket_service.connect(current_user, websocket)
    try:
        while True:
            await websocket.receive_text()

    except WebSocketDisconnect:
        await web_socket_service.disconnect(current_user, websocket)

    except Exception as _:
        await web_socket_service.disconnect(current_user, websocket)
