// pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
// Update the import path below if Button exists elsewhere, for example:
import Button from '../components/ui/Button';
// Or, if the correct path is different, adjust accordingly.
// If the Button component does not exist, create it at the expected path.

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="text-9xl font-bold text-vtb-primary-blue mb-8"
        >
          404
        </motion.div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="primary" icon={<FiHome />}>
              Go to Homepage
            </Button>
          </Link>
          <Link to="/learning-areas">
            <Button variant="outline" icon={<FiArrowLeft />}>
              Browse Learning Areas
            </Button>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Tip:</strong> If you bookmarked this page, the content might have been moved or updated.
            Check out our learning areas to find what you're looking for!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;