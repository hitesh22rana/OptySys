from fastapi import APIRouter

router = APIRouter(
    tags=["Users"],
    prefix="/users",
)
