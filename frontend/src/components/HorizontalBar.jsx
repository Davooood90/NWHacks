import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation

const pages = ["Dashboard", "Timetable", "Courses", "Grades"];
const pageRoutes = {
  Dashboard: "/app",
  Timetable: "/app/timetable",
  Courses: "/app/courses",
  Grades: "/app/grades",
};

function ResponsiveAppBar() {
  const location = useLocation(); // Get the current location (URL)
  const navigate = useNavigate(); // Initialize navigate hook

  const handleNavClick = (page) => {
    navigate(pageRoutes[page]); // Navigate to the selected route
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "transparent",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavClick(page)} // Trigger handleNavClick
                sx={{
                  my: 2,
                  color:
                    location.pathname === pageRoutes[page] ? "black" : "gray", // Highlight based on current path
                  fontWeight:
                    location.pathname === pageRoutes[page] ? "bold" : "normal", // Bold based on current path
                  textTransform: "none",
                  fontSize: "16px",
                  px: 2,
                  "&:hover": {
                    color: "black",
                  },
                  bgcolor: "transparent",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
