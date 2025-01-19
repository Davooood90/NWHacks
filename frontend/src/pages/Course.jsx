import {React, useEffect} from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const courses = [
  {
    title: "COMM 192",
    location: "ANGU-Floor 2-Room 295",
    type: "Discussion",
    action: "View more",
    credits: 3,
    details: {
      instructor: "Robert Gateman",
      materials: "MyLab, gBook, Power Point Slides",
      midterms: [
        { title: "Midterm 1", date: "February 7th, 2024" },
        { title: "Midterm 2", date: "March 14th, 2024" },
      ],
      finalExam: "Exam Period: April 12th to 27th, 2024",
      additionalInfo: [
        "You will require a reliable computer with fast WiFi connectivity and a mobile device for TopHat.",
        "The lectures are in-person, in the classroom and are not recorded.",
        "Tutorials start the second week of the course.",
        "Attendance is expected; attendance will be randomly recorded via TopHat.",
      ],
    },
  },
  {
    title: "ECON 102",
    location: "IRC-Floor B1-Room 2",
    type: "Discussion",
    action: "View more",
  },
  {
    title: "CPSC 121",
    location: "GEOG-Floor 1-Room 100",
    type: "Lab",
    action: "View more",
  },
  {
    title: "MATH 101",
    location: "IRC-Floor B1-Room 2",
    type: "Lecture",
    action: "Upload syllabus",
  },
  {
    title: "COMM 101",
    location: "ANGU-Floor 4 & 5-Room 492",
    type: "Lecture",
    action: "Upload syllabus",
  },
];

let classList = [];

const Courses = () => {
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleOpen = (course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null);
  };

  const init = () => {
    const temp = sessionStorage.getItem('allClasses');
    const jsonObj = JSON.parse(temp);

    classList = [];
    let seen = new Set(); // To track unique combinations of title and location
    
    for (let i = 0; i < jsonObj.length; i++) {
      const currentClass = jsonObj[i];
    
      // Check if the combination of title and location already exists
      const identifier = `${currentClass.title}-${currentClass.location}`;
      
      if (!seen.has(identifier)) {
        seen.add(identifier);
        classList.push({
          title: currentClass['title'],
          location: currentClass['location'],
          type: currentClass['type'],
          action: currentClass['action'],
          credits: currentClass['credits'],
          details: currentClass['details']
        });
      }
    }

    // console.log(classList);
  };

  useEffect(() => {
    init();
  }, []);

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
        <Typography variant="h6" sx={{ marginBottom: 3 }}>
          Your Courses
        </Typography>
        <Grid container spacing={3}>
          {classList.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ borderRadius: 2, boxShadow: 3, bgcolor: "#FEF7FF" }}>
                <CardContent>
                  <Typography gutterBottom>{course.title}</Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {course.location}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, marginBottom: 2 }}>
                    {/* Render Lecture, Discussion, and Lab buttons */}
                    {["Lecture", "Discussion", "Lab"].map((type, idx) => (
                      <Button
                        key={idx}
                        variant="contained"
                        size="small"
                        sx={{
                          textTransform: "none",
                          fontSize: "11px",
                          bgcolor: course.type === type ? "#E8DEF8" : "white",
                          color: "grey.800",
                          border: "1px solid #E8DEF8",
                          boxShadow: "none",
                          "&:hover": {
                            boxShadow: "none",
                          },
                        }}
                      >
                        {type}
                      </Button>
                    ))}
                  </Box>

                  <Box sx={{ marginBottom: 2 }}>
                    {/* Google Maps Embed */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5207.221445035165!2d-123.25636882345813!3d49.26482387139015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548672b5db6faaeb%3A0x7d0e6eae5fc5e75!2sUBC%20Sauder%20School%20of%20Business!5e0!3m2!1sen!2sca!4v1737283234349!5m2!1sen!2sca"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      fontSize: "11px",
                      backgroundColor: "#6C4BAE",
                    }}
                    onClick={() => handleOpen(course)}
                  >
                    {course.action}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* Dialog for Course Details */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        {selectedCourse && (
          <>
            <DialogTitle>
              {selectedCourse.title} ({selectedCourse.credits} credits)
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ marginBottom: 2 }}>
                {/* Google Maps Embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5207.221445035165!2d-123.25636882345813!3d49.26482387139015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548672b5db6faaeb%3A0x7d0e6eae5fc5e75!2sUBC%20Sauder%20School%20of%20Business!5e0!3m2!1sen!2sca!4v1737283234349!5m2!1sen!2sca"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
              <Typography variant="body1" gutterBottom>
                <strong>Course Title:</strong>{" "}
                {selectedCourse.details.instructor}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Instructor:</strong> {selectedCourse.details.instructor}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Materials:</strong> {selectedCourse.details.materials}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Exams:</strong>
              </Typography>
              {selectedCourse.details.midterms.map((exam, idx) => (
                <Typography key={idx} variant="body2" gutterBottom>
                  {exam.title}: {exam.date}
                </Typography>
              ))}
              <Typography variant="body2" gutterBottom>
                Final Exam: {selectedCourse.details.finalExam}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Additional Information:</strong>
              </Typography>
              <ul>
                {selectedCourse.details.additionalInfo.map((info, idx) => (
                  <li key={idx}>
                    <Typography variant="body2">{info}</Typography>
                  </li>
                ))}
              </ul>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClose}
                sx={{ textTransform: "none" }}
              >
                Upload new syllabus
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClose}
                sx={{ textTransform: "none" }}
              >
                View your grades
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Courses;
