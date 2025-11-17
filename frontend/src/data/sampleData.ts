// src/data/sampleData.ts
import type { Course } from "../types/Course";
import type { CourseProgress } from "../types/CourseProgress";
import type { Career } from "../types/Career";
import type { Student } from "../types/Student";

export const sampleCareers: Career[] = [
  { codigo: "8266", nombre: "Ingeniería Civil en Computación", catalogo: "202410", courses: {} },
  { codigo: "8606", nombre: "Ingeniería Civil Industrial", catalogo: "201610", courses: {} },
];

export const sampleCourses: Course[] = [
  { codigo: "DCCB-00107", asignatura: "Álgebra I", creditos: 6, nivel: 1, prereq: [] },
  { codigo: "DCCB-00106", asignatura: "Cálculo I", creditos: 6, nivel: 1, prereq: [] },
  { codigo: "DDOC-00102", asignatura: "Comunicación Efectiva", creditos: 4, nivel: 1, prereq: [] },

  { codigo: "DCCB-00210", asignatura: "Programación I", creditos: 6, nivel: 2, prereq: ["DCCB-00107", "DCCB-00106"] },
  { codigo: "SSED-00102", asignatura: "Proyecto", creditos: 2, nivel: 2, prereq: [] },
  { codigo: "DAMA-00235", asignatura: "Física I", creditos: 6, nivel: 2, prereq: ["DCCB-00106"] },

  { codigo: "DCCB-00320", asignatura: "Estructuras de Datos", creditos: 6, nivel: 3, prereq: ["DCCB-00210"] },
  { codigo: "DCCB-00330", asignatura: "Arquitectura de Computadores", creditos: 6, nivel: 3, prereq: ["DCCB-00210"] },
  { codigo: "DAMA-00340", asignatura: "Cálculo II", creditos: 6, nivel: 3, prereq: ["DCCB-00106"] },

  { codigo: "DCCB-00415", asignatura: "Bases de Datos", creditos: 6, nivel: 4, prereq: ["DCCB-00320"] },
  { codigo: "DCCB-00425", asignatura: "Ingeniería de Software", creditos: 6, nivel: 4, prereq: ["DCCB-00320"] },
  { codigo: "DCCB-00440", asignatura: "Estadística", creditos: 5, nivel: 4, prereq: ["DAMA-00340"] },
];

export const sampleProgress: CourseProgress[] = [
  { nrc: "10001", period: "202320", student: "333333333", course: "DCCB-00107", excluded: false, inscriptionType: "REGULAR", status: "APROBADO" },
  { nrc: "10002", period: "202320", student: "333333333", course: "DCCB-00106", excluded: false, inscriptionType: "REGULAR", status: "REPROBADO" },
  { nrc: "10003", period: "202120", student: "333333333", course: "DDOC-00102", excluded: false, inscriptionType: "REGULAR", status: "APROBADO" },

  { nrc: "20001", period: "202430", student: "333333333", course: "DCCB-00210", excluded: false, inscriptionType: "REGULAR", status: "CURSANDO" },
  { nrc: "20002", period: "202430", student: "333333333", course: "SSED-00102", excluded: false, inscriptionType: "REGULAR", status: "APROBADO" },
  { nrc: "20003", period: "202430", student: "333333333", course: "DAMA-00235", excluded: false, inscriptionType: "REGULAR", status: "CURSANDO" },

  { nrc: "30001", period: "202430", student: "333333333", course: "DCCB-00320", excluded: false, inscriptionType: "REGULAR", status: "DISPONIBLE PROXIMO SEMESTRE" },
  { nrc: "30002", period: "202430", student: "333333333", course: "DCCB-00330", excluded: false, inscriptionType: "REGULAR", status: "DISPONIBLE PROXIMO SEMESTRE" },
  { nrc: "30003", period: "202430", student: "333333333", course: "DAMA-00340", excluded: false, inscriptionType: "REGULAR", status: "REPROBADO" },

  { nrc: "40001", period: "", student: "333333333", course: "DCCB-00415", excluded: false, inscriptionType: "REGULAR", status: "DISPONIBLE" },
  { nrc: "40002", period: "", student: "333333333", course: "DCCB-00425", excluded: false, inscriptionType: "REGULAR", status: "DISPONIBLE" },
  { nrc: "40003", period: "", student: "333333333", course: "DCCB-00440", excluded: false, inscriptionType: "REGULAR", status: "DISPONIBLE PROXIMO SEMESTRE" },
];

// Estudiantes de ejemplo   
export const sampleStudents: Student[] = [
  {
    id: "11111111-1",
    name: "Juan Pérez",
    email: "juan@example.com",
    carreras: [sampleCareers[0]],
  },
  {
    id: "22222222-2",
    name: "María López",
    email: "maria@example.com",
    carreras: [sampleCareers[0], sampleCareers[1]],
  },
];