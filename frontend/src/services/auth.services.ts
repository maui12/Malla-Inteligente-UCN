import apiClient from './api';
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '../types/Auth';

class AuthService {
  // Login
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    
    // Guardar token y usuario en localStorage
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  }

  // Register
  async register(data: RegisterRequest): Promise<{ message: string; student: User }> {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  }

  // Logout
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Obtener usuario actual
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Verificar token
  async verifyToken(): Promise<boolean> {
    try {
      await apiClient.get('/auth/verify'); //crear endpoint
      return true;
    } catch {
      return false;
    }
  }
}

export const authService = new AuthService();