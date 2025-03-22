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
import EnrollmentForm from "../components/enrollments/EnrollmentForm";

interface Enrollment {
  id: number;
  student: { name: string };
  course: { course_name: string };
  enrollment_date: string;
}

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState<any>(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);

  const columns: GridColDef[] = [
    {
      field: "student_name",
      headerName: "Student",
      flex: 2,
    },
    {
      field: "course_name",
      headerName: "Course",
      flex: 2,
    },
    { field: "enrollment_date", headerName: "Enrollment Date", flex: 1 },
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
    fetchData(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      // DRF's pagination expects page numbers starting from 1, so adjust as needed
      const response = await axios.get(
        "http://127.0.0.1:8000/api/enrollments/",
        {
          params: {
            page: page + 1, // Convert zero-based page to one-based page
            page_size: pageSize,
          },
        }
      );
      setEnrollments(response.data.results);
      setTotalCount(response.data.count);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedEnrollment(null);
    setOpenForm(true);
  };

  const handleEdit = (enrollment: Enrollment) => {
    setSelectedEnrollment(enrollment);
    setOpenForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/enrollments/${id}`);
      setEnrollments((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting enrollment:", error);
    }
  };

  // Callback passed to EnrollmentForm to refresh data after save
  const handleSave = () => {
    fetchData(paginationModel.page, paginationModel.pageSize);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Enrollments</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleCreate}
              >
                Add Enrollment
              </Button>
            </Box>

            {loading ? (
              <CircularProgress />
            ) : (
              <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                  rows={enrollments}
                  columns={columns}
                  paginationMode="server"
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  rowCount={totalCount}
                  pageSizeOptions={[10, 20, 50]}
                  disableRowSelectionOnClick
                />
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>

      <EnrollmentForm
        open={openForm}
        enrollment={selectedEnrollment}
        onClose={() => setOpenForm(false)}
        onSave={handleSave}
      />
    </Box>
  );
};

export default Enrollments;
