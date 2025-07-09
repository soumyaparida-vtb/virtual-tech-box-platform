# backend/app/api/v1/endpoints/health.py
from fastapi import APIRouter
from app.services.hubspot import hubspot_service

router = APIRouter()

@router.get("")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "backend-api",
        "hubspot": "connected" if hubspot_service.client else "disconnected"
    }