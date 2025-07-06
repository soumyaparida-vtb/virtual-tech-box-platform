// components/learning/InteractiveLesson.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiRotateCw, FiCheck, FiX } from 'react-icons/fi';
import { Lesson } from '../../types/learning';
import Button from '../ui/Button';

interface InteractiveLessonProps {
  lesson: Lesson;
}

const InteractiveLesson: React.FC<InteractiveLessonProps> = ({ lesson }) => {
  const [code, setCode] = useState(getInitialCode());
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('');
    setTestResults([]);

    // Simulate code execution
    setTimeout(() => {
      const results = runTests(code);
      setTestResults(results);
      setOutput(generateOutput(results));
      setIsRunning(false);
    }, 1500);
  };

  const handleReset = () => {
    setCode(getInitialCode());
    setOutput('');
    setTestResults([]);
  };

  const allTestsPassed = testResults.length > 0 && testResults.every(test => test.passed);

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Challenge</h3>
        <p className="text-gray-700">{getChallengeDescription()}</p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="font-semibold text-gray-900">Code Editor</label>
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            icon={<FiRotateCw />}
          >
            Reset
          </Button>
        </div>
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-gray-100 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-vtb-accent-blue"
            spellCheck={false}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={handleRunCode}
          variant="primary"
          icon={<FiPlay />}
          isLoading={isRunning}
          disabled={isRunning}
        >
          {isRunning ? 'Running...' : 'Run Code'}
        </Button>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h3 className="font-semibold text-gray-900">Test Results</h3>
          {testResults.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg flex items-start ${
                test.passed ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className="mr-3 mt-0.5">
                {test.passed ? (
                  <FiCheck className="text-green-600 text-xl" />
                ) : (
                  <FiX className="text-red-600 text-xl" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${
                  test.passed ? 'text-green-900' : 'text-red-900'
                }`}>
                  {test.name}
                </p>
                <p className={`text-sm mt-1 ${
                  test.passed ? 'text-green-700' : 'text-red-700'
                }`}>
                  {test.message}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Output Console */}
      {output && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-semibold text-gray-900 mb-2">Console Output</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
            <pre>{output}</pre>
          </div>
        </motion.div>
      )}

      {/* Success Message */}
      {allTestsPassed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-100 border-2 border-green-300 rounded-lg p-6 text-center"
        >
          <FiCheck className="text-5xl text-green-600 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-green-900 mb-2">
            Excellent Work! 🎉
          </h3>
          <p className="text-green-700">
            You've successfully completed this challenge. Great job!
          </p>
        </motion.div>
      )}

      {/* Hints Section */}
      <details className="bg-blue-50 rounded-lg p-4">
        <summary className="font-semibold text-vtb-primary-blue cursor-pointer">
          Need a hint?
        </summary>
        <div className="mt-3 space-y-2">
          {getHints().map((hint, index) => (
            <p key={index} className="text-gray-700 text-sm">
              💡 {hint}
            </p>
          ))}
        </div>
      </details>
    </div>
  );
};

// Helper types and functions
interface TestResult {
  name: string;
  passed: boolean;
  message: string;
}

const getInitialCode = (): string => {
  return `# Write your solution here
def solution():
    # Your code goes here
    pass

# Test your solution
solution()`;
};

const getChallengeDescription = (): string => {
  return 'Complete the function to solve the given problem. Make sure all test cases pass!';
};

const runTests = (code: string): TestResult[] => {
  // Simulate test execution
  const hasCorrectSyntax = !code.includes('pass');
  const hasImplementation = code.length > 100;

  return [
    {
      name: 'Syntax Check',
      passed: true,
      message: 'Code syntax is valid',
    },
    {
      name: 'Implementation Check',
      passed: hasImplementation,
      message: hasImplementation
        ? 'Function is implemented'
        : 'Function needs to be implemented',
    },
    {
      name: 'Test Case 1',
      passed: hasCorrectSyntax && hasImplementation,
      message: hasCorrectSyntax && hasImplementation
        ? 'Expected output matches'
        : 'Output does not match expected result',
    },
  ];
};

const generateOutput = (results: TestResult[]): string => {
  const passed = results.filter(r => r.passed).length;
  return `Running tests...
${results.map(r => `${r.passed ? '✓' : '✗'} ${r.name}`).join('\n')}

Tests passed: ${passed}/${results.length}
${passed === results.length ? '\nAll tests passed! Great job!' : '\nSome tests failed. Keep trying!'}`;
};

const getHints = (): string[] => {
  return [
    'Think about the problem step by step',
    'Consider edge cases in your solution',
    'Make sure your code handles all test cases',
    'Review the lesson content if you need a refresher',
  ];
};

export default InteractiveLesson;