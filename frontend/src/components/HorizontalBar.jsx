import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const pages = ["Dashboard", "Timetable", "Courses", "Grades"];

function ResponsiveAppBar() {
  const [activePage, setActivePage] = React.useState("Dashboard");

  const handleNavClick = (page) => {
    setActivePage(page);
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
                onClick={() => handleNavClick(page)}
                sx={{
                  my: 2,
                  color: activePage === page ? "black" : "gray",
                  fontWeight: activePage === page ? "bold" : "normal",
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
