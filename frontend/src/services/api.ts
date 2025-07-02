// services/api.ts
import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { ApiResponse } from '../types/api';
import { UserRegistration, User } from '../types/user';
import { Module } from '../types/learning';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('vtb_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('vtb_token');
          localStorage.removeItem('vtb_user');
          window.location.href = '/register';
        }
        return Promise.reject(error);
      }
    );
  }

  // User endpoints
  async registerUser(data: UserRegistration): Promise<ApiResponse<User>> {
    try {
      const response = await this.api.post<ApiResponse<User>>('/users/register', data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: 'Failed to register user. Please try again.',
      };
    }
  }

  // Learning endpoints
  async getModules(learningArea: string): Promise<ApiResponse<Module[]>> {
    try {
      const response = await this.api.get<ApiResponse<Module[]>>(
        `/learning/${learningArea}/modules`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching modules:', error);
      return {
        success: false,
        error: 'Failed to fetch modules. Please try again.',
      };
    }
  }

  async getModuleContent(learningArea: string, moduleId: string): Promise<ApiResponse<Module>> {
    try {
      const response = await this.api.get<ApiResponse<Module>>(
        `/learning/${learningArea}/modules/${moduleId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching module content:', error);
      return {
        success: false,
        error: 'Failed to fetch module content. Please try again.',
      };
    }
  }

  // Progress endpoints
  async updateProgress(learningArea: string, moduleId: string): Promise<ApiResponse<void>> {
    try {
      const response = await this.api.post<ApiResponse<void>>('/progress/update', {
        learningArea,
        moduleId,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating progress:', error);
      return {
        success: false,
        error: 'Failed to update progress.',
      };
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.api.get('/health');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}

const apiService = new ApiService();

export const registerUser = apiService.registerUser.bind(apiService);
export const getModules = apiService.getModules.bind(apiService);
export const getModuleContent = apiService.getModuleContent.bind(apiService);
export const updateProgress = apiService.updateProgress.bind(apiService);
export const healthCheck = apiService.healthCheck.bind(apiService);

export default apiService;