# backend/app/services/google_sheets.py
import os
import logging
from typing import List, Optional, Dict
from datetime import datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from app.core.config import settings
from app.models.user import User

logger = logging.getLogger(__name__)

class GoogleSheetsService:
    def __init__(self):
        self.spreadsheet_id = settings.GOOGLE_SHEETS_SPREADSHEET_ID
        self.credentials_path = settings.GOOGLE_SHEETS_CREDENTIALS_PATH
        self.service = None
        self.sheet = None
        self._initialize_service()
    
    def _initialize_service(self):
        """Initialize Google Sheets API service"""
        try:
            # Check if credentials file exists
            if not os.path.exists(self.credentials_path):
                logger.warning(f"Google Sheets credentials file not found at {self.credentials_path}")
                logger.info("Google Sheets integration will be disabled. Data will be stored locally.")
                return
            
            # Load credentials
            credentials = service_account.Credentials.from_service_account_file(
                self.credentials_path,
                scopes=settings.GOOGLE_SHEETS_SCOPES
            )
            
            # Build service
            self.service = build('sheets', 'v4', credentials=credentials)
            self.sheet = self.service.spreadsheets()
            
            # Initialize spreadsheet if needed
            self._initialize_spreadsheet()
            
            logger.info("Google Sheets service initialized successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize Google Sheets service: {e}")
            logger.info("Falling back to local storage")
    
    def _initialize_spreadsheet(self):
        """Create header row if the spreadsheet is empty"""
        try:
            # Check if sheet has headers
            result = self.sheet.values().get(
                spreadsheetId=self.spreadsheet_id,
                range='A1:E1'
            ).execute()
            
            values = result.get('values', [])
            
            if not values:
                # Add headers
                headers = [['Name', 'Email', 'Phone Number', 'Learning Area', 'Registered At']]
                self.sheet.values().update(
                    spreadsheetId=self.spreadsheet_id,
                    range='A1:E1',
                    valueInputOption='RAW',
                    body={'values': headers}
                ).execute()
                
                # Format header row
                requests = [{
                    'repeatCell': {
                        'range': {
                            'sheetId': 0,
                            'startRowIndex': 0,
                            'endRowIndex': 1
                        },
                        'cell': {
                            'userEnteredFormat': {
                                'backgroundColor': {
                                    'red': 0.18,
                                    'green': 0.27,
                                    'blue': 0.48
                                },
                                'textFormat': {
                                    'foregroundColor': {
                                        'red': 1.0,
                                        'green': 1.0,
                                        'blue': 1.0
                                    },
                                    'bold': True
                                }
                            }
                        },
                        'fields': 'userEnteredFormat(backgroundColor,textFormat)'
                    }
                }]
                
                self.sheet.batchUpdate(
                    spreadsheetId=self.spreadsheet_id,
                    body={'requests': requests}
                ).execute()
                
                logger.info("Spreadsheet headers initialized")
                
        except Exception as e:
            logger.error(f"Failed to initialize spreadsheet: {e}")
    
    def add_user(self, user: User) -> bool:
        """Add a new user to the Google Sheet"""
        if not self.sheet:
            logger.warning("Google Sheets not available, storing locally only")
            return self._store_locally(user)
        
        try:
            # Get current row count to append at the end
            result = self.sheet.values().get(
                spreadsheetId=self.spreadsheet_id,
                range='A:A'
            ).execute()
            
            row_count = len(result.get('values', [])) + 1
            
            # Append user data
            values = [user.to_sheet_row()]
            
            self.sheet.values().append(
                spreadsheetId=self.spreadsheet_id,
                range=f'A{row_count}',
                valueInputOption='RAW',
                insertDataOption='INSERT_ROWS',
                body={'values': values}
            ).execute()
            
            logger.info(f"User {user.email} added to Google Sheets at row {row_count}")
            return True
            
        except HttpError as e:
            logger.error(f"Google Sheets API error: {e}")
            return self._store_locally(user)
        except Exception as e:
            logger.error(f"Failed to add user to Google Sheets: {e}")
            return self._store_locally(user)
    
    def get_all_users(self) -> List[Dict]:
        """Retrieve all users from the Google Sheet"""
        if not self.sheet:
            return self._get_local_users()
        
        try:
            result = self.sheet.values().get(
                spreadsheetId=self.spreadsheet_id,
                range='A2:E'  # Skip header row
            ).execute()
            
            values = result.get('values', [])
            users = []
            
            for i, row in enumerate(values, start=2):
                if len(row) >= 5:
                    users.append({
                        'name': row[0],
                        'email': row[1],
                        'phoneNumber': row[2],
                        'learningArea': row[3],
                        'registeredAt': row[4],
                        'rowNumber': i
                    })
            
            return users
            
        except Exception as e:
            logger.error(f"Failed to retrieve users from Google Sheets: {e}")
            return self._get_local_users()
    
    def find_user_by_email(self, email: str) -> Optional[Dict]:
        """Find a user by email"""
        users = self.get_all_users()
        for user in users:
            if user.get('email') == email:
                return user
        return None
    
    def _store_locally(self, user: User) -> bool:
        """Fallback method to store user data locally"""
        try:
            import json
            local_file = "local_users.json"
            
            # Load existing data
            users = []
            if os.path.exists(local_file):
                with open(local_file, 'r') as f:
                    users = json.load(f)
            
            # Add new user
            users.append(user.to_dict())
            
            # Save back
            with open(local_file, 'w') as f:
                json.dump(users, f, indent=2)
            
            logger.info(f"User {user.email} stored locally")
            return True
            
        except Exception as e:
            logger.error(f"Failed to store user locally: {e}")
            return False
    
    def _get_local_users(self) -> List[Dict]:
        """Get users from local storage"""
        try:
            import json
            local_file = "local_users.json"
            
            if os.path.exists(local_file):
                with open(local_file, 'r') as f:
                    return json.load(f)
            
            return []
            
        except Exception as e:
            logger.error(f"Failed to get local users: {e}")
            return []

# Singleton instance
google_sheets_service = GoogleSheetsService()