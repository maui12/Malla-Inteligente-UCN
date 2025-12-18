import type { Career } from "./Career";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  careerCode: string;
  yearOfAdmission?: number;
  curriculumCatalogYear?: number;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'student' | 'admin';
    careerCode?: string;
    yearOfAdmission?: number;
    curriculumCatalogYear?: number;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  rut: string;        
  carreras: Career[];
  careerCode?: string;
  yearOfAdmission?: number;
  curriculumCatalogYear?: number;
}