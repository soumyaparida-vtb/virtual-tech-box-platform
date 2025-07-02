# Contributing to Virtual Tech Box Learning Platform

First off, thank you for considering contributing to Virtual Tech Box! It's people like you that make this platform a great tool for learning.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed**
- **Explain which behavior you expected to see instead**
- **Include screenshots if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### Adding Learning Content

We welcome contributions of new learning modules! To add content:

1. Create a new JSON file in the appropriate directory:
   ```
   backend/content/modules/{learning-area}/module-{number}-{topic}.json
   ```

2. Follow the module structure:
   ```json
   {
     "id": "area-topic",
     "title": "Module Title",
     "description": "Brief description",
     "order": 1,
     "estimatedMinutes": 30,
     "lessons": [...],
     "quiz": {...}
   }
   ```

3. Ensure content is:
   - Accurate and up-to-date
   - Well-structured and easy to follow
   - Includes practical examples
   - Has a quiz for knowledge check

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Setup

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/your-username/virtual-tech-box-learning-platform.git
   cd virtual-tech-box-learning-platform
   ```

2. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. Set up the development environment:
   ```bash
   # Copy environment files
   cp .env.example .env
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   
   # Run the setup script
   ./scripts/setup-linux.sh  # or appropriate script for your OS
   ```

4. Make your changes and test:
   ```bash
   # Rebuild and restart containers
   docker-compose up --build
   
   # Run frontend separately for hot reload
   cd frontend
   npm install
   npm run dev
   
   # Run backend separately for hot reload
   cd backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

## Style Guidelines

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### JavaScript/TypeScript Style Guide

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable names
- Add comments for complex logic
- Use functional components with hooks for React

### Python Style Guide

- Follow PEP 8
- Use type hints where possible
- Write docstrings for all functions
- Keep functions small and focused
- Use meaningful variable names

### Documentation Style Guide

- Use Markdown for documentation
- Include code examples where relevant
- Keep language clear and concise
- Update README.md if needed

## Project Structure

```
├── frontend/          # React TypeScript frontend
├── backend/           # FastAPI backend
├── scripts/           # Setup and utility scripts
├── docs/              # Additional documentation
└── docker-compose.yml # Docker orchestration
```

## Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
pytest
```

### End-to-End Testing
```bash
# Run the full stack
docker-compose up
# Then run E2E tests
npm run test:e2e
```

## Community

- Join our [Discord server](https://discord.gg/virtualtechbox)
- Follow us on [Twitter](https://twitter.com/virtualtechbox)
- Read our [blog](https://lms.virtualtechbox.com/blog)

## Recognition

Contributors who submit accepted pull requests will be added to our [Contributors list](CONTRIBUTORS.md).

## Questions?

Feel free to create an issue with the label "question" or reach out to the maintainers directly.

Thank you for contributing! 🎉