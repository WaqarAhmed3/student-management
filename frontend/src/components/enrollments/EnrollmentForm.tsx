import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import CustomDropdown from "../UI/CustomDropdown";

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
    enrollment_date: enrollment?.enrollment_date || "",
  });

  useEffect(() => {
    if (open) {
      axios
        .get("http://127.0.0.1:8000/api/enrollments/get_create/")
        .then((response) => {
          setStudents(response.data.students);
          setCourses(response.data.courses);
        });
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        student: formData.student,
        course: formData.course,
        enrollment_date: formData.enrollment_date,
      };

      if (enrollment) {
        await axios.put(
          `http://127.0.0.1:8000/api/enrollments/${enrollment.id}/`,
          payload
        );
      } else {
        await axios.post("http://127.0.0.1:8000/api/enrollments/", payload);
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
            <Grid item xs={12}>
              <TextField
                // fullWidth
                sx={{ width: "263px" }}
                label="Enrollment Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.enrollment_date}
                onChange={(e) =>
                  setFormData({ ...formData, enrollment_date: e.target.value })
                }
                required
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
