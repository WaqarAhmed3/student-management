import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createCourse, updateCourse } from "../../services/courseService";
import { Course } from "../../types/courseTypes";

interface CourseFormProps {
  open: boolean;
  course: Course | null;
  onClose: () => void;
  onSave: () => void;
}

interface CourseFormData {
  course_code: string;
  course_name: string;
  instructor: string;
  credits: number;
}

interface ServerError {
  field?: keyof CourseFormData;
  message: string;
}

const validationSchema = yup.object().shape({
  course_code: yup.string().required("Course code is required"),
  course_name: yup.string().required("Course name is required"),
  instructor: yup.string().required("Instructor name is required"),
  credits: yup
    .number()
    .required("Credits are required")
    .min(1, "Minimum 1 credit")
    .max(6, "Maximum 6 credits"),
});

const CourseForm = ({ open, course, onClose, onSave }: CourseFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      course_code: course?.course_code || "",
      course_name: course?.course_name || "",
      instructor: course?.instructor || "",
      credits: course?.credits || 1,
    },
  });

  const [serverErrors, setServerErrors] = useState<ServerError[]>([]);

  useEffect(() => {
    reset({
      course_code: course?.course_code || "",
      course_name: course?.course_name || "",
      instructor: course?.instructor || "",
      credits: course?.credits || 1,
    });
    setServerErrors([]);
  }, [course, open, reset]);

  const onSubmit: SubmitHandler<CourseFormData> = async (data) => {
    try {
      setServerErrors([]);
      if (course) {
        await updateCourse(course.id, data);
      } else {
        await createCourse(data);
      }
      onSave();
      onClose();
    } catch (error: any) {
      console.error("Error response:", error.response?.data);
      const apiErrors = error.response?.data;
      if (apiErrors && typeof apiErrors === "object") {
        // Transform error response object to an array of ServerError objects
        const errorsArray: ServerError[] = Object.keys(apiErrors).map(
          (key) => ({
            field: key as keyof CourseFormData,
            message: Array.isArray(apiErrors[key])
              ? apiErrors[key][0]
              : apiErrors[key],
          })
        );
        setServerErrors(errorsArray);
      } else {
        setServerErrors([{ message: "An unexpected error occurred" }]);
      }
    }
  };

  const getFieldError = (fieldName: keyof CourseFormData) => {
    const serverError = serverErrors.find((e) => e.field === fieldName);
    return serverError?.message || errors[fieldName]?.message;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{course ? "Edit Course" : "Create Course"}</DialogTitle>

      {/* Display non-field specific server error if any */}
      {serverErrors.some((e) => !e.field) && (
        <Alert severity="error" sx={{ m: 2 }}>
          {serverErrors.find((e) => !e.field)?.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Controller
                name="course_code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Course Code"
                    error={!!getFieldError("course_code")}
                    helperText={getFieldError("course_code")}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="course_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Course Name"
                    error={!!getFieldError("course_name")}
                    helperText={getFieldError("course_name")}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="instructor"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Instructor"
                    error={!!getFieldError("instructor")}
                    helperText={getFieldError("instructor")}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="credits"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Credits"
                    type="number"
                    error={!!getFieldError("credits")}
                    helperText={getFieldError("credits")}
                    required
                    inputProps={{ min: 1, max: 6 }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CourseForm;
