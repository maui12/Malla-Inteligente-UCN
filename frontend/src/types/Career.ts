import type { Course } from "./Course";

export interface Career {
  codigo: string;     // "8266"
  nombre: string;     // "ITI"
  courses: Record<string, Course>;
  catalogo: string;   // "202410"
}