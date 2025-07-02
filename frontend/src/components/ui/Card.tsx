// components/ui/Card.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
  padding = 'md',
  shadow = 'md',
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const hoverClass = hover ? 'hover:shadow-xl transition-shadow duration-300 cursor-pointer' : '';

  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      onClick={onClick}
      className={`bg-white rounded-xl ${paddingClasses[padding]} ${shadowClasses[shadow]} ${hoverClass} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;