import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import { SvgIcon } from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";
import davidAvatar from "../assets/david-avatar.jpg";
import juliannaAvatar from "../assets/julianna-avatar.jpg";
import moAvatar from "../assets/mo-avatar.jpg";
import carysAvatar from "../assets/carys-avatar.jpg";

const teamMembers = [
  {
    name: "David Liu",
    role: "Computer Science",
    year: "UBC Year 1",
    description:
      "Front-end and back-end developer for NestEd. While Cyber Security, Artificial Intelligence, and Algorithms have been my primary focus, I'm also eager to explore other areas within tech!",
    avatar: davidAvatar, // Replace with the avatar URL
  },
  {
    name: "Julianna Huang",
    role: "Business + Computer Science",
    year: "UBC Year 1",
    description:
      "Product manager and UX/UI designer for NestEd. I love Sudoku, Tetris, and all problem-solving. Always interested in bringing diverse minds together to make a positive difference!",
    avatar: juliannaAvatar,
  },
  {
    name: "Mo Ngai",
    role: "Computer Engineering",
    year: "UBC Year 3",
    description:
      "Back-end developer for NestEd. Passionate about continuous learning and hands-on experiences, I thrive on challenges that contribute to my growth in robotics and tech.",
    avatar: moAvatar,
  },
  {
    name: "Carys Fong",
    role: "Business + Computer Science",
    year: "UBC Year 1",
    description: "UX/UI designer for NestEd.",
    avatar: carysAvatar,
  },
];

const TeamSection = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pt: 4,
      }}
    >
      <Box sx={{ padding: "3rem" }}>
        <Typography variant="h4" align="center" gutterBottom>
          NestEd{" "}
          <SvgIcon sx={{ width: 30, height: 30 }}>
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
          {"  "}
          was <b>made with love ❤️</b>
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          sx={{ marginBottom: "2rem" }}
        >
          Born at Western Canada’s largest hackathon, NestEd embodied
          collaboration among beginner hackers. Our team is driven by helping
          students like ourselves.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  height: 500, // Set a fixed height
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "none",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    sx={{
                      width: 150,
                      height: 150,
                      margin: "0 auto",
                      marginBottom: "1rem",
                    }}
                  />
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {member.role}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {member.year}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: "1rem" }}>
                    {member.description}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    marginTop: "1rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <IconButton href="#" target="_blank">
                    <GitHub />
                  </IconButton>
                  <IconButton href="#" target="_blank">
                    <LinkedIn />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography align="center" sx={{ marginTop: "2rem" }}>
          <b>Join the team!</b> Be a part of creating the magic. Contact any of
          us through LinkedIn.
        </Typography>
      </Box>
    </Container>
  );
};

export default TeamSection;
