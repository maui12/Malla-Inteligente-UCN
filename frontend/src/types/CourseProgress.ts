export interface CourseProgress { //Avance 
  nrc: string;
  period: string;
  student: string;
  course: string;
  excluded: boolean;
  inscriptionType: string;
  status: string; //"APROBADO", "REPROBADO", etc.
}