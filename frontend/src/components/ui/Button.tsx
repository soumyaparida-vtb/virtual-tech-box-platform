// components/ui/Button.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

interface ButtonProps extends React.ComponentPropsWithoutRef<typeof motion.button> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-vtb-primary-blue text-white hover:bg-blue-700 focus:ring-vtb-primary-blue',
    secondary: 'bg-vtb-accent-blue text-white hover:bg-blue-600 focus:ring-vtb-accent-blue',
    success: 'bg-vtb-primary-green text-white hover:bg-green-700 focus:ring-vtb-primary-green',
    warning: 'bg-vtb-accent-orange text-white hover:bg-orange-600 focus:ring-vtb-accent-orange',
    danger: 'bg-vtb-accent-red text-white hover:bg-red-600 focus:ring-vtb-accent-red',
    outline: 'border-2 border-vtb-primary-blue text-vtb-primary-blue hover:bg-vtb-primary-blue hover:text-white focus:ring-vtb-primary-blue',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <FiLoader className="animate-spin mr-2" />
      ) : icon && iconPosition === 'left' ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
      {!isLoading && icon && iconPosition === 'right' ? (
        <span className="ml-2">{icon}</span>
      ) : null}
    </motion.button>
  );
};

export default Button;