// components/learning/LearningAreaCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiBookOpen, FiArrowRight } from 'react-icons/fi';
import { LearningAreaInfo } from '../../types/learning';
import Card from '../ui/Card';

interface LearningAreaCardProps {
  area: LearningAreaInfo;
}

const LearningAreaCard: React.FC<LearningAreaCardProps> = ({ area }) => {
  const colorClasses: Record<string, string> = {
    'vtb-accent-blue': 'bg-vtb-accent-blue',
    'vtb-dark-green': 'bg-vtb-dark-green',
    'vtb-accent-orange': 'bg-vtb-accent-orange',
    'vtb-accent-red': 'bg-vtb-accent-red',
    'vtb-accent-pink': 'bg-vtb-accent-pink',
  };

  return (
    <Link to={`/learning/${area.id}`}>
      <Card hover className="h-full relative overflow-hidden group">
        <div className={`absolute top-0 left-0 right-0 h-1 ${colorClasses[area.color]}`} />
        
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{area.icon}</div>
          <FiArrowRight className="text-gray-400 group-hover:text-vtb-primary-blue transition-colors" />
        </div>

        <h3 className="text-2xl font-bold text-vtb-primary-blue mb-3">
          {area.title}
        </h3>
        
        <p className="text-gray-600 mb-6 line-clamp-2">
          {area.description}
        </p>

        <div className="flex items-center text-sm text-gray-500 space-x-4 mb-6">
          <div className="flex items-center">
            <FiBookOpen className="mr-1" />
            <span>{area.moduleCount} modules</span>
          </div>
          <div className="flex items-center">
            <FiClock className="mr-1" />
            <span>{area.estimatedHours} hours</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">You'll learn:</p>
          <div className="flex flex-wrap gap-2">
            {area.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
            {area.skills.length > 3 && (
              <span className="text-xs text-gray-500 py-1">
                +{area.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default LearningAreaCard;