import React, { useState, useEffect} from "react";
import { Box, Typography, Paper, Button, Modal, Grid } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import ShareIcon from "@mui/icons-material/Share";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import Calendar from "../components/Calendar";
import axios from "axios";
import * as XLSX from "xlsx";


// const scheduleData = [
//   { day: "Monday", time: "10 AM", course: "MATH 101", type: "Discussion" },
//   { day: "Monday", time: "11 AM", course: "CPSC 121", type: "Discussion" },
//   { day: "Monday", time: "1 PM", course: "COMM 192", type: "Lecture" },
//   { day: "Monday", time: "2 PM", course: "ECON 102", type: "Lecture" },
//   { day: "Tuesday", time: "1 PM", course: "CPSC 121", type: "Lecture" },
//   { day: "Tuesday", time: "2 PM", course: "COMM 101", type: "Lecture" },
//   { day: "Wednesday", time: "10 AM", course: "CPSC 121", type: "Lab" },
//   { day: "Wednesday", time: "1 PM", course: "COMM 192", type: "Lecture" },
//   { day: "Thursday", time: "10 AM", course: "MATH 101", type: "Lecture" },
//   { day: "Thursday", time: "1 PM", course: "CPSC 121", type: "Lecture" },
//   { day: "Friday", time: "10 AM", course: "COMM 101", type: "Discussion" },
//   { day: "Friday", time: "2 PM", course: "ECON 102", type: "Lecture" },
//   { day: "Friday", time: "3 PM", course: "COMM 101", type: "Lecture" },
// ];

let schedule = [];

