import axios from "axios";
import { Course } from "../types/courseTypes"; // Ensure you have a Course type defined

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export const getCourses = async (): Promise<Course[]> => {
  const response = await axios.get<{ results: Course[] }>(
    `${API_URL}/courses/`
  );
  return response.data.results;
};

export const deleteCourse = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/courses/${id}`);
};

export const createCourse = async (
  data: Omit<Course, "id">
): Promise<Course> => {
  const response = await axios.post<Course>(`${API_URL}/courses/`, data);
  return response.data;
};

export const updateCourse = async (
  id: number,
  data: Partial<Course>
): Promise<Course> => {
  const response = await axios.put<Course>(`${API_URL}/courses/${id}/`, data);
  return response.data;
};
