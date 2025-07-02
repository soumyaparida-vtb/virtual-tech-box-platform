#!/bin/bash

# setup.sh - Linux/macOS Setup Script for Virtual Tech Box
# This script handles automatic installation and setup for Unix-based systems

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${PURPLE}$1${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to get OS information
get_os() {
    unamestr=$(uname)
    if [[ "$unamestr" == 'Linux' ]]; then
        echo 'Linux'
    elif [[ "$unamestr" == 'Darwin' ]]; then
        echo 'macOS'
    else
        echo 'Unknown'
    fi
}

# Function to get Linux distribution
get_linux_distro() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        echo $ID
    elif command_exists lsb_release; then
        lsb_release -si | tr '[:upper:]' '[:lower:]'
    else
        echo "unknown"
    fi
}

# Function to install Node.js on Ubuntu/Debian
install_nodejs_debian() {
    print_status "Installing Node.js on Ubuntu/Debian..."
    
    # Update package list
    sudo apt-get update
    
    # Install curl if not present
    if ! command_exists curl; then
        sudo apt-get install -y curl
    fi
    
    # Add NodeSource repository
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    
    # Install Node.js
    sudo apt-get install -y nodejs
    
    print_success "Node.js installed successfully"
}

# Function to install Node.js on CentOS/RHEL/Fedora
install_nodejs_redhat() {
    print_status "Installing Node.js on RedHat-based system..."
    
    # Install curl if not present
    if ! command_exists curl; then
        if command_exists dnf; then
            sudo dnf install -y curl
        else
            sudo yum install -y curl
        fi
    fi
    
    # Add NodeSource repository
    curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
    
    # Install Node.js
    if command_exists dnf; then
        sudo dnf install -y nodejs npm
    else
        sudo yum install -y nodejs npm
    fi
    
    print_success "Node.js installed successfully"
}

# Function to install Node.js on macOS
install_nodejs_macos() {
    print_status "Installing Node.js on macOS..."
    
    # Check if Homebrew is available
    if command_exists brew; then
        brew install node
    else
        print_warning "Homebrew not found. Installing Homebrew first..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        
        # Add Homebrew to PATH for this session
        if [[ -f "/opt/homebrew/bin/brew" ]]; then
            eval "$(/opt/homebrew/bin/brew shellenv)"
        elif [[ -f "/usr/local/bin/brew" ]]; then
            eval "$(/usr/local/bin/brew shellenv)"
        fi
        
        brew install node
    fi
    
    print_success "Node.js installed successfully"
}

# Function to check Node.js version
check_nodejs_version() {
    if command_exists node; then
        NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
        if [ "$NODE_VERSION" -ge 18 ]; then
            print_success "Node.js $(node --version) is installed and compatible"
            return 0
        else
            print_warning "Node.js version $(node --version) is too old. Minimum required: v18"
            return 1
        fi
    else
        print_warning "Node.js is not installed"
        return 1
    fi
}

# Function to install Python (for AI/ML modules)
install_python() {
    print_status "Checking Python installation..."
    
    if command_exists python3; then
        PYTHON_VERSION=$(python3 --version 2>&1 | cut -d' ' -f2 | cut -d'.' -f1,2)
        print_success "Python $PYTHON_VERSION is already installed"
    else
        print_status "Installing Python..."
        OS=$(get_os)
        
        if [[ "$OS" == "Linux" ]]; then
            DISTRO=$(get_linux_distro)
            case $DISTRO in
                ubuntu|debian)
                    sudo apt-get update
                    sudo apt-get install -y python3 python3-pip
                    ;;
                centos|rhel|fedora)
                    if command_exists dnf; then
                        sudo dnf install -y python3 python3-pip
                    else
                        sudo yum install -y python3 python3-pip
                    fi
                    ;;
                *)
                    print_warning "Unknown Linux distribution. Please install Python manually."
                    ;;
            esac
        elif [[ "$OS" == "macOS" ]]; then
            if command_exists brew; then
                brew install python
            else
                print_error "Please install Python manually from https://python.org"
                exit 1
            fi
        fi
        
        print_success "Python installed successfully"
    fi
}

