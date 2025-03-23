// src/services/enrollmentService.ts

import axios from "axios";
import { Enrollment } from "../types/enrollmentTypes";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

// Fetch paginated enrollments
export const getEnrollments = async (
  page: number,
  pageSize: number
): Promise<{ results: Enrollment[]; count: number }> => {
  const response = await axios.get(`${API_URL}/enrollments/`, {
    params: {
      page: page + 1, // DRF expects pages starting at 1
      page_size: pageSize,
    },
  });
  return response.data;
};

// Delete an enrollment by id
export const deleteEnrollment = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/enrollments/${id}`);
};

// Create a new enrollment
export const createEnrollment = async (
  data: Omit<Enrollment, "id" | "enrollment_date">
): Promise<Enrollment> => {
  const response = await axios.post<Enrollment>(
    `${API_URL}/enrollments/`,
    data
  );
  return response.data;
};

// Update an existing enrollment
export const updateEnrollment = async (
  id: number,
  data: Partial<Enrollment>
): Promise<Enrollment> => {
  const response = await axios.put<Enrollment>(
    `${API_URL}/enrollments/${id}/`,
    data
  );
  return response.data;
};

// Retrieve necessary data for the enrollment form (students and courses)
export const getEnrollmentFormData = async (): Promise<{
  students: any[];
  courses: any[];
}> => {
  const response = await axios.get(`${API_URL}/enrollments/get_create/`);
  return response.data;
};

// Get enrollment counts per course for distribution charts
export const getEnrollmentsPerCourse = async (): Promise<
  Array<{ course: string; count: number }>
> => {
  const response = await axios.get(
    `${API_URL}/enrollments/enrollments_per_course/`
  );
  return response.data.map((item: any) => ({
    course: item.course__course_name,
    count: item.count,
  }));
};

// Get student distribution across courses for reporting
export const getStudentDistribution = async (): Promise<
  Array<{ course: string; count: number }>
> => {
  const response = await axios.get(
    `${API_URL}/enrollments/student_distribution/`
  );
  return response.data.map((item: any) => ({
    course: item.course__course_name,
    count: item.count,
  }));
};
