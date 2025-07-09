# backend/app/api/v1/endpoints/users.py
from fastapi import APIRouter, HTTPException, status
from typing import Dict
from datetime import datetime
from app.schemas.user import UserRegistration, UserResponse
from app.models.user import User
from app.services.hubspot import hubspot_service
from app.api.deps import create_api_response
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/register", response_model=Dict)
async def register_user(user_data: UserRegistration):
    """Register a new user and store in HubSpot"""
    try:
        # Check if user already exists
        existing_user = hubspot_service.find_user_by_email(user_data.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists"
            )
        
        # Create user instance
        user = User(
            name=user_data.name,
            email=user_data.email,
            phone_number=user_data.phoneNumber,
            learning_area=user_data.learningArea,
            registered_at=datetime.utcnow()
        )
        
        # Store in HubSpot
        success = hubspot_service.add_user(user)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to register user"
            )
        
        # Return response
        user_response = UserResponse(
            name=user.name,
            email=user.email,
            phoneNumber=user.phone_number,
            selectedArea=user.learning_area,
            registeredAt=user.registered_at
        )
        
        return create_api_response(
            success=True,
            data=user_response.dict(),
            message="User registered successfully"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Registration error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during registration"
        )

# Also update the check_email_exists function:
@router.get("/check-email/{email}", response_model=Dict)
async def check_email_exists(email: str):
    """Check if an email is already registered"""
    try:
        user = hubspot_service.find_user_by_email(email)
        return create_api_response(
            success=True,
            data={"exists": user is not None}
        )
    except Exception as e:
        logger.error(f"Email check error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to check email"
        )