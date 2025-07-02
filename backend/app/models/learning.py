# backend/app/models/learning.py
from typing import List, Optional, Dict
from pathlib import Path
import json
import yaml

class LearningContent:
    def __init__(self, content_path: Path):
        self.content_path = content_path
        self._modules_cache: Dict[str, List[dict]] = {}
    
    def get_modules_for_area(self, learning_area: str) -> List[dict]:
        if learning_area in self._modules_cache:
            return self._modules_cache[learning_area]
        
        area_path = self.content_path / learning_area
        if not area_path.exists():
            return []
        
        modules = []
        for module_file in sorted(area_path.glob("*.json")):
            try:
                with open(module_file, 'r', encoding='utf-8') as f:
                    module_data = json.load(f)
                    modules.append(module_data)
            except Exception as e:
                print(f"Error loading module {module_file}: {e}")
        
        # Sort by order
        modules.sort(key=lambda x: x.get('order', 999))
        self._modules_cache[learning_area] = modules
        return modules
    
    def get_module_by_id(self, learning_area: str, module_id: str) -> Optional[dict]:
        modules = self.get_modules_for_area(learning_area)
        for module in modules:
            if module.get('id') == module_id:
                return module
        return None