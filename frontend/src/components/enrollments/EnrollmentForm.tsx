import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import CustomDropdown from "../UI/CustomDropdown";
import {
  createEnrollment,
  getEnrollmentFormData,
  updateEnrollment,
} from "../../services/enrollmentService";

interface EnrollmentFormProps {
  open: boolean;
  enrollment: any;
  onClose: () => void;
  onSave: () => void;
}

const EnrollmentForm = ({
  open,
  enrollment,
  onClose,
  onSave,
}: EnrollmentFormProps) => {
  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    student: enrollment?.student?.id || "",
    course: enrollment?.course?.id || "",
  });

  useEffect(() => {
    console.log("Dialog open state changed:", open);
    console.log("Current enrollment prop:", enrollment);
    if (open) {
      getEnrollmentFormData().then((response) => {
        setStudents(response.students);
        setCourses(response.courses);
        // If enrollment exists, find matching student and course IDs
        if (enrollment) {
          let studentId = "";
          let courseId = "";

          if (enrollment?.student_name) {
            const foundStudent = response.students.find(
              (student: any) => student.name === enrollment.student_name
            );
            studentId = foundStudent ? foundStudent.id.toString() : "";
          }

          // Do the same for course_name
          if (enrollment?.course_name) {
            const foundCourse = response.courses.find(
              (course: any) => course.course_name === enrollment.course_name
            );
            courseId = foundCourse ? foundCourse.id.toString() : "";
          }

          // Update formData with the matching IDs
          setFormData({
            student: studentId,
            course: courseId,
          });
        }
      });
    } else {
      // Reset form when closing
      setFormData({ student: "", course: "" });
    }
  }, [open, enrollment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        student: formData.student,
        course: formData.course,
      };

      if (enrollment) {
        await updateEnrollment(enrollment.id, payload);
      } else {
        await createEnrollment(payload);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving enrollment:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {enrollment ? "Edit Enrollment" : "Create Enrollment"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomDropdown
                label="Student"
                value={formData.student}
                onChange={(value) =>
                  setFormData({ ...formData, student: value })
                }
                options={students.map((student) => ({
                  value: student.id.toString(),
                  label: student.name,
                }))}
                onClear={() => setFormData({ ...formData, student: "" })}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomDropdown
                label="Course"
                value={formData.course}
                onChange={(value) =>
                  setFormData({ ...formData, course: value })
                }
                options={courses.map((course) => ({
                  value: course.id.toString(),
                  label: course.course_name,
                }))}
                onClear={() => setFormData({ ...formData, course: "" })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EnrollmentForm;
