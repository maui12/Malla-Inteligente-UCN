import type { Career } from './Career'

export interface Student {
  id: string;                // rut???
  //rut: string;              
  email: string;             
  name: string;              
  //careerCode: string;       
  carreras?: Career[];   // arreglo de carreras del endpoint
}