import { useEffect, useState } from "react";
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
import StudentForm from "../components/students/StudentForm";
import { deleteStudent, getStudents } from "../services/studentService";

interface Student {
  id: number;
  name: string;
  email: string;
  student_id: string;
  date_of_birth: string;
}

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const columns: GridColDef[] = [
    { field: "student_id", headerName: "Student ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "date_of_birth", headerName: "Date of Birth", flex: 1 },
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
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedStudent(null);
    setOpenForm(true);
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setOpenForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Students</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleCreate}
              >
                Add Student
              </Button>
            </Box>

            {loading ? (
              <CircularProgress />
            ) : (
              <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                  rows={students}
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

      <StudentForm
        open={openForm}
        student={selectedStudent}
        onClose={() => setOpenForm(false)}
        onSave={fetchStudents}
      />
    </Box>
  );
};

export default Students;
