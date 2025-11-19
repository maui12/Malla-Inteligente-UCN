// src/data/sampleData.ts
import type { Course } from "../types/Course";
import type { CourseProgress } from "../types/CourseProgress";
import type { Career } from "../types/Career";
import type { Student } from "../types/Student";

export const sampleCareers: Career[] = [
  { codigo: "8266", nombre: "Ingeniería Civil en Computación", catalogo: "202410", courses: {} },
  { codigo: "8606", nombre: "Ingeniería Civil Industrial", catalogo: "201610", courses: {} },
];

// ================================
//  SAMPLE COURSES - 10 SEMESTRES
// ================================

export const sampleCourses: Course[] = [
  // SEMESTRE 1
  { codigo: "DCCB-00107", asignatura: "Álgebra I", creditos: 6, nivel: 1, prereq: [] },
  { codigo: "DCCB-00106", asignatura: "Cálculo I", creditos: 6, nivel: 1, prereq: [] },
  { codigo: "DDOC-00102", asignatura: "Comunicación Efectiva", creditos: 4, nivel: 1, prereq: [] },
  { codigo: "DFIS-00110", asignatura: "Introducción a la Ingeniería", creditos: 3, nivel: 1, prereq: [] },
  { codigo: "DCCB-00103", asignatura: "Lógica y Computación", creditos: 5, nivel: 1, prereq: [] },
  { codigo: "DMAT-00101", asignatura: "Geometría y Trigonometría", creditos: 5, nivel: 1, prereq: [] },

  // SEMESTRE 2
  { codigo: "DCCB-00210", asignatura: "Programación I", creditos: 6, nivel: 2, prereq: ["DCCB-00107", "DCCB-00106"] },
  { codigo: "SSED-00102", asignatura: "Proyecto", creditos: 2, nivel: 2, prereq: [] },
  { codigo: "DAMA-00235", asignatura: "Física I", creditos: 6, nivel: 2, prereq: ["DCCB-00106"] },
  { codigo: "DCCB-00220", asignatura: "Álgebra II", creditos: 6, nivel: 2, prereq: ["DCCB-00107"] },
  { codigo: "DCCB-00230", asignatura: "Cálculo II", creditos: 6, nivel: 2, prereq: ["DCCB-00106"] },
  { codigo: "DCCB-00240", asignatura: "Estrategias de Estudio", creditos: 3, nivel: 2, prereq: [] },

  // SEMESTRE 3
  { codigo: "DCCB-00320", asignatura: "Estructuras de Datos", creditos: 6, nivel: 3, prereq: ["DCCB-00210"] },
  { codigo: "DCCB-00330", asignatura: "Arquitectura de Computadores", creditos: 6, nivel: 3, prereq: ["DCCB-00210"] },
  { codigo: "DAMA-00340", asignatura: "Cálculo III", creditos: 6, nivel: 3, prereq: ["DCCB-00230"] },
  { codigo: "DFIS-00350", asignatura: "Física II", creditos: 6, nivel: 3, prereq: ["DAMA-00235"] },
  { codigo: "DCCB-00360", asignatura: "Programación II", creditos: 5, nivel: 3, prereq: ["DCCB-00210"] },
  { codigo: "DCCB-00370", asignatura: "Probabilidades y Estadística", creditos: 5, nivel: 3, prereq: ["DCCB-00230"] },

  // SEMESTRE 4
  { codigo: "DCCB-00415", asignatura: "Bases de Datos", creditos: 6, nivel: 4, prereq: ["DCCB-00320"] },
  { codigo: "DCCB-00425", asignatura: "Ingeniería de Software", creditos: 6, nivel: 4, prereq: ["DCCB-00320"] },
  { codigo: "DCCB-00440", asignatura: "Estadística", creditos: 5, nivel: 4, prereq: ["DAMA-00340"] },
  { codigo: "DCCB-00450", asignatura: "Sistemas Operativos", creditos: 6, nivel: 4, prereq: ["DCCB-00330"] },
  { codigo: "DCCB-00460", asignatura: "Redes de Computadores", creditos: 5, nivel: 4, prereq: ["DCCB-00330"] },
  { codigo: "DDOC-00470", asignatura: "Ética Profesional", creditos: 4, nivel: 4, prereq: [] },

  // SEMESTRE 5
  { codigo: "DCCB-00510", asignatura: "Análisis de Algoritmos", creditos: 6, nivel: 5, prereq: ["DCCB-00320"] },
  { codigo: "DCCB-00520", asignatura: "Ingeniería de Requisitos", creditos: 5, nivel: 5, prereq: ["DCCB-00425"] },
  { codigo: "DCCB-00530", asignatura: "Bases de Datos Avanzadas", creditos: 6, nivel: 5, prereq: ["DCCB-00415"] },
  { codigo: "DCCB-00540", asignatura: "Sistemas Distribuidos", creditos: 6, nivel: 5, prereq: ["DCCB-00450"] },
  { codigo: "DCCB-00550", asignatura: "Métodos Numéricos", creditos: 5, nivel: 5, prereq: ["DAMA-00340"] },
  { codigo: "DCCB-00560", asignatura: "Electivo Profesional I", creditos: 4, nivel: 5, prereq: [] },

  // SEMESTRE 6
  { codigo: "DCCB-00610", asignatura: "Inteligencia Artificial", creditos: 6, nivel: 6, prereq: ["DCCB-00370"] },
  { codigo: "DCCB-00620", asignatura: "Seguridad Informática", creditos: 6, nivel: 6, prereq: ["DCCB-00460"] },
  { codigo: "DCCB-00630", asignatura: "Ingeniería de Software Avanzada", creditos: 6, nivel: 6, prereq: ["DCCB-00425"] },
  { codigo: "DCCB-00640", asignatura: "Modelación y Simulación", creditos: 6, nivel: 6, prereq: ["DCCB-00550"] },
  { codigo: "DCCB-00650", asignatura: "Electrónica Digital", creditos: 5, nivel: 6, prereq: ["DCCB-00330"] },
  { codigo: "DCCB-00660", asignatura: "Electivo Profesional II", creditos: 4, nivel: 6, prereq: [] },

  // SEMESTRE 7
  { codigo: "DCCB-00710", asignatura: "Machine Learning", creditos: 6, nivel: 7, prereq: ["DCCB-00610"] },
  { codigo: "DCCB-00720", asignatura: "Criptografía", creditos: 6, nivel: 7, prereq: ["DCCB-00620"] },
  { codigo: "DCCB-00730", asignatura: "Ingeniería de Calidad", creditos: 6, nivel: 7, prereq: ["DCCB-00630"] },
  { codigo: "DCCB-00740", asignatura: "Computación Paralela", creditos: 5, nivel: 7, prereq: ["DCCB-00510"] },
  { codigo: "DCCB-00750", asignatura: "Electivo Profesional III", creditos: 4, nivel: 7, prereq: [] },
  { codigo: "DCCB-00760", asignatura: "Proyecto de Software I", creditos: 6, nivel: 7, prereq: ["DCCB-00630"] },

  // SEMESTRE 8
  { codigo: "DCCB-00810", asignatura: "Deep Learning", creditos: 6, nivel: 8, prereq: ["DCCB-00710"] },
  { codigo: "DCCB-00820", asignatura: "Arquitecturas Cloud", creditos: 6, nivel: 8, prereq: ["DCCB-00640"] },
  { codigo: "DCCB-00830", asignatura: "Minería de Datos", creditos: 5, nivel: 8, prereq: ["DCCB-00710"] },
  { codigo: "DCCB-00840", asignatura: "DevOps", creditos: 5, nivel: 8, prereq: ["DCCB-00630"] },
  { codigo: "DCCB-00850", asignatura: "Electivo Profesional IV", creditos: 4, nivel: 8, prereq: [] },
  { codigo: "DCCB-00860", asignatura: "Proyecto de Software II", creditos: 6, nivel: 8, prereq: ["DCCB-00760"] },

  // SEMESTRE 9
  { codigo: "DCCB-00910", asignatura: "Proyecto de Título I", creditos: 10, nivel: 9, prereq: ["DCCB-00860"] },
  { codigo: "DCCB-00920", asignatura: "Ética y Legislación TI", creditos: 5, nivel: 9, prereq: [] },
  { codigo: "DCCB-00930", asignatura: "Electivo Profesional V", creditos: 4, nivel: 9, prereq: [] },
  { codigo: "DCCB-00940", asignatura: "Gestión de Proyectos", creditos: 6, nivel: 9, prereq: ["DCCB-00730"] },
  { codigo: "DCCB-00950", asignatura: "Capital Humano y Liderazgo", creditos: 4, nivel: 9, prereq: [] },
  { codigo: "DCCB-00960", asignatura: "Calidad de Software Avanzada", creditos: 5, nivel: 9, prereq: ["DCCB-00730"] },

  // SEMESTRE 10
  { codigo: "DCCB-01010", asignatura: "Proyecto de Título II", creditos: 10, nivel: 10, prereq: ["DCCB-00910"] },
  { codigo: "DCCB-01020", asignatura: "Innovación y Emprendimiento", creditos: 6, nivel: 10, prereq: [] },
  { codigo: "DCCB-01030", asignatura: "Electivo Profesional VI", creditos: 4, nivel: 10, prereq: [] },
  { codigo: "DCCB-01040", asignatura: "Arquitecturas Empresariales", creditos: 6, nivel: 10, prereq: [] },
  { codigo: "DCCB-01050", asignatura: "Ciberseguridad Avanzada", creditos: 6, nivel: 10, prereq: ["DCCB-00720"] },
  { codigo: "DCCB-01060", asignatura: "Gestión Estratégica TI", creditos: 5, nivel: 10, prereq: [] },
];


