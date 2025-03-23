export interface Enrollment {
  id: number;
  student: {
    id: number;
    student_id: string;
    name: string;
    email: string;
    date_of_birth: string; // ISO date string (e.g., "YYYY-MM-DD")
  };
  course: {
    id: number;
    course_code: string;
    course_name: string;
    instructor: string;
    credits: number;
  };
  enrollment_date: string; // ISO date string (auto-generated)
}
