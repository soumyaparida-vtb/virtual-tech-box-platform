// pages/LearningModule.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiCheck, FiClock, FiBookOpen } from 'react-icons/fi';
import ModuleList from '../components/learning/ModuleList';
import ModuleContent from '../components/learning/ModuleContent';
import { Module } from '../types/learning';
import { getModules, getModuleContent, updateProgress } from '../services/api';
import { LEARNING_AREAS } from '../utils/constants';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const LearningModule: React.FC = () => {
  const { area, moduleId } = useParams<{ area: string; moduleId?: string }>();
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>([]);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const areaInfo = area ? LEARNING_AREAS[area] : null;

  useEffect(() => {
    if (area) {
      fetchModules();
    }
  }, [area]);

  useEffect(() => {
    if (moduleId && modules.length > 0) {
      fetchModuleContent(moduleId);
    } else if (modules.length > 0 && !moduleId) {
      // Navigate to first module if no module specified
      navigate(`/learning/${area}/module/${modules[0].id}`, { replace: true });
    }
  }, [moduleId, modules, area, navigate]);

  const fetchModules = async () => {
    setLoading(true);
    try {
      const response = await getModules(area!);
      if (response.success && response.data) {
        setModules(response.data);
      } else {
        // Use mock data for demo
        setModules(getMockModules(area!));
      }
    } catch (error) {
      console.error('Error fetching modules:', error);
      // Use mock data as fallback
      setModules(getMockModules(area!));
    } finally {
      setLoading(false);
    }
  };

  const fetchModuleContent = async (modId: string) => {
    const module = modules.find(m => m.id === modId);
    if (module) {
      setCurrentModule(module);
    }
  };

  const handleModuleComplete = async () => {
    if (!currentModule) return;

    const newCompletedModules = new Set(completedModules);
    newCompletedModules.add(currentModule.id);
    setCompletedModules(newCompletedModules);

    try {
      await updateProgress(area!, currentModule.id);
      toast.success('Module completed! Great job! 🎉');
    } catch (error) {
      console.error('Error updating progress:', error);
    }

    // Navigate to next module
    const currentIndex = modules.findIndex(m => m.id === currentModule.id);
    if (currentIndex < modules.length - 1) {
      const nextModule = modules[currentIndex + 1];
      navigate(`/learning/${area}/module/${nextModule.id}`);
    } else {
      toast.success('Congratulations! You\'ve completed all modules in this learning path! 🏆');
    }
  };

  const navigateModule = (direction: 'prev' | 'next') => {
    if (!currentModule) return;

    const currentIndex = modules.findIndex(m => m.id === currentModule.id);
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex >= 0 && newIndex < modules.length) {
      navigate(`/learning/${area}/module/${modules[newIndex].id}`);
    }
  };

  if (!areaInfo) {
    navigate('/404');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  const currentModuleIndex = currentModule ? modules.findIndex(m => m.id === currentModule.id) : -1;
  const progress = modules.length > 0 ? (completedModules.size / modules.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/learning-areas')}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiChevronLeft className="text-2xl" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-vtb-primary-blue flex items-center">
                  <span className="text-3xl mr-2">{areaInfo.icon}</span>
                  {areaInfo.title}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {completedModules.size} of {modules.length} modules completed
                </p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <FiBookOpen className="text-2xl" />
            </button>
          </div>
          <div className="mt-4">
            <div className="progress-bar">
              <div 
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white border-r overflow-hidden`}>
          <div className="p-4 h-full overflow-y-auto">
            <ModuleList
              modules={modules}
              currentModuleId={currentModule?.id}
              completedModules={completedModules}
              onSelectModule={(moduleId) => navigate(`/learning/${area}/module/${moduleId}`)}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {currentModule ? (
            <motion.div
              key={currentModule.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ModuleContent
                module={currentModule}
                onComplete={handleModuleComplete}
                isCompleted={completedModules.has(currentModule.id)}
              />

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-8 border-t">
                <Button
                  variant="outline"
                  onClick={() => navigateModule('prev')}
                  disabled={currentModuleIndex === 0}
                  icon={<FiChevronLeft />}
                >
                  Previous Module
                </Button>

                {currentModuleIndex < modules.length - 1 ? (
                  <Button
                    variant="primary"
                    onClick={() => navigateModule('next')}
                    icon={<FiChevronRight />}
                    iconPosition="right"
                  >
                    Next Module
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => navigate('/learning-areas')}
                    icon={<FiCheck />}
                  >
                    Complete Course
                  </Button>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Select a module to begin learning</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Mock data generator for demo purposes
const getMockModules = (area: string): Module[] => {
  const baseModules: Record<string, Module[]> = {
    'devops': [
      {
        id: 'devops-1',
        title: 'Introduction to DevOps',
        description: 'Learn the fundamentals of DevOps culture and practices',
        order: 1,
        estimatedMinutes: 30,
        lessons: [],
      },
      {
        id: 'devops-2',
        title: 'Version Control with Git',
        description: 'Master Git for collaborative development',
        order: 2,
        estimatedMinutes: 45,
        lessons: [],
      },
      {
        id: 'devops-3',
        title: 'CI/CD Pipelines',
        description: 'Build automated deployment pipelines',
        order: 3,
        estimatedMinutes: 60,
        lessons: [],
      },
    ],
    // Add more mock modules for other areas...
  };

  return baseModules[area] || [];
};

export default LearningModule