// pages/Registration.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import UserRegistrationForm from '../components/forms/UserRegistrationForm';
import { UserRegistration } from '../types/user';
import { useUser } from '../contexts/UserContext';
import { registerUser } from '../services/api';
import toast from 'react-hot-toast';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegistration = async (data: UserRegistration) => {
    setIsSubmitting(true);
    try {
      const response = await registerUser(data);
      if (response.success && response.data) {
        setUser({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          selectedArea: data.learningArea as any,
        });
        toast.success('Registration successful! Welcome to Virtual Tech Box!');
        navigate(`/learning/${data.learningArea}`);
      } else {
        toast.error(response.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-vtb-primary-blue mb-4">
              Start Your Learning Journey
            </h1>
            <p className="text-xl text-gray-600">
              Register now to access free, interactive courses in cutting-edge technologies
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <UserRegistrationForm
              onSubmit={handleRegistration}
              isSubmitting={isSubmitting}
            />
          </div>

          <div className="mt-8 text-center text-gray-600">
            <p>
              By registering, you agree to our open-source principles and community guidelines.
            </p>
            <p className="mt-2">
              Your information will be stored securely and used only for platform improvements.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Registration;