# backend/app/api/deps.py
from typing import Dict, Any, Optional

def create_api_response(
    success: bool,
    data: Optional[Any] = None,
    error: Optional[str] = None,
    message: Optional[str] = None
) -> Dict[str, Any]:
    """Create a standardized API response"""
    response = {"success": success}
    
    if data is not None:
        response["data"] = data
    
    if error is not None:
        response["error"] = error
    
    if message is not None:
        response["message"] = message
    
    return response