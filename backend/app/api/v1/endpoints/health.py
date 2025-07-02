# backend/app/api/v1/endpoints/health.py
from fastapi import APIRouter
from app.services.google_sheets import google_sheets_service

router = APIRouter()

@router.get("")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "backend-api",
        "google_sheets": "connected" if google_sheets_service.sheet else "disconnected"
    }