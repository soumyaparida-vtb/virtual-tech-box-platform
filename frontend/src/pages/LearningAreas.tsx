// pages/LearningAreas.tsx
import React from 'react';
import { motion } from 'framer-motion';
import LearningAreaGrid from '../components/learning/LearningAreaGrid';
import { useUser } from '../contexts/UserContext';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const LearningAreas: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-vtb-primary-blue mb-4">
              Choose Your Learning Path
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the technology area you want to master. Each path includes hands-on projects,
              real-world scenarios, and industry best practices.
            </p>
          </div>

          {user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-vtb-accent-blue text-white p-4 rounded-lg mb-8 max-w-2xl mx-auto text-center"
            >
              <p className="flex items-center justify-center">
                Welcome back, {user.name}! Continue your {user.selectedArea} journey
                <Link
                  to={`/learning/${user.selectedArea}`}
                  className="ml-2 inline-flex items-center hover:underline"
                >
                  <FiArrowRight className="ml-1" />
                </Link>
              </p>
            </motion.div>
          )}

          <LearningAreaGrid />
        </motion.div>
      </div>
    </div>
  );
};

export default LearningAreas;