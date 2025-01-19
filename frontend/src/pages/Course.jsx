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

// const courses = [
//   {
//     title: "COMM 192",
//     location: "ANGU-Floor 2-Room 295",
//     type: "Discussion",
//     action: "View more",
//     credits: 3,
//     details: {
//       instructor: "Robert Gateman",
//       materials: "MyLab, gBook, Power Point Slides",
//       midterms: [
//         { title: "Midterm 1", date: "February 7th, 2024" },
//         { title: "Midterm 2", date: "March 14th, 2024" },
//       ],
//       finalExam: "Exam Period: April 12th to 27th, 2024",
//       additionalInfo: [
//         "You will require a reliable computer with fast WiFi connectivity and a mobile device for TopHat.",
//         "The lectures are in-person, in the classroom and are not recorded.",
//         "Tutorials start the second week of the course.",
//         "Attendance is expected; attendance will be randomly recorded via TopHat.",
//       ],
//     },
//   },
//   {
//     title: "ECON 102",
//     location: "IRC-Floor B1-Room 2",
//     type: "Discussion",
//     action: "View more",
//   },
//   {
//     title: "CPSC 121",
//     location: "GEOG-Floor 1-Room 100",
//     type: "Lab",
//     action: "View more",
//   },
//   {
//     title: "MATH 101",
//     location: "IRC-Floor B1-Room 2",
//     type: "Lecture",
//     action: "Upload syllabus",
//   },
//   {
//     title: "COMM 101",
//     location: "ANGU-Floor 4 & 5-Room 492",
//     type: "Lecture",
//     action: "Upload syllabus",
//   },
// ];

const googleMap = {
  FSC : "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2603.8058819608514!2d-123.2496665906919!3d49.261125125718486!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5486735f5e5ce1bf%3A0xf8eebb3d6669987c!2sUBC%20Forest%20Sciences%20Centre%20(FSC)!5e0!3m2!1sen!2sca!4v1737305569835!5m2!1sen!2sca",
  CHBE : "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2603.740779415785!2d-123.2500252!3d49.262359!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548672c99e1f0ebd%3A0x75588dc5d8dbcfe5!2sUBC%20Chemical%20and%20Biological%20Engineering%20Building%20(CHBE)!5e0!3m2!1sen!2sca!4v1737305635803!5m2!1sen!2sca",
  CEME : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5207.433829083475!2d-123.2489328!3d49.262811299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548672c989161975%3A0x798d600622fd2267!2sCivil%20and%20Mechanical%20Engineering%20Building%20(CEME)!5e0!3m2!1sen!2sca!4v1737305677946!5m2!1sen!2sca",
  MCLD : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5207.560513231968!2d-123.24941070000001!3d49.26161079999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548672ca2ddce785%3A0xeed9111ae157bfb6!2sMacLeod%20Building!5e0!3m2!1sen!2sca!4v1737305708689!5m2!1sen!2sca",
  ICCS : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2603.798385798924!2d-123.24893130000001!3d49.261267200000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548672ca24d64bc7%3A0xaa87eeb3a3f3d60!2sICICS%2FCS%20Building%20(ICCS)!5e0!3m2!1sen!2sca!4v1737305736211!5m2!1sen!2sca",
  SWNG : "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2603.7131683274506!2d-123.2569674!3d49.2628823!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548672ca7f5f71c1%3A0x5594f7f497661f04!2sWest%20Mall%20Swing%20Space!5e0!3m2!1sen!2sca!4v1737305769572!5m2!1sen!2sca",
  ORCH : "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2603.855416136603!2d-123.2534437!3d49.2601863!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673ae70c956a3%3A0xa80784a84cf19ebe!2sUBC%20Orchard%20Commons%20(ORCH)%203rd%20Floor%20High%20Tech%20Study%20Nook!5e0!3m2!1sen!2sca!4v1737305791053!5m2!1sen!2sca"
}

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
                    {["Lecture", "Discussion", "Laboratory"].map((type, idx) => (
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
                      src= {googleMap[course.location.split('-')[0]]}
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
            <DialogContent>
              <Typography variant="body1" gutterBottom>
                <strong>Course Title:</strong>{" "}
                {selectedCourse.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Details:</strong>{" "}
                {selectedCourse.details}
              </Typography>
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
