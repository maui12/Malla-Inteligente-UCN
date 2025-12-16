export type SemesterPeriod = 'S1' | 'S2' | 'I' | 'V';

export interface CurriculumCourse {
  code: string;                 // Código del ramo (ej: MAT101)
  name: string;                 // Nombre del ramo
  credits: number;              // Créditos SCT / institucionales
  prerequisites: string[];      // Códigos de ramos prerequisito
  recommendedSemester?: number; // Opcional: nivel/semestre ideal (1..10)
  period?: SemesterPeriod;      // Opcional: si solo se dicta en S1/S2/I/V
}
