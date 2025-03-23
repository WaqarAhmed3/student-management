// src/services/studentService.ts

import axios from "axios";
import { Student } from "../types/studentTypes";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export const getStudents = async (): Promise<Student[]> => {
  const response = await axios.get<{ results: Student[] }>(
    `${API_URL}/students/`
  );
  return response.data.results;
};

export const deleteStudent = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/students/${id}`);
};

export const createStudent = async (
  data: Omit<Student, "id">
): Promise<Student> => {
  const response = await axios.post<Student>(`${API_URL}/students/`, data);
  return response.data;
};

export const updateStudent = async (
  id: number,
  data: Partial<Student>
): Promise<Student> => {
  const response = await axios.put<Student>(`${API_URL}/students/${id}/`, data);
  return response.data;
};
