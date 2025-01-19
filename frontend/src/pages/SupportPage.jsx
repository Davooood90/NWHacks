import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
} from "@mui/material";

const HelpCards = () => {
  const cardData = [
    {
      title: "It's my first time using NestEd.",
      description:
        "View our how-to manual for your first time using NestEd to ensure you have a seamless experience.",
      buttonText: "Manual",
    },
    {
      title: "Do I need to pay to use NestEd?",
      description:
        "No, NestEd is a free service. Please consider supporting us so we can remain free!",
      buttonText: "Buy us a coffee",
    },
    {
      title: "How can I join the team?",
      description:
        "NestEd is only possible with its dedicated team. To join, send a message to a current team member!",
      buttonText: "Team",
    },
    {
      title: "NestEd read my syllabus wrong.",
      description:
        "We’re sorry to hear you had problems with our service! Help us improve by reporting it.",
      buttonText: "Report a bug",
    },
    {
      title: "I’m scared of privacy leaks.",
      description:
        "NestEd doesn’t store private user information in accounts. Read our privacy terms for more.",
      buttonText: "Privacy Terms",
    },
    {
      title: "I have more questions.",
      description:
        "Our team is here to help! Contact us to ask a question or learn more about NestEd.",
      buttonText: "Contact us",
    },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        pt: 5,
      }}
    >
      <Grid container spacing={4} sx={{ padding: "20px" }}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: "#f7f0ff",
                borderRadius: "8px",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  <Typography variant="h6" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {card.description}
                  </Typography>
                </div>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: "#65558F",
                    color: "#fff",
                    textTransform: "none",
                    mt: 2,
                    alignSelf: "flex-end", // Optional, to align the button to the right (you can remove this if you prefer centered)
                  }}
                >
                  {card.buttonText}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HelpCards;
