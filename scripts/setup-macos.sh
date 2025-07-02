# scripts/setup-macos.sh
#!/bin/bash
# Setup script for macOS systems

echo "🚀 Virtual Tech Box Learning Platform Setup - macOS"
echo "=================================================="

# The content is identical to setup-linux.sh for macOS
# Just copy the entire setup-linux.sh content here

# scripts/setup-windows.bat
@echo off
REM Setup script for Windows systems

echo Virtual Tech Box Learning Platform Setup - Windows
echo ==================================================
echo.

REM Check for Docker
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Docker is not installed or not in PATH
    echo Please install Docker Desktop for Windows
    echo Visit: https://docs.docker.com/desktop/install/windows-install/
    exit /b 1
) else (
    echo [OK] Docker is installed
)

REM Check for Docker Compose
docker-compose --version >nul 2>nul
if %errorlevel% neq 0 (
    docker compose version >nul 2>nul
    if %errorlevel% neq 0 (
        echo ERROR: Docker Compose is not installed
        echo Please install Docker Desktop which includes Docker Compose
        exit /b 1
    )
)
echo [OK] Docker Compose is installed

REM Check if Docker is running
docker info >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Docker daemon is not running
    echo Please start Docker Desktop
    exit /b 1
) else (
    echo [OK] Docker daemon is running
)

REM Create necessary directories
echo.
echo Creating project directories...
if not exist "backend\credentials" mkdir backend\credentials
if not exist "backend\content\modules\devops" mkdir backend\content\modules\devops
if not exist "backend\content\modules\devsecops" mkdir backend\content\modules\devsecops
if not exist "backend\content\modules\data-engineering" mkdir backend\content\modules\data-engineering
if not exist "backend\content\modules\fullstack" mkdir backend\content\modules\fullstack
if not exist "backend\content\modules\ai-ml" mkdir backend\content\modules\ai-ml

REM Create .gitkeep files
type nul > backend\credentials\.gitkeep
type nul > backend\content\modules\devops\.gitkeep
type nul > backend\content\modules\devsecops\.gitkeep
type nul > backend\content\modules\data-engineering\.gitkeep
type nul > backend\content\modules\fullstack\.gitkeep
type nul > backend\content\modules\ai-ml\.gitkeep

echo [OK] Project directories created

REM Copy environment files
echo.
echo Setting up environment files...

if not exist ".env" (
    if exist ".env.example" (
        copy .env.example .env >nul
    ) else (
        echo GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id-here > .env
    )
    echo [OK] Created .env file
) else (
    echo [OK] .env file already exists
)

if not exist "backend\.env" (
    if exist "backend\.env.example" (
        copy backend\.env.example backend\.env >nul
    )
    echo [OK] Created backend\.env file
) else (
    echo [OK] backend\.env file already exists
)

if not exist "frontend\.env" (
    echo VITE_API_BASE_URL=http://localhost:8000/api/v1 > frontend\.env
    echo [OK] Created frontend\.env file
) else (
    echo [OK] frontend\.env file already exists
)

REM Check for Google Sheets credentials
echo.
echo Checking Google Sheets setup...
if exist "backend\credentials\google-sheets-key.json" (
    echo [OK] Google Sheets credentials found
) else (
    echo [WARNING] Google Sheets credentials not found
    echo    To enable Google Sheets integration:
    echo    1. Create a service account in Google Cloud Console
    echo    2. Download the JSON key file
    echo    3. Place it at: backend\credentials\google-sheets-key.json
    echo    4. Update GOOGLE_SHEETS_SPREADSHEET_ID in .env file
    echo    The app will work without this, storing data locally.
)

REM Build and start containers
echo.
echo Building Docker images...
docker-compose build
if %errorlevel% neq 0 (
    echo ERROR: Failed to build Docker images
    exit /b 1
)
echo [OK] Docker images built successfully

echo.
echo Starting application...
docker-compose up -d
if %errorlevel% neq 0 (
    echo ERROR: Failed to start application
    exit /b 1
)
echo [OK] Application started

REM Wait for services
echo.
echo Waiting for services to be ready...
timeout /t 5 /nobreak >nul

REM Display access information
echo.
echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo Access the application:
echo   Frontend: http://localhost:3000
echo   Backend API: http://localhost:8000
echo   API Documentation: http://localhost:8000/api/v1/docs
echo.
echo Useful commands:
echo   View logs: docker-compose logs -f
echo   Stop application: docker-compose down
echo   Restart application: docker-compose restart
echo   Rebuild after changes: docker-compose up -d --build
echo.
pause