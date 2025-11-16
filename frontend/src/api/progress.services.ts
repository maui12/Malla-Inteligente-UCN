import axios from "axios"; //CourseProgress

const API_URL = "http://localhost:3000";

export async function fetchMyProgress(token: string) {
  const res = await axios.get(`${API_URL}/progress/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function fetchProgressForStudent(id: string, token: string) {
  const res = await axios.get(`${API_URL}/progress/student/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
