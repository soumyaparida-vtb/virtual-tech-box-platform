# backend/app/api/v1/endpoints/learning.py
from fastapi import APIRouter, HTTPException, status
from typing import List, Dict
from pathlib import Path
from app.schemas.learning import Module, LearningAreaInfo
from app.models.learning import LearningContent
from app.api.deps import create_api_response
from app.core.config import settings
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# Initialize learning content
learning_content = LearningContent(settings.CONTENT_BASE_PATH)

# Learning area metadata
LEARNING_AREAS = {
    "devops": LearningAreaInfo(
        id="devops",
        title="DevOps",
        description="Master CI/CD, containerization, orchestration, and infrastructure as code",
        color="vtb-accent-blue",
        icon="🚀",
        moduleCount=15,
        estimatedHours=40,
        skills=["Docker", "Kubernetes", "CI/CD", "Terraform", "AWS/Azure/GCP", "Monitoring"]
    ),
    "devsecops": LearningAreaInfo(
        id="devsecops",
        title="DevSecOps",
        description="Integrate security practices into your DevOps pipeline and workflows",
        color="vtb-dark-green",
        icon="🔒",
        moduleCount=12,
        estimatedHours=35,
        skills=["Security Scanning", "SAST/DAST", "Container Security", "Compliance", "Threat Modeling"]
    ),
    "data-engineering": LearningAreaInfo(
        id="data-engineering",
        title="Data Engineering",
        description="Build scalable data pipelines and work with big data technologies",
        color="vtb-accent-orange",
        icon="📊",
        moduleCount=18,
        estimatedHours=50,
        skills=["Apache Spark", "Airflow", "Data Lakes", "ETL/ELT", "SQL/NoSQL", "Stream Processing"]
    ),
    "fullstack": LearningAreaInfo(
        id="fullstack",
        title="Full Stack Development",
        description="Develop end-to-end applications with modern web technologies",
        color="vtb-accent-red",
        icon="💻",
        moduleCount=20,
        estimatedHours=60,
        skills=["React", "Node.js", "TypeScript", "REST/GraphQL", "Databases", "Cloud Deployment"]
    ),
    "ai-ml": LearningAreaInfo(
        id="ai-ml",
        title="AI/ML Engineering",
        description="Explore machine learning, deep learning, and artificial intelligence",
        color="vtb-accent-pink",
        icon="🤖",
        moduleCount=16,
        estimatedHours=45,
        skills=["Python", "TensorFlow/PyTorch", "MLOps", "Computer Vision", "NLP", "Model Deployment"]
    )
}

@router.get("/areas", response_model=Dict)
async def get_learning_areas():
    """Get all available learning areas"""
    try:
        return create_api_response(
            success=True,
            data=[area.dict() for area in LEARNING_AREAS.values()]
        )
    except Exception as e:
        logger.error(f"Error fetching learning areas: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch learning areas"
        )

@router.get("/{area}/modules", response_model=Dict)
async def get_modules(area: str):
    """Get all modules for a specific learning area"""
    try:
        if area not in LEARNING_AREAS:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Learning area '{area}' not found"
            )
        
        modules = learning_content.get_modules_for_area(area)
        
        # If no modules found, return mock data for demo
        if not modules:
            modules = get_mock_modules(area)
        
        return create_api_response(
            success=True,
            data=modules
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching modules for {area}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch modules"
        )

@router.get("/{area}/modules/{module_id}", response_model=Dict)
async def get_module_content(area: str, module_id: str):
    """Get content for a specific module"""
    try:
        if area not in LEARNING_AREAS:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Learning area '{area}' not found"
            )
        
        module = learning_content.get_module_by_id(area, module_id)
        
        # If module not found, try mock data
        if not module:
            modules = get_mock_modules(area)
            for m in modules:
                if m['id'] == module_id:
                    module = m
                    break
        
        if not module:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Module '{module_id}' not found"
            )
        
        return create_api_response(
            success=True,
            data=module
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching module {module_id} for {area}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch module content"
        )

@router.post("/progress/update", response_model=Dict)
async def update_progress(data: Dict[str, str]):
    """Update user's learning progress"""
    try:
        # In a real application, this would update the user's progress in a database
        # For now, we'll just return success
        return create_api_response(
            success=True,
            message="Progress updated successfully"
        )
    except Exception as e:
        logger.error(f"Error updating progress: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update progress"
        )

def get_mock_modules(area: str) -> List[Dict]:
    """Generate mock modules for demo purposes"""
    base_modules = {
        "devops": [
            {
                "id": f"{area}-intro",
                "title": "Introduction to DevOps",
                "description": "Learn the fundamentals of DevOps culture and practices",
                "order": 1,
                "estimatedMinutes": 30,
                "lessons": [
                    {
                        "id": f"{area}-intro-1",
                        "title": "What is DevOps?",
                        "type": "text",
                        "content": "# Introduction to DevOps\n\nDevOps is a set of practices that combines software development and IT operations..."
                    }
                ]
            },
            {
                "id": f"{area}-git",
                "title": "Version Control with Git",
                "description": "Master Git for collaborative development",
                "order": 2,
                "estimatedMinutes": 45,
                "lessons": [
                    {
                        "id": f"{area}-git-1",
                        "title": "Git Basics",
                        "type": "text",
                        "content": "# Git Fundamentals\n\nGit is a distributed version control system..."
                    }
                ]
            },
            {
                "id": f"{area}-docker",
                "title": "Containerization with Docker",
                "description": "Learn to build and deploy containerized applications",
                "order": 3,
                "estimatedMinutes": 60,
                "lessons": [
                    {
                        "id": f"{area}-docker-1",
                        "title": "Docker Basics",
                        "type": "text",
                        "content": "# Introduction to Docker\n\nDocker is a platform for developing, shipping, and running applications..."
                    }
                ]
            }
        ],
        "devsecops": [
            {
                "id": f"{area}-intro",
                "title": "Introduction to DevSecOps",
                "description": "Security integration in DevOps pipelines",
                "order": 1,
                "estimatedMinutes": 30,
                "lessons": []
            }
        ],
        "data-engineering": [
            {
                "id": f"{area}-intro",
                "title": "Data Engineering Fundamentals",
                "description": "Core concepts of data engineering",
                "order": 1,
                "estimatedMinutes": 35,
                "lessons": []
            }
        ],
        "fullstack": [
            {
                "id": f"{area}-intro",
                "title": "Full Stack Development Overview",
                "description": "Introduction to modern web development",
                "order": 1,
                "estimatedMinutes": 25,
                "lessons": []
            }
        ],
        "ai-ml": [
            {
                "id": f"{area}-intro",
                "title": "AI/ML Fundamentals",
                "description": "Introduction to artificial intelligence and machine learning",
                "order": 1,
                "estimatedMinutes": 40,
                "lessons": []
            }
        ]
    }
    
    return base_modules.get(area, [])