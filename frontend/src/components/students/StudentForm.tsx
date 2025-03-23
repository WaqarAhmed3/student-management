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
import { createStudent, updateStudent } from "../../services/studentService";

interface StudentFormProps {
  open: boolean;
  student: any;
  onClose: () => void;
  onSave: () => void;
}

interface StudentFormData {
  name: string;
  email: string;
  student_id: string;
  date_of_birth: string;
}

interface ServerError {
  field?: keyof StudentFormData;
  message: string;
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  student_id: yup.string().required("Student ID is required"),
  date_of_birth: yup.string().required("Date of Birth is required"),
});

const StudentForm = ({ open, student, onClose, onSave }: StudentFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: student?.name || "",
      email: student?.email || "",
      student_id: student?.student_id || "",
      date_of_birth: student?.date_of_birth || "",
    },
  });

  const [serverErrors, setServerErrors] = useState<ServerError[]>([]);

  useEffect(() => {
    reset({
      name: student?.name || "",
      email: student?.email || "",
      student_id: student?.student_id || "",
      date_of_birth: student?.date_of_birth || "",
    });
    setServerErrors([]);
  }, [student, open, reset]);

  const onSubmit: SubmitHandler<StudentFormData> = async (data) => {
    try {
      setServerErrors([]);
      if (student) {
        await updateStudent(student.id, data);
      } else {
        await createStudent(data);
      }
      onSave();
      onClose();
    } catch (error: any) {
      console.error("Error saving student:", error.response?.data);
      const apiErrors = error.response?.data;
      if (apiErrors && typeof apiErrors === "object") {
        // Transform error response to an array of ServerError objects
        const errorsArray: ServerError[] = Object.keys(apiErrors).map(
          (key) => ({
            field: key as keyof StudentFormData,
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

  const getFieldError = (fieldName: keyof StudentFormData) => {
    const serverError = serverErrors.find((e) => e.field === fieldName);
    return serverError?.message || errors[fieldName]?.message;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{student ? "Edit Student" : "Create Student"}</DialogTitle>

      {/* Display non-field-specific error */}
      {serverErrors.some((e) => !e.field) && (
        <Alert severity="error" sx={{ m: 2 }}>
          {serverErrors.find((e) => !e.field)?.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Name"
                    error={!!getFieldError("name")}
                    helperText={getFieldError("name")}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    type="email"
                    error={!!getFieldError("email")}
                    helperText={getFieldError("email")}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="student_id"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Student ID"
                    error={!!getFieldError("student_id")}
                    helperText={getFieldError("student_id")}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="date_of_birth"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!getFieldError("date_of_birth")}
                    helperText={getFieldError("date_of_birth")}
                    required
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

export default StudentForm;
