import React from "react";
import { Grid, Typography, Box, Button, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import { SvgIcon } from "@mui/material";
import ImageOne from "../assets/imageone.png";
import ImageTwo from "../assets/imagetwo.png";
import ImageThree from "../assets/imagethree.png";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

const features = [
  {
    id: 1,
    title:
      "Access your timetable at your finger tips by exporting to your favourite calendar app.",
    description:
      "Three clicks. Export from Workday, import to NestEd. Into your most frequently used calendar website/app. NestEd brings convenience, so you don’t need to sweat the small stuff.\n\nDon’t use other productivity tools? No worries. NestEd features a built-in timetable that’s pretty, user-friendly, and accessible. We’ll make sure you’re not late to your next class!",
    image: ImageOne, // Replace with the actual image path
    alignment: "left",
  },
  {
    id: 2,
    title:
      "Have the most important parts of your syllabus highlighted so you won’t forget.",
    description:
      "Keep on forgetting the textbooks you need for classes? Can’t remember your professor’s names? Winging tests because you don’t know when they are?\n\nWe know. The course syllabus is often dry, long, and boring. It’s difficult to retain information when they’re in 8 point Arial font paragraphs. Remembering the most important aspects of each class is easy with NestEd. Just upload your course syllabus and we’ll do the hard part!",
    image: ImageTwo, // Replace with the actual image path
    alignment: "right",
  },
  {
    id: 3,
    title:
      "Know exactly what you need for that A+ in every class with our grade calculator.",
    description:
      "Put your hand up if you’ve opened RapidTables immediately after a bad exam just to see how much you needed to pass the course. Okay okay... you can put your hand down now.\n\nWe get it. Your Sauder classes count on that 10% participation grade, and your math WebWorks stress you out. Let us lift some of that burden off of your shoulders, so you can focus on the actual learning. Our automatic grade calculator is extracted straight from your course syllabus, so you know exactly how your professor will be calculating your grade!\n\nWe’ll be your nest. No surprises here.",
    image: ImageThree, // Replace with the actual image path
    alignment: "left",
  },
];

const FeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pt: 5,
      }}
    >
      <Box sx={{ padding: "2rem", pb: 0 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ marginBottom: 8 }}
        >
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
          {"  "}builds a cozy nest with three key features.
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid
              key={feature.id}
              container
              spacing={2}
              direction={feature.alignment === "left" ? "row" : "row-reverse"}
              sx={{
                alignItems: "center",
              }}
            >
              <Grid item xs={12} md={6}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  style={{
                    width: "100%",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  {feature.description}
                </Typography>

                {feature.id === 3 && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        marginTop: "1rem",
                        borderRadius: "20px",
                        backgroundColor: "#65558F",
                        color: "#fff",
                        textTransform: "none",
                      }}
                      onClick={() => {
                        navigate("/app");
                      }}
                    >
                      I’m ready for NestEd
                    </Button>
                    <Divider sx={{ marginTop: "2rem" }} />

                    <Box sx={{ marginTop: "2rem" }}>
                      <Typography variant="h6">
                        Don’t see what you want? Suggest a feature!
                      </Typography>
                    </Box>
                    <Box>
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        sx={{ marginTop: "1rem" }}
                      />
                      <TextField
                        fullWidth
                        label="Your big idea"
                        variant="outlined"
                        sx={{ marginTop: "1rem" }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          marginTop: "1rem",
                          borderRadius: "20px",
                          backgroundColor: "#65558F",
                          color: "#fff",
                          textTransform: "none",
                        }}
                      >
                        Send it over!
                      </Button>
                    </Box>
                  </>
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default FeaturesSection;
