import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";

const GradesDashboard = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        pt: 10,
        pb: 2,
      }}
    >
      <Box>
        <Typography variant="h6" gutterBottom sx={{ marginBottom: 3 }}>
          Your Grades
        </Typography>

        {/* Search Bar */}
        <Box sx={{ marginBottom: 3 }}>
          <TextField
            label="Search course"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: { backgroundColor: "#fff" },
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {/* Left Panel: Course Grades */}
          <Grid item xs={12} md={6}>
            <Box component={Paper} sx={{ padding: 2, bgcolor: "#FEF7FF" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="h7"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Course Name
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    # Credits
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    marginBottom: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      fontSize: 11,
                      height: 30,
                      textTransform: "none",
                      bgcolor: "#6C4BAE",
                    }}
                  >
                    Highest Possible: %
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      fontSize: 11,
                      height: 30,
                      textTransform: "none",
                      bgcolor: "#6C4BAE",
                    }}
                  >
                    Current Grade: %
                  </Button>
                </Box>
              </Box>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Assessment</TableCell>
                      <TableCell align="right">Obtained</TableCell>
                      <TableCell align="right">Possible</TableCell>
                      <TableCell align="right">Weight</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Assessment Name</TableCell>
                      <TableCell align="right">#</TableCell>
                      <TableCell align="right">#</TableCell>
                      <TableCell align="right">%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>

          {/* Right Panel: Final Grades */}
          <Grid item xs={12} md={6}>
            <Box component={Paper} sx={{ padding: 2, bgcolor: "#FEF7FF" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="h7"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Final Grades
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    # Credits Total
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    marginBottom: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      fontSize: 11,
                      height: 30,
                      textTransform: "none",
                      bgcolor: "#6C4BAE",
                    }}
                  >
                    Highest Possible: %
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      fontSize: 11,
                      height: 30,
                      textTransform: "none",
                      bgcolor: "#6C4BAE",
                    }}
                  >
                    Current Grade: %
                  </Button>
                </Box>
              </Box>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Course</TableCell>
                      <TableCell align="right">Credits</TableCell>
                      <TableCell align="right">Highest</TableCell>
                      <TableCell align="right">Current</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Assessment Name</TableCell>
                      <TableCell align="right">#</TableCell>
                      <TableCell align="right">#</TableCell>
                      <TableCell align="right">%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default GradesDashboard;
