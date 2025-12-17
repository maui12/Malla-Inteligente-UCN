import type { Course } from "./course";

export interface Career {
  codigo: string;
  nombre: string;
  catalogo: number;
}

export interface CurriculumResponse {
  careerCode: string;
  courses: Map<string, Course>;
}