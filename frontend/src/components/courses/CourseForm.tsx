import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";

interface CourseFormProps {
  open: boolean;
  course: any;
  onClose: () => void;
  onSave: () => void;
}

const CourseForm = ({ open, course, onClose, onSave }: CourseFormProps) => {
  const [formData, setFormData] = useState({
    course_code: course?.course_code || "",
    course_name: course?.course_name || "",
    instructor: course?.instructor || "",
    credits: course?.credits || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (course) {
        await axios.put(
          `http://127.0.0.1:8000/api/courses/${course.id}`,
          formData
        );
      } else {
        await axios.post("http://127.0.0.1:8000/api/courses/", formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{course ? "Edit Course" : "Create Course"}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Course Code"
                value={formData.course_code}
                onChange={(e) =>
                  setFormData({ ...formData, course_code: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Course Name"
                value={formData.course_name}
                onChange={(e) =>
                  setFormData({ ...formData, course_name: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Instructor"
                value={formData.instructor}
                onChange={(e) =>
                  setFormData({ ...formData, instructor: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Credits"
                type="number"
                value={formData.credits}
                onChange={(e) =>
                  setFormData({ ...formData, credits: Number(e.target.value) })
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

export default CourseForm;
