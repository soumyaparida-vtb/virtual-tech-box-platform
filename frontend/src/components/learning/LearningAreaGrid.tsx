// components/learning/LearningAreaGrid.tsx
import React from 'react';
import { motion } from 'framer-motion';
import LearningAreaCard from './LearningAreaCard';
import { LEARNING_AREAS } from '../../utils/constants';

const LearningAreaGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.values(LEARNING_AREAS).map((area, index) => (
        <motion.div
          key={area.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <LearningAreaCard area={area} />
        </motion.div>
      ))}
    </div>
  );
};

export default LearningAreaGrid;