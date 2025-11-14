import type { Course } from "../types/Course";

const API_URL = "http://localhost:3000"; //direccion del backend

export async function fetchCourses(): Promise<Course[]> {
  const res = await fetch(`${API_URL}/courses`);

  if (!res.ok) {
    throw new Error("Error al obtener los cursos");
  }

  return res.json();
}