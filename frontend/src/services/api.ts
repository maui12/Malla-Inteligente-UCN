import type { Course } from "../types/course";

export async function fetchCourses(codigoCarrera?: string): Promise<Course[]> {
  const cursosPorCarrera: Record<string, Course[]> = {
    "8266": [ // Ingeniería Civil en Computación
      { id: "1", name: "CÁLCULO I", semester: 1, year: 2024, status: "approved", creditos: 6 },
      { id: "2", name: "PROGRAMACIÓN I", semester: 1, year: 2024, status: "approved", creditos: 7 },
      { id: "3", name: "INTRO. A LA INGENIERÍA", semester: 1, year: 2024, status: "approved", creditos: 5 },
      { id: "4", name: "PROGRAMACIÓN II", semester: 2, year: 2024, status: "failed", creditos: 7 },
      { id: "5", name: "ESTRUCTURAS DE DATOS", semester: 3, year: 2025, status: "projected", creditos: 8 },
      { id: "6", name: "BASES DE DATOS", semester: 4, year: 2025, status: "planned", creditos: 7 },
    ],
    "8606": [ // Ingeniería Civil Industrial
      { id: "7", name: "CÁLCULO I", semester: 1, year: 2024, status: "approved", creditos: 6 },
      { id: "8", name: "ÁLGEBRA LINEAL", semester: 1, year: 2024, status: "approved", creditos: 6 },
      { id: "9", name: "INTRO. A LA INGENIERÍA INDUSTRIAL", semester: 1, year: 2024, status: "approved", creditos: 5 },
      { id: "10", name: "ECONOMÍA", semester: 2, year: 2024, status: "approved", creditos: 6 },
      { id: "11", name: "GESTIÓN DE PROCESOS", semester: 3, year: 2025, status: "planned", creditos: 7 },
      { id: "12", name: "INVESTIGACIÓN DE OPERACIONES", semester: 4, year: 2025, status: "projected", creditos: 8 },
    ],
  };

  const cursos = cursosPorCarrera[codigoCarrera ?? "8266"] ?? cursosPorCarrera["8266"];
  return Promise.resolve(cursos);
}
