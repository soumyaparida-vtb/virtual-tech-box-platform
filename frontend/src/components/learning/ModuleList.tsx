// components/learning/ModuleList.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiClock, FiLock } from 'react-icons/fi';
import { Module } from '../../types/learning';

interface ModuleListProps {
  modules: Module[];
  currentModuleId?: string;
  completedModules: Set<string>;
  onSelectModule: (moduleId: string) => void;
}

const ModuleList: React.FC<ModuleListProps> = ({
  modules,
  currentModuleId,
  completedModules,
  onSelectModule,
}) => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Modules</h2>
      {modules.map((module, index) => {
        const isCompleted = completedModules.has(module.id);
        const isCurrent = module.id === currentModuleId;
        const isLocked = index > 0 && !completedModules.has(modules[index - 1].id);

        return (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <button
              onClick={() => !isLocked && onSelectModule(module.id)}
              disabled={isLocked}
              className={`w-full text-left p-4 rounded-lg transition-all ${
                isCurrent
                  ? 'bg-vtb-accent-blue text-white'
                  : isCompleted
                  ? 'bg-green-50 hover:bg-green-100'
                  : isLocked
                  ? 'bg-gray-50 cursor-not-allowed opacity-60'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">
                      Module {module.order}
                    </span>
                    {isCompleted && (
                      <FiCheck className="text-green-600" />
                    )}
                    {isLocked && (
                      <FiLock className="text-gray-400" />
                    )}
                  </div>
                  <h3 className={`font-semibold mt-1 ${
                    isCurrent ? 'text-white' : 'text-gray-900'
                  }`}>
                    {module.title}
                  </h3>
                  <p className={`text-sm mt-1 ${
                    isCurrent ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {module.description}
                  </p>
                  <div className={`flex items-center mt-2 text-xs ${
                    isCurrent ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    <FiClock className="mr-1" />
                    {module.estimatedMinutes} min
                  </div>
                </div>
              </div>
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ModuleList;