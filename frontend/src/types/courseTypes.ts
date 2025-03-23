// src/types/courseTypes.ts

export interface Course {
  id: number; // Django auto-generated primary key
  course_code: string;
  course_name: string;
  instructor: string;
  credits: number;
}
