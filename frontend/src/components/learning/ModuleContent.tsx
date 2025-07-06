// components/learning/ModuleContent.tsx
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiCode, FiFileText, FiCheckCircle } from 'react-icons/fi';
import { Module, Lesson } from '../../types/learning';
import Button from '../ui/Button';
import InteractiveLesson from './InteractiveLesson';

interface ModuleContentProps {
  module: Module;
  onComplete: () => void;
  isCompleted: boolean;
}

const ModuleContent: React.FC<ModuleContentProps> = ({
  module,
  onComplete,
}) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  // Use mock lessons if module doesn't have lessons
  const lessons = module.lessons.length > 0 ? module.lessons : getMockLessons(module.id);
  const currentLesson = lessons[currentLessonIndex];

  const handleLessonComplete = () => {
    if (!currentLesson) return;

    const newCompletedLessons = new Set(completedLessons);
    newCompletedLessons.add(currentLesson.id);
    setCompletedLessons(newCompletedLessons);

    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else if (newCompletedLessons.size === lessons.length) {
      onComplete();
    }
  };

  const getLessonIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'video':
        return <FiPlay />;
      case 'code':
        return <FiCode />;
      case 'interactive':
        return <FiCheckCircle />;
      default:
        return <FiFileText />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Module Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-vtb-primary-blue mb-2">
          {module.title}
        </h1>
        <p className="text-lg text-gray-600">{module.description}</p>
      </div>

      {/* Lesson Tabs */}
      <div className="border-b mb-6">
        <div className="flex space-x-6 overflow-x-auto">
          {lessons.map((lesson, index) => (
            <button
              key={lesson.id}
              onClick={() => setCurrentLessonIndex(index)}
              className={`pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
                index === currentLessonIndex
                  ? 'border-vtb-accent-blue text-vtb-accent-blue'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center">
                <span className="mr-2">{getLessonIcon(lesson.type)}</span>
                {lesson.title}
                {completedLessons.has(lesson.id) && (
                  <FiCheckCircle className="ml-2 text-green-600" />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Content */}
      <AnimatePresence mode="wait">
        {currentLesson && (
          <motion.div
            key={currentLesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              {getLessonIcon(currentLesson.type)}
              <span className="ml-2">{currentLesson.title}</span>
            </h2>

            {currentLesson.type === 'interactive' ? (
              <InteractiveLesson lesson={currentLesson} />
            ) : (
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    code({ className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return match ? (
                        <SyntaxHighlighter
                          style={atomDark as any}
                          language={match[1]}
                          PreTag="div"
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {currentLesson.content}
                </ReactMarkdown>
              </div>
            )}

            {/* Code Examples */}
            {currentLesson.codeExamples && currentLesson.codeExamples.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Code Examples</h3>
                {currentLesson.codeExamples.map((example, index) => (
                  <div key={index} className="mb-6">
                    {example.title && (
                      <h4 className="text-lg font-medium mb-2">{example.title}</h4>
                    )}
                    {example.description && (
                      <p className="text-gray-600 mb-3">{example.description}</p>
                    )}
                    <SyntaxHighlighter
                      style={atomDark}
                      language={example.language}
                      PreTag="div"
                    >
                      {example.code}
                    </SyntaxHighlighter>
                  </div>
                ))}
              </div>
            )}

            {/* Resources */}
            {currentLesson.resources && currentLesson.resources.length > 0 && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Additional Resources</h3>
                <ul className="space-y-2">
                  {currentLesson.resources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-vtb-accent-blue hover:text-vtb-secondary-blue flex items-center"
                      >
                        {resource.title}
                        <span className="ml-2 text-xs text-gray-500">
                          ({resource.type})
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Lesson Navigation */}
            <div className="mt-8 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Lesson {currentLessonIndex + 1} of {lessons.length}
              </div>
              <Button
                onClick={handleLessonComplete}
                variant={completedLessons.has(currentLesson.id) ? 'success' : 'primary'}
                disabled={completedLessons.has(currentLesson.id)}
              >
                {completedLessons.has(currentLesson.id)
                  ? 'Completed'
                  : currentLessonIndex === lessons.length - 1
                  ? 'Complete Module'
                  : 'Complete & Next'}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Module Progress */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Module Progress</span>
          <span className="text-sm text-gray-600">
            {completedLessons.size} / {lessons.length} lessons completed
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{
              width: `${(completedLessons.size / lessons.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Mock lessons generator
const getMockLessons = (moduleId: string): Lesson[] => {
  return [
    {
      id: `${moduleId}-lesson-1`,
      title: 'Introduction',
      type: 'text',
      content: `# Welcome to this module!

This lesson introduces the core concepts you'll be learning. We'll cover:

- Key terminology and definitions
- Why this topic is important
- What you'll be able to do after completing this module

## Getting Started

Let's begin by understanding the fundamentals...`,
    },
    {
      id: `${moduleId}-lesson-2`,
      title: 'Hands-on Practice',
      type: 'interactive',
      content: 'Interactive coding exercise',
    },
    {
      id: `${moduleId}-lesson-3`,
      title: 'Advanced Concepts',
      type: 'code',
      content: `# Advanced Concepts

Now that we've covered the basics, let's dive into more advanced topics...`,
      codeExamples: [
        {
          language: 'python',
          code: `def example_function():
    """This is an example function"""
    return "Hello, Virtual Tech Box!"`,
          title: 'Example Code',
          description: 'A simple example to demonstrate the concept',
        },
      ],
    },
  ];
};

export default ModuleContent;