const Schedule = () => {
  const courses = [
    {
      name: "ECON 101",
      section: "002",
      starttime: 11,
      endtime: 12,
      day: "Mon",
    },
    {
      name: "ECON 102",
      section: "002",
      starttime: 13,
      endtime: 15,
      day: "Mon",
    },
  ];

  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [files, setFiles] = useState([]);

  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openExportModal, setOpenExportModal] = useState(false);

  // Function to convert CSV to JSON
  const csvToJson = (csv) => {
    const lines = csv.trim().split("\n");
    const headers = lines[0].split(",").map((header) => header.trim());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(",");

      headers.forEach((header, index) => {
        obj[header] = currentline[index] ? currentline[index].trim() : "";
      });

      result.push(obj);
    }

    return result;
  };

  // Function to convert XLSX to JSON
  const xlsxToJson = (data) => {
    try {
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (!json || json.length === 0) {
        throw new Error("The XLSX file is empty or has invalid structure.");
      }

      const headers = json[0].map((header) => header.trim());
      const result = json.slice(1).map((row) => {
        const obj = {};
        row.forEach((cell, index) => {
          obj[headers[index] || `Column_${index + 1}`] = cell
            ? cell.toString().trim()
            : "";
        });
        return obj;
      });

      return result;
    } catch (error) {
      console.error("Error parsing XLSX file:", error);
      throw new Error(
        "Failed to parse XLSX file. Ensure it's a valid XLSX format."
      );
    }
  };

  const handleOpenUpload = () => setOpenUploadModal(true);
  const handleCloseUpload = () => setOpenUploadModal(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    const fileExtension = file.name.split(".").pop().toLowerCase();

    const reader = new FileReader();

    reader.onload = (event) => {
      const fileData = event.target.result;
      let json;

      if (fileExtension === "csv") {
        json = csvToJson(fileData);
      } else if (fileExtension === "xlsx") {
        json = xlsxToJson(fileData);
      }

      // Process the JSON data as per your original script
      if (json.length > 2 && json[2]["My Enrolled Courses"]) {
        const temp = json[2]["My Enrolled Courses"];
        const tempArr = temp.split(" - ");

        const userJson = {
          name: tempArr[0].replace(/[1234567890()]/g, "").trim(),
          id: tempArr[0].replace(/[a-zA-Z()]/g, "").trim(),
          faculty: tempArr[1],
          start_date: tempArr[2],
        };

        let courseL = [];

        for (let i = 2; i < json.length; i++) {
          if (!json[i]["My Enrolled Courses"]) continue;

          const term = json[i]["My Enrolled Courses"].includes("Term 1")
            ? 1
            : 2;
          const courseJson = {
            name: json[i]["Column_2"] || "",
            credits: json[i]["Column_3"] || "",
            grading: json[i]["Column_4"] || "",
            section: json[i]["Column_5"] || "",
            term: term,
            format: json[i]["Column_6"] || "",
            mode: json[i]["Column_7"] || "",
            meeting: json[i]["Column_8"] || "",
            status: json[i]["Column_9"] || "",
            instructor: json[i]["Column_10"] || "",
            start: json[i]["Column_11"] || "",
            end: json[i]["Column_12"] || "",
          };

          courseL.push(courseJson);
        }

        const userData = {
          name: userJson.name,
          id: userJson.id,
          faculty: userJson.name,
          start_date: userJson.start_date,
          courseList: courseL,
        };

        const savedEmail = sessionStorage.getItem("userEmail");

        const updates = {
          email: savedEmail,
          updates: userData,
        };

        axios.put("http://localhost:3000/update", updates);
      } else {
        console.warn(
          "The JSON structure does not contain 'My Enrolled Courses' at index 2."
        );
      }
    };

    if (fileExtension === "xlsx") {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  };

  const initialize = () => {
    let temp = sessionStorage.getItem("schedule");

    const jsonObject = JSON.parse(temp);
    
    console.log(jsonObject);

    for(let day in jsonObject) {
      for(let course in jsonObject[day]) {
        let dayOfWeek;
        switch(day) {
          case "Mon":
            dayOfWeek = "Monday";
          break;
          case "Tue":
            dayOfWeek = "Tuesday";
            break;
          case "Wed":
            dayOfWeek = "Wednesday";
            break;
          case "Thu":
            dayOfWeek = "Thursday";
            break;
          case "Fri":
            dayOfWeek = "Friday";
          break;
        }

        const tim = jsonObject[day][course]['time'].split(' - ');
        const nam = jsonObject[day][course]['courseName'].split(' - ');

        schedule.push({
          day: dayOfWeek, 
          start_time: tim[0], 
          end_time: tim[1],
          course: nam[0], 
          type: jsonObject[day][course]['courseMode']
        })
      }
    }

    console.log(schedule);
  };

  // useEffect hook to run once when the component is first rendered
  useEffect(() => {
    initialize();
  }, []); // Empty dependency array ensures the effect runs once on mount


  // Function to convert input string into an iCalendar formatted string
  const StringToCal = (name, description, inputString) => {
    const temp = inputString.split(" | ");
    console.log(temp);

    const date = temp[0].split(" - ");
    const time = temp[2].split(" - ");

    const startDate = date[0]; // 2025-01-10
    const endDate = date[1]; // 2025-02-14
    const daysOfWeek = temp[1]; // Fri
    const startTime = time[0]; // 11:00 a.m.
    const endTime = time[1]; // 12:00 p.m.
    const location = temp[3]; // FSC-Floor 1-Room 1221

    const uid = "uid" + Math.random().toString(36).substring(2, 15); // Random UID
    const dtstamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0]; // Current timestamp
    const startDateFormatted = startDate.replace(/-/g, "");
    const endDateFormatted = endDate.replace(/-/g, "");

    // Convert time to 24-hour format (without a.m./p.m.)
    const formatTimeTo24Hr = (time) => {
      const [hour, minute] = time.split(":");
      const isPM = time.toLowerCase().includes("pm");
      const isAM = time.toLowerCase().includes("am");

      let hour24 = parseInt(hour, 10);

      // Convert to 24-hour format
      if (isPM && hour24 !== 12) {
        hour24 += 12; // Convert PM hours (except 12 PM) to 24-hour format
      }
      if (isAM && hour24 === 12) {
        hour24 = 0; // Convert 12 AM to 00:00
      }

      const temp = `${hour24.toString().padStart(2, "0")}${minute.padStart(
        2,
        "0"
      )}`;

      return temp.substring(0, 4); // Ensures 4 digits (e.g., 1400)
    };

    const startTime24 = formatTimeTo24Hr(startTime);
    const endTime24 = formatTimeTo24Hr(endTime);
    console.log(startTime24);

    // Generate RRULE (Recurrence rule) for repeating events
    const recurrence = {
      FREQ: "WEEKLY",
      BYDAY: daysOfWeek
        .split(" ")
        .map((day) => {
          switch (day) {
            case "Mon":
              return "MO";
            case "Tue":
              return "TU";
            case "Wed":
              return "WE";
            case "Thu":
              return "TH";
            case "Fri":
              return "FR";
            default:
              return "";
          }
        })
        .join(","),
      UNTIL: endDateFormatted + "T235959Z",
    };

    const recurrenceRule = `RRULE:FREQ=${recurrence.FREQ};BYDAY=${recurrence.BYDAY};UNTIL=${recurrence.UNTIL}`;

    // iCalendar format
    let calendarEvent = `BEGIN:VEVENT
DESCRIPTION:${description}
UID:${uid}
DTSTAMP:${dtstamp}
DTSTART;TZID=America/Vancouver:${startDateFormatted}T${startTime24}00
DTEND;TZID=America/Vancouver:${startDateFormatted}T${endTime24}00
SUMMARY:${name}
LOCATION:${location}
${recurrenceRule}
END:VEVENT\n`;

    return calendarEvent;
  };

  const CourseList = async () => {
    const cred = sessionStorage.getItem("userEmail");

    const response = await axios.get("http://localhost:3000/search", {
      params: { email: cred },
    });

    const res = response.data[0]["courseList"];

    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your Organization//NONSGML v1.0//EN
CALSCALE:GREGORIAN
`;

    for (let i = 0; i < res.length; i++) {
      const description = `
        course: ${res[i]["section"]} \n
        credit: ${res[i]["credits"]} \n
        format: ${res[i]["format"]} \n
        mode: ${res[i]["mode"]} \n
        instructor: ${res[i]["instructor"]} \n
      `;

      const name = res[i]["name"];

      const meetings = res[i]["meeting"]
        .split("\n")
        .filter((item) => item !== "");
      for (const meeting of meetings) {
        icsContent += StringToCal(name, description, meeting);
      }
    }

    icsContent += `END:VCALENDAR`;

    // Create a Blob and download it as .ics
    const blob = new Blob([icsContent], { type: "text/calendar" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "calendar-events.ics";
    link.click();
  };

  const handleAddToGoogleCalendar = () => {
    CourseList();
  };

  const handleOpenExport = () => setOpenExportModal(true);
  const handleCloseExport = () => setOpenExportModal(false);

  const exportLink = "https://calendar.google.com/calendar/";

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          pt: 10,
          pb: 2,
        }}
      >
        <Typography
          variant="h6"
          align="left"
          sx={{ marginBottom: 3 }}
          gutterBottom
        >
          Welcome, {JSON.parse(sessionStorage.getItem('res'))['name']}!
        </Typography>
        <Calendar courses = {courses}></Calendar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            sx={{ textTransform: "none", backgroundColor: "#6C4BAE" }}
            onClick={handleOpenUpload}
          >
            Upload new
          </Button>
          <Button
            variant="contained"
            startIcon={<ShareIcon />}
            sx={{ textTransform: "none", backgroundColor: "#6C4BAE" }}
            onClick={handleOpenExport}
          >
            Export
          </Button>
        </Box>
        {/* Modal */}
        <Modal open={openUploadModal} onClose={handleCloseUpload}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              position: "relative",
            }}
          >
            {/* Header Row with Text and Close Icon */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ fontWeight: "bold" }}
              >
                Upload a new timetable
              </Typography>
              <IconButton onClick={handleCloseUpload}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Tab Content */}
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #6C4BAE",
                p: 4,
                mt: 2,
                textAlign: "center",
                borderRadius: 1,
                cursor: "pointer",
                backgroundColor: isDragActive ? "#f3e8ff" : "#f9f6fb",
              }}
            >
              <input
                {...getInputProps({
                  accept: ".xlsx", // Restrict to .xlsx files
                  multiple: false, // Allow only one file
                })}
                onChange={handleFileChange}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {/* Cloud icon */}
                <CloudUploadIcon
                  sx={{ fontSize: 100, color: "grey.400", mb: 2 }}
                />
              </Box>
              {isDragActive ? (
                <Typography>Drop the file here...</Typography>
              ) : (
                <>
                  <Button sx={{ bgcolor: "#65558F", color: "white", mb: 1 }}>
                    Browse
                  </Button>
                  <Typography>or, Drag and drop a file here</Typography>
                </>
              )}
            </Box>

            {/* Uploaded File */}
            {files.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">
                  Successfully Uploaded:
                </Typography>
                <Typography>{files[0]?.name}</Typography>
              </Box>
            )}
          </Box>
        </Modal>
        <Modal open={openExportModal} onClose={handleCloseExport}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Export your timetable</Typography>
              <IconButton onClick={handleCloseExport}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
                mb: 2,
              }}
            >
              <TextField
                fullWidth
                value={exportLink}
                InputProps={{
                  readOnly: true,
                }}
              />
              <IconButton
                onClick={() => navigator.clipboard.writeText(exportLink)}
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              fullWidth
              sx={{
                textTransform: "none",
                backgroundColor: "#6C4BAE",
                color: "white",
              }}
              onClick={handleAddToGoogleCalendar}
            >
              Download
            </Button>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default Schedule;
