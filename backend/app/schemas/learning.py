# backend/app/schemas/learning.py
from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from enum import Enum

class LessonType(str, Enum):
    text = "text"
    video = "video"
    interactive = "interactive"
    code = "code"

class ResourceType(str, Enum):
    documentation = "documentation"
    video = "video"
    article = "article"
    github = "github"

class CodeExample(BaseModel):
    language: str
    code: str
    title: Optional[str] = None
    description: Optional[str] = None

class Resource(BaseModel):
    title: str
    url: str
    type: ResourceType

class Question(BaseModel):
    id: str
    question: str
    options: List[str]
    correctAnswer: int
    explanation: Optional[str] = None

class Quiz(BaseModel):
    id: str
    questions: List[Question]
    passingScore: int

class Lesson(BaseModel):
    id: str
    title: str
    type: LessonType
    content: str
    codeExamples: Optional[List[CodeExample]] = None
    resources: Optional[List[Resource]] = None

class Module(BaseModel):
    id: str
    title: str
    description: str
    order: int
    estimatedMinutes: int
    lessons: List[Lesson]
    quiz: Optional[Quiz] = None

class LearningAreaInfo(BaseModel):
    id: str
    title: str
    description: str
    color: str
    icon: str
    moduleCount: int
    estimatedHours: int
    skills: List[str]

class Progress(BaseModel):
    userId: str
    learningArea: str
    completedModules: List[str]
    currentModule: Optional[str] = None
    quizScores: Dict[str, float]
    lastAccessedAt: datetime