import axios from "axios"; //CourseProgress

const API_URL = "http://localhost:3000";

export async function fetchProgressForStudent(studentId: string) {
  const res = await axios.get(`${API_URL}/${studentId}`);
  return res.data;
}

