
# backend/app/core/config.py
from typing import List, Union
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl, field_validator
import os
from pathlib import Path

class Settings(BaseSettings):
    # Project Info
    PROJECT_NAME: str = "Virtual Tech Box Learning Platform"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []
    
    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)
    
    # # Google Sheets Configuration
    # GOOGLE_SHEETS_CREDENTIALS_PATH: str = "./credentials/manifest-module-465318-q0-6ae991e65c49.json"
    # GOOGLE_SHEETS_SPREADSHEET_ID: str = "1LYCHLwG39KUBgMh9fKF4TDXdjQJ01dP4P3LYedybzdQ"
    # GOOGLE_SHEETS_SCOPES: List[str] = [
    #     "https://www.googleapis.com/auth/spreadsheets",
    #     "https://www.googleapis.com/auth/drive.file"
    # ]
    # Add this to the Settings class in config.py
    # HubSpot Configuration
    HUBSPOT_API_KEY: str = ""
    HUBSPOT_LIST_ID: str = ""  # Optional, for adding users to a specific list

    # Security
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Environment
    ENVIRONMENT: str = "development"
    
    # Content Path
    CONTENT_BASE_PATH: Path = Path("./content/modules")
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()