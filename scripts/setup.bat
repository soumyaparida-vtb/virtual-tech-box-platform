@echo off
echo Installing Virtual Tech Box Learning Platform...
# Check for Node.js, install if missing
# Clone repository updates
# Install dependencies
# Configure environment
# Launch application

@echo off
echo ========================================
echo   Virtual Tech Box Learning Platform
echo   Windows Setup Script
echo ========================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [INFO] Running with standard user privileges
    echo [INFO] Some features may require administrator rights
    echo.
)

REM Set color for better visibility
color 0A

echo [STEP 1/8] Checking system requirements...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo [INFO] Please install Node.js from https://nodejs.org/
    echo [INFO] Minimum required version: 16.0.0
    echo.
    echo [INFO] Would you like to download Node.js now? (y/n)
    set /p download_node=
    if /i "%download_node%"=="y" (
        start https://nodejs.org/download/
        echo [INFO] Please install Node.js and run this script again
        pause
        exit /b 1
    )
    echo [INFO] Setup cannot continue without Node.js
    pause
    exit /b 1
) else (
    echo [OK] Node.js is installed
    node --version
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] npm is not installed!
    echo [INFO] npm should come with Node.js installation
    pause
    exit /b 1
) else (
    echo [OK] npm is installed
    npm --version
)

REM Check if Git is installed
git --version >nul 2>&1
if %errorLevel% neq 0 (
    echo [WARNING] Git is not installed
    echo [INFO] Git is recommended for version control and updates
    echo [INFO] You can download it from https://git-scm.com/download/win
    echo.
    echo [INFO] Would you like to download Git now? (y/n)
    set /p download_git=
    if /i "%download_git%"=="y" (
        start https://git-scm.com/download/win
    )
) else (
    echo [OK] Git is installed
    git --version
)

echo.
echo [STEP 2/8] Checking project structure...
echo.

REM Check if package.json exists
if not exist "package.json" (
    echo [ERROR] package.json not found!
    echo [INFO] Please make sure you're in the correct directory
    echo [INFO] Current directory: %CD%
    pause
    exit /b 1
) else (
    echo [OK] package.json found
)

REM Check if frontend and backend directories exist
if not exist "frontend" (
    echo [ERROR] frontend directory not found!
    echo [INFO] Please run the project structure generator first
    pause
    exit /b 1
) else (
    echo [OK] frontend directory found
)

if not exist "backend" (
    echo [ERROR] backend directory not found!
    echo [INFO] Please run the project structure generator first
    pause
    exit /b 1
) else (
    echo [OK] backend directory found
)

echo.
echo [STEP 3/8] Installing main dependencies...
echo.

call npm install
if %errorLevel% neq 0 (
    echo [ERROR] Failed to install main dependencies
    echo [INFO] Please check your internet connection and try again
    pause
    exit /b 1
) else (
    echo [OK] Main dependencies installed successfully
)

echo.
echo [STEP 4/8] Installing frontend dependencies...
echo.

cd frontend
call npm install
if %errorLevel% neq 0 (
    echo [ERROR] Failed to install frontend dependencies
    cd ..
    pause
    exit /b 1
) else (
    echo [OK] Frontend dependencies installed successfully
)
cd ..

echo.
echo [STEP 5/8] Installing backend dependencies...
echo.

cd backend
call npm install
if %errorLevel% neq 0 (
    echo [ERROR] Failed to install backend dependencies
    cd ..
    pause
    exit /b 1
) else (
    echo [OK] Backend dependencies installed successfully
)
cd ..

echo.
echo [STEP 6/8] Setting up environment variables...
echo.

REM Create environment files if they don't exist
if not exist "frontend\.env" (
    if exist "frontend\.env.example" (
        copy "frontend\.env.example" "frontend\.env"
        echo [OK] Created frontend .env file from example
    ) else (
        echo REACT_APP_API_URL=http://localhost:3001 > "frontend\.env"
        echo REACT_APP_ENV=development >> "frontend\.env"
        echo [OK] Created frontend .env file with default values
    )
) else (
    echo [OK] Frontend .env file already exists
)

if not exist "backend\.env" (
    if exist "backend\.env.example" (
        copy "backend\.env.example" "backend\.env"
        echo [OK] Created backend .env file from example
    ) else (
        echo NODE_ENV=development > "backend\.env"
        echo PORT=3001 >> "backend\.env"
        echo FRONTEND_URL=http://localhost:3000 >> "backend\.env"
        echo [OK] Created backend .env file with default values
    )
) else (
    echo [OK] Backend .env file already exists
)

echo.
echo [STEP 7/8] Creating data directories...
echo.

REM Create data directories
if not exist "data" mkdir data
if not exist "data\sqlite" mkdir data\sqlite
if not exist "data\uploads" mkdir data\uploads
if not exist "data\logs" mkdir data\logs

echo. > "data\uploads\.gitkeep"
echo. > "data\logs\.gitkeep"
echo. > "data\sqlite\.gitkeep"

echo [OK] Data directories created

echo.
echo [STEP 8/8] Verifying installation...
echo.

REM Check if all necessary files are in place
set "all_good=true"

if not exist "frontend\package.json" (
    echo [ERROR] Frontend package.json missing
    set "all_good=false"
)

if not exist "backend\package.json" (
    echo [ERROR] Backend package.json missing
    set "all_good=false"
)

if not exist "frontend\node_modules" (
    echo [ERROR] Frontend node_modules missing
    set "all_good=false"
)

if not exist "backend\node_modules" (
    echo [ERROR] Backend node_modules missing
    set "all_good=false"
)

if "%all_good%"=="false" (
    echo.
    echo [ERROR] Installation verification failed
    echo [INFO] Please check the errors above and run the setup again
    pause
    exit /b 1
)

echo.
echo ========================================
echo   🎉 SETUP COMPLETED SUCCESSFULLY! 🎉
echo ========================================
echo.
echo [INFO] Next steps:
echo   1. Start the development server: npm run dev
echo   2. Open your browser to: http://localhost:3000
echo   3. Start learning and contributing!
echo.
echo [INFO] Available commands:
echo   npm run dev      - Start development servers
echo   npm run build    - Build for production
echo   npm run test     - Run tests
echo.
echo [INFO] For help and documentation, visit:
echo   https://github.com/VirtualTechBox/learning-platform
echo.

echo Would you like to start the development server now? (y/n)
set /p start_dev=
if /i "%start_dev%"=="y" (
    echo Starting development servers...
    npm run dev
) else (
    echo You can start the development server later with: npm run dev
)

pause