/**
 * Define un curso después de ser procesado y combinado con el Avance.
 */
export interface Course {
  name: string;
  code: string; // DCCB-00107
  credits: number;
  // Este status se calcula combinando la Malla y el Avance.
  status: "aprobado" | "cursando" | "pendiente" | "futuro" | "reprobado"; 
  prereqCodes: string[]; 
  nivelTeorico: number; 
}

/**
 * Define un semestre (columna en el grid)
 */
export interface Semester {
  id: string; // Ejemplo: "2024-I" o "Verano 2025"
  name: string; // Ejemplo: "I"
  courses: Course[];
}

// Interfaces de la API (Tipos crudos definidos para el futuro)
// Usadas para referencia del mapeo de datos
export interface ApiMallaCourse {
    codigo: string; 
    asignatura: string; 
    creditos: number;
    nivel: number; 
    prereq: string; 
}

export interface ApiAvanceRecord {
    nrc: string;
    period: string;
    student: string;
    course: string; 
    excluded: boolean;
    inscriptionType: string; 
    status: "APROBADO" | "REPROBADO" | "CURSANDO";
}