// ======================================
//  SAMPLE PROGRESS (REALISTA)
// ======================================

export const sampleProgress: CourseProgress[] = [
  // SEMESTRE 1 — todos aprobados
  { nrc: "10001", period: "202310", student: "333333333", course: "DCCB-00107", excluded: false, inscriptionType: "REGULAR", status: "APROBADO" },
  { nrc: "10002", period: "202310", student: "333333333", course: "DCCB-00106", excluded: false, inscriptionType: "REGULAR", status: "APROBADO" },
  { nrc: "10003", period: "202310", student: "333333333", course: "DDOC-00102", excluded: false, inscriptionType: "REGULAR", status: "APROBADO" },
  { nrc: "10004", period: "202310", student: "333333333", course: "DFIS-00110", excluded: false, inscriptionType: "REGULAR", status: "APROBADO" },
  { nrc: "10005", period: "202310", student: "333333333", course: "DCCB-00103", excluded: false, inscriptionType: "REGULAR", status: "APROBADO" },
  { nrc: "10006", period: "202310", student: "333333333", course: "DMAT-00101", excluded: false, inscriptionType: "REGULAR", status: "APROBADO" },

  // SEMESTRE 2 — casi todos aprobados
  { nrc: "20001", period: "202320", student: "333333333", course: "DCCB-00210", excluded: false, inscriptionType: "REGULAR", status: "APROBADO" },
  { nrc: "20002", period: "202320", student: "333333333", course: "SSED-00102", excluded: false, inscriptionType: "REGULAR", status: "APROBADO" },
  { nrc: "20003", period: "202320", student: "333333333", course: "DAMA-00235", excluded: false, inscriptionType: "REGULAR", status: "APROBADO" },
  { nrc: "20004", period: "202320", student: "333333333", course: "DCCB-00220", excluded: false, inscriptionType: "REGULAR", status: "APROBADO" },
  { nrc: "20005", period: "202320", student: "333333333", course: "DCCB-00230", excluded: false, inscriptionType: "REGULAR", status: "APROBADO" },
  { nrc: "20006", period: "202320", student: "333333333", course: "DCCB-00240", excluded: false, inscriptionType: "REGULAR", status: "APROBADO" },

  // SEMESTRE 3 — cursando ahora
  { nrc: "30001", period: "202430", student: "333333333", course: "DCCB-00320", excluded: false, inscriptionType: "REGULAR", status: "CURSANDO" },
  { nrc: "30002", period: "202430", student: "333333333", course: "DCCB-00330", excluded: false, inscriptionType: "REGULAR", status: "CURSANDO" },
  { nrc: "30003", period: "202430", student: "333333333", course: "DAMA-00340", excluded: false, inscriptionType: "REGULAR", status: "CURSANDO" },
  { nrc: "30004", period: "202430", student: "333333333", course: "DFIS-00350", excluded: false, inscriptionType: "REGULAR", status: "CURSANDO" },
  { nrc: "30005", period: "202430", student: "333333333", course: "DCCB-00360", excluded: false, inscriptionType: "REGULAR", status: "CURSANDO" },
  { nrc: "30006", period: "202430", student: "333333333", course: "DCCB-00370", excluded: false, inscriptionType: "REGULAR", status: "CURSANDO" },

  // SEMESTRE 4 — disponibles (prerequisitos cumplidos o casi)
  { nrc: "40001", period: "", student: "333333333", course: "DCCB-00415", excluded: false, inscriptionType: "REGULAR", status: "DISPONIBLE" },
  { nrc: "40002", period: "", student: "333333333", course: "DCCB-00425", excluded: false, inscriptionType: "REGULAR", status: "DISPONIBLE" },
  { nrc: "40003", period: "", student: "333333333", course: "DCCB-00440", excluded: false, inscriptionType: "REGULAR", status: "DISPONIBLE" },
  { nrc: "40004", period: "", student: "333333333", course: "DCCB-00450", excluded: false, inscriptionType: "REGULAR", status: "BLOQUEADO" },
  { nrc: "40005", period: "", student: "333333333", course: "DCCB-00460", excluded: false, inscriptionType: "REGULAR", status: "BLOQUEADO" },
  { nrc: "40006", period: "", student: "333333333", course: "DDOC-00470", excluded: false, inscriptionType: "REGULAR", status: "DISPONIBLE" },

  // SEMESTRES SUPERIORES — todos bloqueados
  ...[
    "DCCB-00510","DCCB-00520","DCCB-00530","DCCB-00540","DCCB-00550","DCCB-00560",
    "DCCB-00610","DCCB-00620","DCCB-00630","DCCB-00640","DCCB-00650","DCCB-00660",
    "DCCB-00710","DCCB-00720","DCCB-00730","DCCB-00740","DCCB-00750","DCCB-00760",
    "DCCB-00810","DCCB-00820","DCCB-00830","DCCB-00840","DCCB-00850","DCCB-00860",
    "DCCB-00910","DCCB-00920","DCCB-00930","DCCB-00940","DCCB-00950","DCCB-00960",
    "DCCB-01010","DCCB-01020","DCCB-01030","DCCB-01040","DCCB-01050","DCCB-01060",
  ].map((code, idx) => ({
    nrc: `900${idx + 1}`,
    period: "",
    student: "333333333",
    course: code,
    excluded: false,
    inscriptionType: "REGULAR",
    status: "BLOQUEADO",
  })),
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