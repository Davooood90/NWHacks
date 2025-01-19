import React from "react";
import { Container, Box, Typography, Avatar, ButtonBase } from "@mui/material";
import Grid from "@mui/material/Grid2";

const schedule = [
  { type: "Lec", course: "MATH 101", time: "10:00 AM - 12:00 PM" },
  { type: "Lec", course: "CPSC 121", time: "12:30 PM - 02:00 PM" },
  { type: "Lec", course: "COMM 101", time: "02:00 PM - 03:30 PM" },
  { type: "Dis", course: "ECON 102", time: "04:00 PM - 05:00 PM" },
];

const AppPage = () => {
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          minHeight="100vh"
          p={4}
        >
          {/* Left Section */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width={"60%"}
          >
            <Avatar
              sx={{ width: 200, height: 200, bgcolor: "grey.400", mb: 2 }}
            />
            <Typography variant="h6">Good morning, user_name!</Typography>
            <Typography variant="body1" color="text.secondary">
              Motivational quote
            </Typography>
          </Box>

          {/* Right Section */}
          <Box width={"40%"}>
            <Typography variant="h5" gutterBottom>
              Today’s Plan
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{ mb: 4 }}
            >
              Thursday, January 17th, 2024
            </Typography>
            <Grid container spacing={2}>
              {schedule.map((item, index) => (
                <Grid item xs={12} key={index}>
                  {/* Entire Card is a Button */}
                  <ButtonBase
                    onClick={() => console.log(`Clicked on ${item.course}`)}
                    sx={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      borderRadius: 2,
                      "&:hover": { boxShadow: 3 },
                    }}
                  >
                    <Box
                      sx={{
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        p: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        bgcolor: "#FEF7FF",
                      }}
                    >
                      {/* Type and Course */}
                      <Box display="flex" alignItems="center">
                        {/* Purple Circle */}
                        <Box
                          sx={{
                            width: 30,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mr: 2,
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="purple"
                            fontWeight="bold"
                          >
                            {item.type}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: 200,
                          }}
                        >
                          <Typography variant="subtitle1">
                            {item.course}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.time}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AppPage;
