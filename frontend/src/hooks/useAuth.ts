// hooks/useAuth.ts
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface UseAuthOptions {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

export const useAuth = (options: UseAuthOptions = {}) => {
  const { user } = useUser();
  const isLoading = user === undefined || user === null;
  const navigate = useNavigate();
  const { redirectTo = '/register', redirectIfFound = false } = options;

  useEffect(() => {
    if (!isLoading) {
      if (!user && !redirectIfFound) {
        navigate(redirectTo);
      } else if (user && redirectIfFound) {
        navigate(redirectTo);
      }
    }
  }, [user, isLoading, redirectTo, redirectIfFound, navigate]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
};