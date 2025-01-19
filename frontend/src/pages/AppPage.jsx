import { React, useEffect, useState } from "react";
import { Container, Box, Typography, Avatar, ButtonBase } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import moment from "moment";

function Course(
  courseName,
  courseMode,
  instructor,
  schedule,
  format,
  credits,
  description,
  term
) {
  this.courseName = courseName;
  this.courseMode = courseMode;
  this.instructor = instructor;
  this.schedule = schedule;
  this.format = format;
  this.credits = credits;
  this.description = description;
  this.term = term;
  this.time = "";

  this.title = ""; //COMM 192
  this.location = ""; //location
  this.type = format || "Lab"; //format
  this.action = "View more"; //action
  this.details = description; //description
}

function areCoursesEqual(courseA, courseB) {
  return (
    courseA.courseName === courseB.courseName &&
    courseA.courseMode === courseB.courseMode &&
    JSON.stringify(courseA.schedule) === JSON.stringify(courseB.schedule) &&
    courseA.format === courseB.format
  );
}

const yeet = [
  { type: "Lec", course: "MATH 101", time: "10:00 AM - 12:00 PM" },
  { type: "Lec", course: "CPSC 121", time: "12:30 PM - 02:00 PM" },
  { type: "Lec", course: "COMM 101", time: "02:00 PM - 03:30 PM" },
  { type: "Dis", course: "ECON 102", time: "04:00 PM - 05:00 PM" },
];

const courses = {};

let plan = [];

let courL = [];

const schedule_t1 = {
  Mon: [],
  Tue: [],
  Wed: [],
  Thu: [],
  Fri: [],
};

const schedule_t2 = {
  Mon: [],
  Tue: [],
  Wed: [],
  Thu: [],
  Fri: [],
};

let quote;

const currentDate = new Date();

const dayOfWeek = currentDate.getDay();
const currentMonth = currentDate.getMonth();

const formattedDate = currentDate.toLocaleString(); // Converts to a readable string

