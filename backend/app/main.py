# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
from app.api.v1.api import api_router
from app.core.config import settings

# Define a list of allowed origins
origins = [
    "http://localhost:3000",     # React dev server
    "http://127.0.0.1:3000",
    "http://localhost:5173",     # Vite dev server
    "http://127.0.0.1:5173",
    "http://frontend:3000",      # Docker container name
    "*",                         # Allow all origins during development
]

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up Virtual Tech Box Learning Platform API...")
    yield
    # Shutdown
    logger.info("Shutting down...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Use the origins list defined above
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Virtual Tech Box Learning Platform API",
        "version": settings.VERSION,
        "docs": f"{settings.API_V1_STR}/docs"
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "backend-api"}