# Function to install Git if not present
install_git() {
    if ! command_exists git; then
        print_status "Installing Git..."
        OS=$(get_os)
        
        if [[ "$OS" == "Linux" ]]; then
            DISTRO=$(get_linux_distro)
            case $DISTRO in
                ubuntu|debian)
                    sudo apt-get update
                    sudo apt-get install -y git
                    ;;
                centos|rhel|fedora)
                    if command_exists dnf; then
                        sudo dnf install -y git
                    else
                        sudo yum install -y git
                    fi
                    ;;
            esac
        elif [[ "$OS" == "macOS" ]]; then
            if command_exists brew; then
                brew install git
            else
                # Git comes with Xcode command line tools on macOS
                xcode-select --install 2>/dev/null || true
            fi
        fi
        
        print_success "Git installed successfully"
    else
        print_success "Git is already installed"
    fi
}

# Function to create necessary directories
create_directories() {
    print_status "Creating project directories..."
    
    mkdir -p data
    mkdir -p logs
    mkdir -p frontend/public/logo
    mkdir -p backend/database
    mkdir -p config
    
    print_success "Project directories created"
}

# Function to setup configuration files
setup_config() {
    print_status "Setting up configuration files..."
    
    # Create .env file if it doesn't exist
    if [ ! -f .env ]; then
        cat > .env << 'EOF'
# Virtual Tech Box Environment Configuration
NODE_ENV=development
PORT=3000
API_PORT=5000

# Database Configuration
DB_TYPE=sqlite
DB_NAME=virtual-tech-box.db

# Google Sheets Integration (Optional)
GOOGLE_SHEETS_ENABLED=false
GOOGLE_SHEETS_ID=""
GOOGLE_SERVICE_ACCOUNT_EMAIL=""
GOOGLE_PRIVATE_KEY=""

# Application Settings
APP_NAME="Virtual Tech Box"
APP_VERSION="1.0.0"
JWT_SECRET="your-jwt-secret-key-change-this"

# Analytics (Optional)
ANALYTICS_ENABLED=false
EOF
        print_success "Main environment file created"
    fi
    
    # Create frontend .env.local
    if [ ! -f frontend/.env.local ]; then
        cat > frontend/.env.local << 'EOF'
# Frontend Environment Configuration
REACT_APP_API_URL=http://localhost:5000
REACT_APP_APP_NAME="Virtual Tech Box"
REACT_APP_VERSION="1.0.0"
REACT_APP_GOOGLE_SHEETS_ENABLED=false
REACT_APP_ANALYTICS_ENABLED=false
EOF
        print_success "Frontend environment file created"
    fi
    
    # Create backend .env
    if [ ! -f backend/.env ]; then
        cat > backend/.env << 'EOF'
# Backend Environment Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL=./database/virtual-tech-box.db

# JWT Configuration
JWT_SECRET=your-jwt-secret-key-change-this
JWT_EXPIRES_IN=7d

# Google Sheets
GOOGLE_SHEETS_ID=""
GOOGLE_SERVICE_ACCOUNT_EMAIL=""
GOOGLE_PRIVATE_KEY=""

# Email Configuration (Optional)
EMAIL_ENABLED=false
SMTP_HOST=""
SMTP_PORT=587
SMTP_USER=""
SMTP_PASS=""

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
EOF
        print_success "Backend environment file created"
    fi
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing project dependencies..."
    
    # Install root dependencies
    if [ -f package.json ]; then
        npm install
        print_success "Root dependencies installed"
    fi
    
    # Install frontend dependencies
    if [ -d frontend ] && [ -f frontend/package.json ]; then
        print_status "Installing frontend dependencies..."
        cd frontend
        npm install
        cd ..
        print_success "Frontend dependencies installed"
    fi
    
    # Install backend dependencies
    if [ -d backend ] && [ -f backend/package.json ]; then
        print_status "Installing backend dependencies..."
        cd backend
        npm install
        cd ..
        print_success "Backend dependencies installed"
    fi
}