const AppPage = () => {
  const [name, setName] = useState("");

  const StringToCal = (cour) => {
    const name = cour.courseName;
    const description = cour.description;
    const inputString = cour.schedule;

    const temp = inputString.split(" | ");

    const date = temp[0].split(" - ");
    const time = temp[2].split(" - ");
    const nam = name.split(" - ");
    const loc = temp[3].split("\n");

    const startDate = date[0]; // 2025-01-10
    const endDate = date[1]; // 2025-02-14
    const daysOfWeek = temp[1]; // Fri
    const startTime = time[0]; // 11:00 a.m.
    const endTime = time[1]; // 12:00 p.m.
    const location = loc[0]; // FSC-Floor 1-Room 1221

    const startDateFormatted = startDate.replace(/-/g, "");
    const endDateFormatted = endDate.replace(/-/g, "");

    cour.time = `${startTime} - ${endTime}`;
    cour.title = nam[0];
    cour.location = location;

    // console.log(cour.time);

    if (!courL.some((course) => areCoursesEqual(course, cour))) {
      courL.push(cour); // Add it to the set only if it's not a duplicate
    }

    if (cour.term == 1) {
      daysOfWeek.split(" ").map((day) => {
        if (!schedule_t1[day].some((course) => areCoursesEqual(course, cour))) {
          schedule_t1[day].push(cour); // Add it to the set only if it's not a duplicate
        }
      });
    } else {
      daysOfWeek.split(" ").map((day) => {
        if (!schedule_t2[day].some((course) => areCoursesEqual(course, cour))) {
          schedule_t2[day].push(cour); // Add it to the set only if it's not a duplicate
        }
      });
    }
  };

  const CourseList = async (res) => {
    for (let i = 0; i < res.length; i++) {
      const description = `
        course: ${res[i]["section"]} \n
        credit: ${res[i]["credits"]} \n
        format: ${res[i]["format"]} \n
        mode: ${res[i]["mode"]} \n
        instructor: ${res[i]["instructor"]} \n
      `;

      const cour = new Course(
        res[i]["section"],
        res[i]["mode"],
        res[i]["instructor"],
        res[i]["meeting"],
        res[i]["format"],
        res[i]["credits"],
        description,
        res[i]["term"]
      );

      const name = res[i]["name"];

      const meetings = res[i]["meeting"]
        .split("\n")
        .filter((item) => item !== "");
      for (const meeting of meetings) {
        StringToCal(cour);
        courses[name] = [description, meeting];
      }
    }

    // console.log(courses);
    // console.log(schedule_t1);
    // console.log(schedule_t2);
    const isInRange =
      (currentMonth >= 0 && currentMonth <= 3) ||
      (currentMonth >= 6 && currentMonth <= 7);
    let schedule;
    if (isInRange) {
      schedule = schedule_t2;
    } else {
      schedule = schedule_t1;
    }

    switch (dayOfWeek) {
      case 0:
        plan = schedule["Mon"] || []; // Ensure it's always an array
        break;
      case 1:
        plan = schedule["Mon"] || [];
        break;
      case 2:
        plan = schedule["Tue"] || [];
        break;
      case 3:
        plan = schedule["Wed"] || [];
        break;
      case 4:
        plan = schedule["Thu"] || [];
        break;
      case 5:
        plan = schedule["Fri"] || [];
        break;
      case 6:
        plan = schedule["Mon"] || [];
        break;
      default:
        plan = [];
        break;
    }

    sessionStorage.setItem("allClasses", JSON.stringify(courL));
    sessionStorage.setItem("schedule", JSON.stringify(schedule));
  };

  const fetchMotivationalQuote = async () => {
    try {
      const response = await fetch("https://zenquotes.io/api/random/");
      const data = await response.json(); // Parse the JSON data

      // Get the quote and author
      quote = data[0].q;

      console.log(quote);
    } catch (error) {
      console.error("Error fetching the quote:", error);
    }
  };

  const Fetchdb = async (cred) => {
    try {
      const response = await axios.get("http://localhost:3000/search", {
        params: { email: cred },
      });

      const res = response.data[0];

      setName(res["name"]);

      CourseList(res["courseList"]);

      fetchMotivationalQuote();

      sessionStorage.setItem("plan", JSON.stringify(plan));
      sessionStorage.setItem("res", JSON.stringify(res));

      console.log(plan);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Using useEffect to call Fetchdb on page load
  useEffect(() => {
    const cred = sessionStorage.getItem("userEmail"); // Replace with the actual user credentials
    Fetchdb(cred);
    sessionStorage.removeItem("userAvator");
    sessionStorage.removeItem("schedule");
    sessionStorage.removeItem("res");
    sessionStorage.removeItem("plan");
    sessionStorage.removeItem("allClasses");
  }, []); // Empty dependency array means this will run only once when the component mounts

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
              src={sessionStorage.getItem("userAvator")}
            />
            <Typography variant="h6">Good morning, {name}!</Typography>
            <Typography variant="body1" color="text.secondary">
              {quote}
            </Typography>
          </Box>

          {/* Right Section */}
          <Box width={"40%"} maxHeight={"70vh"} overflow="auto">
            <Typography variant="h5" gutterBottom>
              Up Coming Classes
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{ mb: 4 }}
            >
              {formattedDate}
            </Typography>
            <Grid container spacing={2}>
              {plan
                .sort((a, b) => {
                  // Convert time to 24-hour format for comparison
                  const timeA = moment(a.time, ["h:mm A"]).format("HH:mm");
                  const timeB = moment(b.time, ["h:mm A"]).format("HH:mm");

                  const minutesA =
                    parseInt(timeA.split(":")[0]) * 60 +
                    parseInt(timeA.split(":")[1]);
                  const minutesB =
                    parseInt(timeB.split(":")[0]) * 60 +
                    parseInt(timeB.split(":")[1]);

                  return minutesA - minutesB;
                })
                .map((item, index) => (
                  <Grid item xs={12} key={index}>
                    {/* Entire Card is a Button */}
                    <ButtonBase
                      onClick={() => navigate(`/app/`)}
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
                              width: 70,
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
                              {item.courseMode}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: 200,
                            }}
                          >
                            <Typography variant="subtitle1">
                              {item.courseName}
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
