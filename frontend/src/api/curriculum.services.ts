import axios from "axios"; //curriculum son carreras

const API_URL = "http://localhost:3000"; // cambia según tu backend

export async function fetchCurriculum(careerCode: string) {
  const res = await axios.get(`${API_URL}/curriculum/${careerCode}`);
  return res.data;
}

export async function fetchCourseDetails(courseCode: string) {
  const res = await axios.get(`${API_URL}/curriculum/course/${courseCode}`);
  return res.data;
}