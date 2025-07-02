# backend/app/schemas/user.py
from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
from datetime import datetime
import re

class UserRegistration(BaseModel):
    name: str
    email: EmailStr
    phoneNumber: str
    learningArea: str
    
    @field_validator('name')
    def validate_name(cls, v):
        if len(v) < 2:
            raise ValueError('Name must be at least 2 characters long')
        return v
    
    @field_validator('phoneNumber')
    def validate_phone(cls, v):
        # Remove all non-digit characters
        phone_digits = re.sub(r'\D', '', v)
        if len(phone_digits) < 10:
            raise ValueError('Phone number must have at least 10 digits')
        return v
    
    @field_validator('learningArea')
    def validate_learning_area(cls, v):
        valid_areas = ['devops', 'devsecops', 'data-engineering', 'fullstack', 'ai-ml']
        if v not in valid_areas:
            raise ValueError(f'Learning area must be one of: {", ".join(valid_areas)}')
        return v

class UserResponse(BaseModel):
    name: str
    email: str
    phoneNumber: str
    selectedArea: str
    registeredAt: datetime

class UserInDB(BaseModel):
    name: str
    email: str
    phoneNumber: str
    learningArea: str
    registeredAt: datetime
    rowNumber: Optional[int] = None