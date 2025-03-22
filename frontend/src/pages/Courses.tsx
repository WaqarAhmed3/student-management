import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import CourseForm from "../components/courses/CourseForm";

interface Course {
  id: number;
  course_code: string;
  course_name: string;
  instructor: string;
  credits: number;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const columns: GridColDef[] = [
    { field: "course_code", headerName: "Course Code", flex: 1 },
    { field: "course_name", headerName: "Course Name", flex: 2 },
    { field: "instructor", headerName: "Instructor", flex: 2 },
    { field: "credits", headerName: "Credits", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/courses/");
      setCourses(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedCourse(null);
    setOpenForm(true);
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setOpenForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Courses</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleCreate}
              >
                Add Course
              </Button>
            </Box>

            {loading ? (
              <CircularProgress />
            ) : (
              <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                  rows={courses}
                  columns={columns}
                  pageSizeOptions={[10]}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  disableRowSelectionOnClick
                />
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>

      <CourseForm
        open={openForm}
        course={selectedCourse}
        onClose={() => setOpenForm(false)}
        onSave={fetchCourses}
      />
    </Box>
  );
};

export default Courses;
