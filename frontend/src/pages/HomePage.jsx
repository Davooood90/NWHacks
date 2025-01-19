import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Box, Container, Typography } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
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
        sx={{
          width: "100%",
          textAlign: "left",
        }}
      >
        <SvgIcon sx={{ width: 170, height: 170 }}>
          <svg
            viewBox="0 0 183 154"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M52.1645 98.2658C49.3265 59.0103 80.2033 44.8629 109.824 31.2909C128.569 22.7025 146.81 14.3444 155.687 0C155.687 0 168.613 45.0235 144.609 74.9188C120.606 104.814 99.585 108.555 59.5772 105.329C89.8718 97.1194 102.46 87.6358 119.285 64.4433C95.6321 80.1438 81.2936 87.9008 52.1645 98.2658ZM183 63.388C183 87.4151 174.544 110.458 159.491 127.448C144.439 144.437 124.024 153.982 102.737 153.982C81.4497 153.982 61.0345 144.437 45.9822 127.448C35.3641 115.463 28.0282 100.466 24.6276 84.2362L0 63.388H24.3324L35.9987 63.388C35.9987 83.3663 43.0301 102.526 55.5459 116.653C68.0617 130.78 85.0368 138.716 102.737 138.716C120.437 138.716 137.412 130.78 149.928 116.653C162.444 102.526 169.475 83.3663 169.475 63.388H183Z"
              fill="#49454F"
            />
          </svg>
        </SvgIcon>

        <Typography variant="h2" gutterBottom>
          NestEd
        </Typography>
        <Typography variant="body1">
          A nest for your education so your future can take flight.
        </Typography>

        <Button
          onClick={() => {
            navigate("/app");
          }}
          sx={{
            marginTop: 6,
            borderRadius: 5,
            textTransform: "none",
            boxShadow: "none",
            border: 0,
            backgroundColor: "#65558F",
          }}
          variant="contained"
        >
          Take me to the app
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
