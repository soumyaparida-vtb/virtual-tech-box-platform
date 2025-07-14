# backend/app/services/hubspot.py
import os
import logging
from typing import Dict, Optional
import hubspot
from hubspot.crm.contacts import SimplePublicObjectInput
from app.core.config import settings
from app.models.user import User

logger = logging.getLogger(__name__)

class HubSpotService:
    def __init__(self):
        self.api_key = settings.HUBSPOT_API_KEY
        self.client = None
        self._initialize_service()
    
    def _initialize_service(self):
        """Initialize HubSpot API client"""
        try:
            if not self.api_key:
                logger.warning("HubSpot API key not provided. HubSpot integration will be disabled.")
                return
            
            self.client = hubspot.Client.create(api_key=self.api_key)
            logger.info("HubSpot service initialized successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize HubSpot service: {e}")
            logger.info("Falling back to local storage")
    
    def add_user(self, user: User) -> bool:
        """Add a new user to HubSpot as a contact"""
        if not self.client:
            logger.warning("HubSpot not available, storing locally only")
            return self._store_locally(user)
        
        try:
            # Prepare properties for HubSpot contact
            properties = {
                "email": user.email,
                "firstname": user.name.split()[0] if ' ' in user.name else user.name,
                "lastname": ' '.join(user.name.split()[1:]) if ' ' in user.name else "",
                "phone": user.phone_number,
                "vtb_learning_area": user.learning_area,
                "vtb_registered_at": user.registered_at.strftime("%Y-%m-%d %H:%M:%S UTC")
            }
            
            # Create contact in HubSpot
            simple_public_object_input = SimplePublicObjectInput(properties=properties)
            api_response = self.client.crm.contacts.basic_api.create(
                simple_public_object_input=simple_public_object_input
            )
            
            # Add to list if configured
            if hasattr(settings, 'HUBSPOT_LIST_ID') and settings.HUBSPOT_LIST_ID:
                self._add_to_list(api_response.id, settings.HUBSPOT_LIST_ID)
            
            logger.info(f"User {user.email} added to HubSpot")
            return True
            
        except hubspot.crm.contacts.exceptions.ApiException as e:
            # Check if the error is because the contact already exists (409 Conflict)
            if hasattr(e, 'status') and e.status == 409:
                logger.warning(f"Contact with email {user.email} already exists in HubSpot")
                return True  # Consider this a success
            else:
                logger.error(f"HubSpot API error: {e}")
                return self._store_locally(user)
        except Exception as e:
            logger.error(f"HubSpot API error: {e}")
            return self._store_locally(user)
    
    def _add_to_list(self, contact_id, list_id):
        """Add contact to a HubSpot list"""
        try:
            # Note: This requires the Lists API which may need additional permissions
            # This is simplified and may need adjustment based on the HubSpot API version
            self.client.crm.lists.add_contact_to_list(list_id, contact_id)
            logger.info(f"Contact {contact_id} added to list {list_id}")
        except Exception as e:
            logger.error(f"Failed to add contact to list: {e}")
    
    def find_user_by_email(self, email: str) -> Optional[Dict]:
        """Find a user by email in HubSpot"""
        if not self.client:
            return None
        
        try:
            filter_groups = [
                {
                    "filters": [
                        {
                            "propertyName": "email",
                            "operator": "EQ",
                            "value": email
                        }
                    ]
                }
            ]
            
            public_object_search_request = {
                "filterGroups": filter_groups,
                "properties": ["email", "firstname", "lastname", "phone", "vtb_learning_area", "vtb_registered_at"],
                "limit": 1
            }
            
            result = self.client.crm.contacts.search_api.do_search(
                public_object_search_request=public_object_search_request
            )
            
            if result.results and len(result.results) > 0:
                contact = result.results[0]
                return {
                    "email": contact.properties.get("email"),
                    "name": f"{contact.properties.get('firstname', '')} {contact.properties.get('lastname', '')}".strip(),
                    "phoneNumber": contact.properties.get("phone", ""),
                    "learningArea": contact.properties.get("vtb_learning_area", ""),
                    "hubspotId": contact.id
                }
            
            return None
            
        except Exception as e:
            logger.error(f"Failed to search HubSpot contacts: {e}")
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

# Singleton instance
hubspot_service = HubSpotService()