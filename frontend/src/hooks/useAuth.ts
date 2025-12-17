import { useState } from 'react';
import { authService } from '../services/auth.services';
import type { LoginRequest, RegisterRequest } from '../types/Auth';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al iniciar sesión';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(data);
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al registrarse';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
  };

  return {
    login,
    register,
    logout,
    loading,
    error,
    isAuthenticated: authService.isAuthenticated(),
    currentUser: authService.getCurrentUser(),
  };
};