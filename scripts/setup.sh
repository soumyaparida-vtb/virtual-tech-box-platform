#!/bin/bash
# scripts/setup-linux.sh
# Setup script for Linux systems

echo "🚀 Virtual Tech Box Learning Platform Setup - Linux"
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to print colored output
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ $2${NC}"
    else
        echo -e "${RED}✗ $2${NC}"
        exit 1
    fi
}

# Check for required tools
echo -e "\n${YELLOW}Checking prerequisites...${NC}"

# Check Docker
if command_exists docker; then
    print_status 0 "Docker is installed"
else
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    echo "Visit: https://docs.docker.com/engine/install/"
    exit 1
fi

# Check Docker Compose
if command_exists docker-compose || docker compose version >/dev/null 2>&1; then
    print_status 0 "Docker Compose is installed"
else
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

# Check if Docker daemon is running
if docker info >/dev/null 2>&1; then
    print_status 0 "Docker daemon is running"
else
    echo -e "${YELLOW}Starting Docker daemon...${NC}"
    sudo systemctl start docker
    sleep 2
    if docker info >/dev/null 2>&1; then
        print_status 0 "Docker daemon started"
    else
        print_status 1 "Failed to start Docker daemon"
    fi
fi

# Create necessary directories
echo -e "\n${YELLOW}Creating project directories...${NC}"
mkdir -p backend/credentials
mkdir -p backend/content/modules/{devops,devsecops,data-engineering,fullstack,ai-ml}
print_status $? "Project directories created"

# Create .gitkeep files
touch backend/credentials/.gitkeep
touch backend/content/modules/devops/.gitkeep
touch backend/content/modules/devsecops/.gitkeep
touch backend/content/modules/data-engineering/.gitkeep
touch backend/content/modules/fullstack/.gitkeep
touch backend/content/modules/ai-ml/.gitkeep

# Copy environment files
echo -e "\n${YELLOW}Setting up environment files...${NC}"
if [ ! -f .env ]; then
    cp .env.example .env 2>/dev/null || echo "GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id-here" > .env
    print_status $? "Created .env file"
else
    print_status 0 ".env file already exists"
fi

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env 2>/dev/null || true
    print_status $? "Created backend/.env file"
else
    print_status 0 "backend/.env file already exists"
fi

if [ ! -f frontend/.env ]; then
    cp frontend/.env.example frontend/.env 2>/dev/null || echo "VITE_API_BASE_URL=http://localhost:8000/api/v1" > frontend/.env
    print_status $? "Created frontend/.env file"
else
    print_status 0 "frontend/.env file already exists"
fi

# Check for Google Sheets credentials
echo -e "\n${YELLOW}Checking Google Sheets setup...${NC}"
if [ -f backend/credentials/google-sheets-key.json ]; then
    print_status 0 "Google Sheets credentials found"
else
    echo -e "${YELLOW}⚠️  Google Sheets credentials not found${NC}"
    echo "   To enable Google Sheets integration:"
    echo "   1. Create a service account in Google Cloud Console"
    echo "   2. Download the JSON key file"
    echo "   3. Place it at: backend/credentials/google-sheets-key.json"
    echo "   4. Update GOOGLE_SHEETS_SPREADSHEET_ID in .env file"
    echo -e "${GREEN}   The app will work without this, storing data locally.${NC}"
fi

# Build and start containers
echo -e "\n${YELLOW}Building Docker images...${NC}"
docker-compose build
print_status $? "Docker images built successfully"

echo -e "\n${YELLOW}Starting application...${NC}"
docker-compose up -d
print_status $? "Application started"

# Wait for services to be healthy
echo -e "\n${YELLOW}Waiting for services to be ready...${NC}"
sleep 5

# Check service health
if curl -f http://localhost:8000/health >/dev/null 2>&1; then
    print_status 0 "Backend API is healthy"
else
    print_status 1 "Backend API health check failed"
fi

if curl -f http://localhost:3000 >/dev/null 2>&1; then
    print_status 0 "Frontend is accessible"
else
    echo -e "${YELLOW}Frontend may still be starting up...${NC}"
fi

# Display access information
echo -e "\n${GREEN}✨ Setup completed successfully!${NC}"
echo -e "\n${YELLOW}Access the application:${NC}"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   API Documentation: http://localhost:8000/api/v1/docs"
echo -e "\n${YELLOW}Useful commands:${NC}"
echo "   View logs: docker-compose logs -f"
echo "   Stop application: docker-compose down"
echo "   Restart application: docker-compose restart"
echo "   Rebuild after changes: docker-compose up -d --build"
