export interface Course {
  codigo: string;        
  asignatura: string;    
  creditos: number;      
  nivel: number;         
  prereq?: string[];     
  status?: "APROBADO" | "REPROBADO" | "PENDIENTE" | "CURSANDO"; 
  period?: string | null;
  nrc?: string | null;
}