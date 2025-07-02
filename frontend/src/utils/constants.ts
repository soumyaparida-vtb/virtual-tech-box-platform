// utils/constants.ts
import { LearningAreaInfo } from '../types/learning';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const LEARNING_AREAS: Record<string, LearningAreaInfo> = {
  'devops': {
    id: 'devops',
    title: 'DevOps',
    description: 'Master CI/CD, containerization, orchestration, and infrastructure as code',
    color: 'vtb-accent-blue',
    icon: '🚀',
    moduleCount: 15,
    estimatedHours: 40,
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'AWS/Azure/GCP', 'Monitoring']
  },
  'devsecops': {
    id: 'devsecops',
    title: 'DevSecOps',
    description: 'Integrate security practices into your DevOps pipeline and workflows',
    color: 'vtb-dark-green',
    icon: '🔒',
    moduleCount: 12,
    estimatedHours: 35,
    skills: ['Security Scanning', 'SAST/DAST', 'Container Security', 'Compliance', 'Threat Modeling']
  },
  'data-engineering': {
    id: 'data-engineering',
    title: 'Data Engineering',
    description: 'Build scalable data pipelines and work with big data technologies',
    color: 'vtb-accent-orange',
    icon: '📊',
    moduleCount: 18,
    estimatedHours: 50,
    skills: ['Apache Spark', 'Airflow', 'Data Lakes', 'ETL/ELT', 'SQL/NoSQL', 'Stream Processing']
  },
  'fullstack': {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'Develop end-to-end applications with modern web technologies',
    color: 'vtb-accent-red',
    icon: '💻',
    moduleCount: 20,
    estimatedHours: 60,
    skills: ['React', 'Node.js', 'TypeScript', 'REST/GraphQL', 'Databases', 'Cloud Deployment']
  },
  'ai-ml': {
    id: 'ai-ml',
    title: 'AI/ML Engineering',
    description: 'Explore machine learning, deep learning, and artificial intelligence',
    color: 'vtb-accent-pink',
    icon: '🤖',
    moduleCount: 16,
    estimatedHours: 45,
    skills: ['Python', 'TensorFlow/PyTorch', 'MLOps', 'Computer Vision', 'NLP', 'Model Deployment']
  }
};