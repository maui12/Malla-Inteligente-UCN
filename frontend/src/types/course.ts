export interface Course {
  codigo: string;        
  asignatura: string;    
  creditos: number;      
  nivel: number;         
  prereq?: string[];        //vienen como string en el endpoint
}