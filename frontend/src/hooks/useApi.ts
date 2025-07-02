// hooks/useApi.ts
import { useState, useCallback } from 'react';
import { ApiResponse } from '../types/api';
import toast from 'react-hot-toast';

interface UseApiOptions {
  showError?: boolean;
  showSuccess?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export function useApi<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(
    async (
      apiCall: () => Promise<ApiResponse<T>>,
      options: UseApiOptions = {}
    ) => {
      const {
        showError = true,
        showSuccess = false,
        successMessage = 'Success!',
        errorMessage = 'An error occurred',
      } = options;

      setLoading(true);
      setError(null);

      try {
        const response = await apiCall();
        
        if (response.success && response.data) {
          setData(response.data);
          if (showSuccess) {
            toast.success(response.message || successMessage);
          }
          return response.data;
        } else {
          const error = response.error || errorMessage;
          setError(error);
          if (showError) {
            toast.error(error);
          }
          return null;
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : errorMessage;
        setError(errorMsg);
        if (showError) {
          toast.error(errorMsg);
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    loading,
    error,
    data,
    execute,
    reset,
  };
}