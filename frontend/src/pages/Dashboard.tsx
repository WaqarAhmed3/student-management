import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, CircularProgress, Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  getEnrollmentsPerCourse,
  getStudentDistribution,
} from "../services/enrollmentService";

interface ChartData {
  course: string;
  count: number;
}

const Dashboard: React.FC = () => {
  const [enrollmentsPerCourse, setEnrollmentsPerCourse] = useState<ChartData[]>(
    []
  );
  const [studentDistribution, setStudentDistribution] = useState<ChartData[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const COLORS: string[] = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#00C49F",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrollmentsData, distributionData] = await Promise.all([
          getEnrollmentsPerCourse(),
          getStudentDistribution(),
        ]);
        setEnrollmentsPerCourse(enrollmentsData);
        setStudentDistribution(distributionData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          System Overview
        </Typography>
      </Grid>

      {/* Full-width Enrollments per Course */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              zIndex: 1,
              backgroundColor: "background.paper",
              p: 1,
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Enrollment Counts
            </Typography>
            {enrollmentsPerCourse.map((entry, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    backgroundColor: COLORS[index % COLORS.length],
                    mr: 1,
                  }}
                />
                <Typography variant="body2">
                  {entry.course}: {entry.count}
                </Typography>
              </Box>
            ))}
          </Box>

          <Typography variant="h6" gutterBottom>
            Enrollments per Course
          </Typography>
          <Box sx={{ width: 1000, height: 500, mx: "auto" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={enrollmentsPerCourse}
                margin={{ top: 20, right: 20, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="course"
                  angle={-30}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count">
                  {enrollmentsPerCourse.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* Student Distribution below */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Student Distribution
          </Typography>
          <Box sx={{ height: 400, display: "flex" }}>
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={studentDistribution}
                  dataKey="count"
                  nameKey="course"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label
                >
                  {studentDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <Box
              sx={{
                width: "40%",
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {studentDistribution.map((entry, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: COLORS[index % COLORS.length],
                      mr: 1,
                    }}
                  />
                  <Typography variant="body2">
                    {entry.course}: {entry.count} (
                    {(
                      (entry.count /
                        studentDistribution.reduce(
                          (acc, cur) => acc + cur.count,
                          0
                        )) *
                      100
                    ).toFixed(1)}
                    % )
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

// import React, { useEffect, useState } from "react";
// import { Grid, Paper, Typography, CircularProgress } from "@mui/material";
// import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// interface ChartData {
//   course: string;
//   count: number;
// }

// const Dashboard: React.FC = () => {
//   const [enrollmentsPerCourse, setEnrollmentsPerCourse] = useState<ChartData[]>(
//     []
//   );
//   const [studentDistribution, setStudentDistribution] = useState<ChartData[]>(
//     []
//   );
//   const [loading, setLoading] = useState(true);
//   const COLORS: string[] = [
//     "#0088FE",
//     "#00C49F",
//     "#FFBB28",
//     "#FF8042",
//     "#00C49F",
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [enrollmentsRes, distributionRes] = await Promise.all([
//           axios.get(
//             "http://127.0.0.1:8000/api/enrollments/enrollments_per_course/"
//           ),
//           axios.get(
//             "http://127.0.0.1:8000/api/enrollments/student_distribution/"
//           ),
//         ]);

//         setEnrollmentsPerCourse(
//           enrollmentsRes.data.map((item: any) => ({
//             course: item.course__course_name,
//             count: item.count,
//           }))
//         );

//         setStudentDistribution(
//           distributionRes.data.map((item: any) => ({
//             course: item.course__course_name,
//             count: item.count,
//           }))
//         );

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <CircularProgress />;
//   }

//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12}>
//         <Typography variant="h4" gutterBottom>
//           System Overview
//         </Typography>
//       </Grid>

//       <Grid item xs={12} md={6}>
//         <Paper sx={{ p: 2 }}>
//           <Typography variant="h6" gutterBottom>
//             Enrollments per Course
//           </Typography>
//           <BarChart
//             width={500}
//             height={300}
//             data={enrollmentsPerCourse}
//             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="course" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="count" fill="#8884d8" />
//           </BarChart>
//         </Paper>
//       </Grid>

//       <Grid item xs={12} md={6}>
//         <Paper sx={{ p: 2 }}>
//           <Typography variant="h6" gutterBottom>
//             Student Distribution
//           </Typography>
//           <PieChart width={500} height={300}>
//             <Pie
//               data={studentDistribution}
//               dataKey="count"
//               nameKey="course"
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               fill="#8884d8"
//               label
//             >
//               {studentDistribution.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// export default Dashboard;
