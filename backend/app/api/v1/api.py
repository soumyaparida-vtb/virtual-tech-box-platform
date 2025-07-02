# backend/app/api/v1/api.py
from fastapi import APIRouter
from app.api.v1.endpoints import users, learning, health

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(learning.router, prefix="/learning", tags=["learning"])
