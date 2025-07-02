// components/forms/UserRegistrationForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiBookOpen } from 'react-icons/fi';
import { UserRegistration } from '../../types/user';
import { LEARNING_AREAS } from '../../utils/constants';
import { validateEmail, validatePhone } from '../../utils/helpers';
import FormInput from './FormInput';
import Button from '../ui/Button';

interface UserRegistrationFormProps {
  onSubmit: (data: UserRegistration) => void;
  isSubmitting?: boolean;
}

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
  onSubmit,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserRegistration>();

  const selectedArea = watch('learningArea');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormInput
        label="Full Name"
        name="name"
        type="text"
        placeholder="Enter your full name"
        icon={<FiUser />}
        register={register}
        rules={{
          required: 'Name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters',
          },
        }}
        error={errors.name}
      />

      <FormInput
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter your email"
        icon={<FiMail />}
        register={register}
        rules={{
          required: 'Email is required',
          validate: (value: string) => validateEmail(value) || 'Invalid email address',
        }}
        error={errors.email}
      />

      <FormInput
        label="Phone Number"
        name="phoneNumber"
        type="tel"
        placeholder="Enter your phone number"
        icon={<FiPhone />}
        register={register}
        rules={{
          required: 'Phone number is required',
          validate: (value: string) => validatePhone(value) || 'Invalid phone number',
        }}
        error={errors.phoneNumber}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          <FiBookOpen className="inline mr-2" />
          Choose Your Learning Area
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.values(LEARNING_AREAS).map((area) => (
            <motion.label
              key={area.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedArea === area.id
                  ? 'border-vtb-accent-blue bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                value={area.id}
                {...register('learningArea', {
                  required: 'Please select a learning area',
                })}
                className="sr-only"
              />
              <div className="flex items-center flex-1">
                <span className="text-2xl mr-3">{area.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900">{area.title}</p>
                  <p className="text-xs text-gray-500">
                    {area.moduleCount} modules
                  </p>
                </div>
              </div>
              {selectedArea === area.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 bg-vtb-accent-blue rounded-full flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.label>
          ))}
        </div>
        {errors.learningArea && (
          <p className="text-sm text-red-600 mt-1">{errors.learningArea.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isSubmitting}
      >
        {isSubmitting ? 'Registering...' : 'Start Learning'}
      </Button>
    </form>
  );
};

export default UserRegistrationForm;