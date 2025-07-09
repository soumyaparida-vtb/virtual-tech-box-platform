#!/usr/bin/env python
# backend/scripts/import_content.py

import argparse
import json
import os
from pathlib import Path
import shutil

def create_module_structure(learning_area):
    """Create directory structure for a learning area"""
    base_path = Path("./content/modules")
    area_path = base_path / learning_area
    
    if not base_path.exists():
        base_path.mkdir(parents=True)
        print(f"Created base content directory at {base_path}")
    
    if not area_path.exists():
        area_path.mkdir()
        print(f"Created learning area directory at {area_path}")
    
    # Copy template if it exists
    template_path = Path("./content/templates/module-template.json")
    if template_path.exists():
        target_path = area_path / "module-template.json"
        shutil.copy(template_path, target_path)
        print(f"Copied module template to {target_path}")
    else:
        print("Template not found. Please create a template at ./content/templates/module-template.json")

def import_module(file_path, learning_area):
    """Import a module JSON file into the content structure"""
    source_path = Path(file_path)
    if not source_path.exists():
        print(f"Error: File {file_path} not found")
        return False
    
    # Ensure directory exists
    base_path = Path("./content/modules")
    area_path = base_path / learning_area
    if not area_path.exists():
        area_path.mkdir(parents=True)
        print(f"Created learning area directory at {area_path}")
    
    # Load and validate JSON
    try:
        with open(source_path, 'r', encoding='utf-8') as f:
            module_data = json.load(f)
        
        # Basic validation
        required_fields = ['id', 'title', 'description', 'order', 'lessons']
        for field in required_fields:
            if field not in module_data:
                print(f"Error: Required field '{field}' missing in module JSON")
                return False
        
        # Create target filename
        module_id = module_data['id']
        order = module_data['order']
        target_filename = f"module-{order:02d}-{module_id}.json"
        target_path = area_path / target_filename
        
        # Save to target location
        with open(target_path, 'w', encoding='utf-8') as f:
            json.dump(module_data, f, indent=2)
        
        print(f"Successfully imported module to {target_path}")
        return True
        
    except json.JSONDecodeError:
        print(f"Error: {file_path} is not a valid JSON file")
        return False
    except Exception as e:
        print(f"Error importing module: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Import content modules into Virtual Tech Box")
    subparsers = parser.add_subparsers(dest="command", help="Command to run")
    
    # create command
    create_parser = subparsers.add_parser("create", help="Create learning area structure")
    create_parser.add_argument("area", help="Learning area ID (e.g. devops, fullstack)")
    
    # import command
    import_parser = subparsers.add_parser("import", help="Import a module JSON file")
    import_parser.add_argument("file", help="Path to module JSON file")
    import_parser.add_argument("area", help="Learning area ID (e.g. devops, fullstack)")
    
    args = parser.parse_args()
    
    if args.command == "create":
        create_module_structure(args.area)
    elif args.command == "import":
        import_module(args.file, args.area)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()