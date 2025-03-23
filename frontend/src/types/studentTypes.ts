export interface Student {
  id: number; // Django auto-generated primary key
  student_id: string; // Unique student ID defined in your model
  name: string;
  email: string;
  date_of_birth: string; // ISO date string (e.g., "YYYY-MM-DD")
}
