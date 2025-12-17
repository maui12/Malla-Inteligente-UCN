import apiClient from '../services/api';
import type { Course } from '../types/course';
import type { CourseProgress, CourseStatus, SemesterPeriod } from '../types/CourseProgress';

export interface CurriculumResponse {
  careerCode: string;
  courses: Record<string, Course>; 
}

export const curriculumService = {
  /**
   * Obtener malla curricular por código de carrera
   */
  async fetchCurriculum(careerCode: string): Promise<CurriculumResponse> {
    const response = await apiClient.get<CurriculumResponse>(`/curriculum/${careerCode}`);
    return response.data;
  },

  /**
   * Obtener detalles de un curso específico
   */
  async fetchCourseDetails(courseCode: string): Promise<Course> {
    const response = await apiClient.get<Course>(`/curriculum/course/${courseCode}`);
    return response.data;
  },

  /**
   * Obtener progreso del estudiante autenticado
   */
  async fetchMyProgress(): Promise<CourseProgress[]> {
    const response = await apiClient.get<CourseProgress[]>('/progress/me');
    return response.data;
  },

  /**
   * Obtener progreso de un estudiante específico (solo admin)
   */
  async fetchStudentProgress(studentId: string): Promise<CourseProgress[]> {
    const response = await apiClient.get<CourseProgress[]>(`/progress/student/${studentId}`);
    return response.data;
  },

  /**
   * Agregar progreso a un estudiante (solo admin)
   */
  async addProgress(studentId: string, data: {
    courseCode: string;
    status: CourseStatus;
    year: number;
    period: SemesterPeriod;
  }): Promise<CourseProgress> {
    const response = await apiClient.post<CourseProgress>(
      `/progress/student/${studentId}`,
      data
    );
    return response.data;
  },

  /**
   * Actualizar progreso (solo admin)
   */
  async updateProgress(progressId: string, data: {
    status?: CourseStatus;
    year?: number;
    period?: SemesterPeriod;
  }): Promise<CourseProgress> {
    const response = await apiClient.patch<CourseProgress>(
      `/progress/${progressId}`,
      data
    );
    return response.data;
  },
};

export const fetchCurriculum = curriculumService.fetchCurriculum;
export const fetchCourseDetails = curriculumService.fetchCourseDetails;
export const fetchMyProgress = curriculumService.fetchMyProgress;