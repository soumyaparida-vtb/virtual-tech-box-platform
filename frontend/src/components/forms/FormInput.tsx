// components/forms/FormInput.tsx
import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  register: UseFormRegister<any>;
  rules?: any;
  error?: FieldError;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  icon,
  register,
  rules,
  error,
  className = '',
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {icon && <span className="inline mr-2">{icon}</span>}
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-vtb-accent-blue focus:border-transparent transition-all ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default FormInput;