# Function to create logo placeholder
create_logo_placeholder() {
    print_status "Creating logo placeholder..."
    
    cat > frontend/public/logo/README.md << 'EOF'
# Logo Placement Instructions

## Add Your Virtual Tech Box Logo Here

Place your logo files in this directory with these exact names:

### Required Files:
- `logo.png` - Main logo (recommended: 180x50px)
- `logo-white.png` - White version for dark backgrounds  
- `favicon.ico` - Website favicon (32x32px)
- `logo-square.png` - Square version (200x200px)

### Supported Formats:
- PNG (recommended for transparency)
- SVG (vector format, scalable)
- ICO (for favicon)

### Usage in Code:
The application will automatically use these files when present.

### Notes:
- Ensure logos follow your brand guidelines
- Optimize file sizes for web performance
- Test logos on both light and dark backgrounds
- If files are missing, placeholder text will be shown
EOF
    
    print_success "Logo placeholder created"
}

# Function to display final instructions
show_completion_message() {
    echo ""
    print_header "🎉 Virtual Tech Box Setup Complete!"
    echo "=============================================="
    echo ""
    print_success "Installation completed successfully!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Add your logo files to: frontend/public/logo/"
    echo "2. (Optional) Configure Google Sheets integration in .env files"
    echo "3. Start the application:"
    echo ""
    echo "   ${GREEN}npm start${NC}"
    echo ""
    echo "📱 Access Points:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend:  http://localhost:5000"
    echo ""
    echo "📚 Documentation:"
    echo "   - README.md for detailed information"
    echo "   - docs/ folder for guides and API documentation"
    echo ""
    echo "🤝 Need Help?"
    echo "   - GitHub Issues: https://github.com/virtualtechbox/virtual-tech-box/issues"
    echo "   - Documentation: ./docs/"
    echo ""
    print_header "Happy Learning! 🚀"
    echo ""
}

# Main setup function
main() {
    clear
    print_header "🚀 Virtual Tech Box Setup Script"
    print_header "================================="
    echo ""
    
    OS=$(get_os)
    print_status "Detected operating system: $OS"
    
    if [[ "$OS" == "Linux" ]]; then
        DISTRO=$(get_linux_distro)
        print_status "Linux distribution: $DISTRO"
    fi
    
    echo ""
    
    # Check prerequisites and install if needed
    print_header "📦 Installing Prerequisites..."
    
    # Install Git
    install_git
    
    # Check and install Node.js
    if ! check_nodejs_version; then
        case $OS in
            Linux)
                DISTRO=$(get_linux_distro)
                case $DISTRO in
                    ubuntu|debian)
                        install_nodejs_debian
                        ;;
                    centos|rhel|fedora)
                        install_nodejs_redhat
                        ;;
                    *)
                        print_error "Unsupported Linux distribution: $DISTRO"
                        print_error "Please install Node.js 18+ manually from https://nodejs.org"
                        exit 1
                        ;;
                esac
                ;;
            macOS)
                install_nodejs_macos
                ;;
            *)
                print_error "Unsupported operating system: $OS"
                exit 1
                ;;
        esac
        
        # Verify Node.js installation
        if ! check_nodejs_version; then
            print_error "Node.js installation failed"
            exit 1
        fi
    fi
    
    # Install Python for AI/ML modules
    install_python
    
    echo ""
    print_header "🏗️  Setting Up Project..."
    
    # Create project structure
    create_directories
    
    # Setup configuration files
    setup_config
    
    # Install all dependencies
    install_dependencies
    
    # Create logo placeholder
    create_logo_placeholder
    
    # Show completion message
    show_completion_message
}

# Error handling
set -e
trap 'print_error "Setup failed! Check the error messages above and try again."' ERR

# Check if script is being run from project root
if [ ! -f package.json ]; then
    print_error "Please run this script from the Virtual Tech Box project root directory"
    print_error "Make sure you have cloned the repository and are in the correct folder"
    exit 1
fi

# Run main function
main "$@"