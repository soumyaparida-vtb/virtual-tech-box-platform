# backend/app/models/user.py
from datetime import datetime
from typing import Optional

class User:
    def __init__(
        self,
        name: str,
        email: str,
        phone_number: str,
        learning_area: str,
        registered_at: Optional[datetime] = None,
        row_number: Optional[int] = None
    ):
        self.name = name
        self.email = email
        self.phone_number = phone_number
        self.learning_area = learning_area
        self.registered_at = registered_at or datetime.utcnow()
        self.row_number = row_number
    
    def to_dict(self):
        return {
            "name": self.name,
            "email": self.email,
            "phoneNumber": self.phone_number,
            "learningArea": self.learning_area,
            "registeredAt": self.registered_at.isoformat()
        }
    
    def to_sheet_row(self):
        return [
            self.name,
            self.email,
            self.phone_number,
            self.learning_area,
            self.registered_at.strftime("%Y-%m-%d %H:%M:%S UTC")
        ]