# Virtual Tech Box Learning Platform

An open-source, interactive learning platform for DevOps, DevSecOps, Data Engineering, Full Stack Development, and AI/ML. Built with React, FastAPI, and Docker.

![Virtual Tech Box](https://img.shields.io/badge/Virtual%20Tech%20Box-Learning%20Platform-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

## 🚀 Features

- **Interactive Learning Paths**: Five comprehensive technology tracks
- **Hands-on Exercises**: Interactive coding challenges and practical examples
- **Progress Tracking**: Monitor your learning journey
- **Google Sheets Integration**: Automated user registration tracking
- **Fully Containerized**: Easy deployment with Docker
- **Open Source**: Free forever, community-driven

## 🛠️ Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation

### Backend
- FastAPI (Python)
- Google Sheets API integration
- Async/await architecture
- Pydantic for data validation

### Infrastructure
- Docker & Docker Compose
- Nginx for production serving
- Cross-platform setup scripts

## 📋 Prerequisites

- Docker Desktop installed
- Docker Compose installed
- Git
- (Optional) Google Cloud service account for Sheets integration

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/VirtualTechBox/learning-platform.git
cd learning-platform
```

### 2. Run Setup Script

#### Linux/macOS:
```bash
chmod +x scripts/setup-linux.sh
./scripts/setup-linux.sh
```

#### Windows:
```cmd
scripts\setup-windows.bat
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/api/v1/docs

## 🔧 Configuration

### Google Sheets Integration (Optional)

1. Create a Google Cloud Project
2. Enable Google Sheets API
3. Create a service account and download the JSON key
4. Place the key at: `backend/credentials/google-sheets-key.json`
5. Create a Google Sheet and copy its ID
6. Update `.env` file:
   ```
   GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id-here
   ```

### Environment Variables

Create `.env` files based on the examples:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## 📚 Learning Paths

1. **DevOps** 🚀
   - Docker & Kubernetes
   - CI/CD Pipelines
   - Infrastructure as Code
   - Cloud Platforms

2. **DevSecOps** 🔒
   - Security Scanning
   - Container Security
   - Compliance Automation
   - Threat Modeling

3. **Data Engineering** 📊
   - Apache Spark
   - Data Pipelines
   - ETL/ELT Processes
   - Big Data Technologies

4. **Full Stack Development** 💻
   - React & Node.js
   - TypeScript
   - REST & GraphQL APIs
   - Database Design

5. **AI/ML Engineering** 🤖
   - Machine Learning Fundamentals
   - Deep Learning
   - MLOps
   - Model Deployment

## 🏗️ Project Structure

```
virtual-tech-box-learning-platform/
├── frontend/                # React TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript types
│   └── Dockerfile
├── backend/                # FastAPI backend
│   ├── app/
│   │   ├── api/           # API endpoints
│   │   ├── core/          # Core configurations
│   │   ├── models/        # Data models
│   │   └── services/      # Business logic
│   └── Dockerfile
├── scripts/               # Setup scripts
├── docker-compose.yml     # Docker orchestration
└── README.md
```

## 🔨 Development

### Running in Development Mode

```bash
# Start services with live reload
docker-compose up

# Rebuild after major changes
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Adding Content

Place learning content in JSON format:
```
backend/content/modules/{learning-area}/module-{number}.json
```

Example module structure:
```json
{
  "id": "devops-docker",
  "title": "Docker Fundamentals",
  "description": "Learn containerization with Docker",
  "order": 1,
  "estimatedMinutes": 45,
  "lessons": [
    {
      "id": "docker-intro",
      "title": "Introduction to Docker",
      "type": "text",
      "content": "# Docker Introduction\n\n..."
    }
  ]
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Virtual Tech Box community
- All contributors and learners
- Open source projects that made this possible

## 📞 Support

- Create an issue for bug reports or feature requests
- Join our community discussions
- Email: support@virtualtechbox.com

## 🚦 Status

- ![Backend](https://img.shields.io/badge/Backend-Ready-green)
- ![Frontend](https://img.shields.io/badge/Frontend-Ready-green)
- ![Docker](https://img.shields.io/badge/Docker-Ready-green)
- ![Documentation](https://img.shields.io/badge/Docs-Complete-green)

---

Made with ❤️ by Virtual Tech Box Community