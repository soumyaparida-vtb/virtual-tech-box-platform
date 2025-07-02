// types/learning.ts
export type LearningArea = 'devops' | 'devsecops' | 'data-engineering' | 'fullstack' | 'ai-ml';

export interface LearningAreaInfo {
  id: LearningArea;
  title: string;
  description: string;
  color: string;
  icon: string;
  moduleCount: number;
  estimatedHours: number;
  skills: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  estimatedMinutes: number;
  lessons: Lesson[];
  quiz?: Quiz;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'text' | 'video' | 'interactive' | 'code';
  content: string;
  codeExamples?: CodeExample[];
  resources?: Resource[];
}

export interface CodeExample {
  language: string;
  code: string;
  title?: string;
  description?: string;
}

export interface Resource {
  title: string;
  url: string;
  type: 'documentation' | 'video' | 'article' | 'github';
}

export interface Quiz {
  id: string;
  questions: Question[];
  passingScore: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Progress {
  userId: string;
  learningArea: LearningArea;
  completedModules: string[];
  currentModule?: string;
  quizScores: Record<string, number>;
  lastAccessedAt: string;
}