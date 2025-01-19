import React, { useState } from "react";
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

const scheduleData = [
  { day: "Monday", time: "10 AM", course: "MATH 101", type: "Discussion" },
  { day: "Monday", time: "11 AM", course: "CPSC 121", type: "Discussion" },
  { day: "Monday", time: "1 PM", course: "COMM 192", type: "Lecture" },
  { day: "Monday", time: "2 PM", course: "ECON 102", type: "Lecture" },
  { day: "Tuesday", time: "1 PM", course: "CPSC 121", type: "Lecture" },
  { day: "Tuesday", time: "2 PM", course: "COMM 101", type: "Lecture" },
  { day: "Wednesday", time: "10 AM", course: "CPSC 121", type: "Lab" },
  { day: "Wednesday", time: "1 PM", course: "COMM 192", type: "Lecture" },
  { day: "Thursday", time: "10 AM", course: "MATH 101", type: "Lecture" },
  { day: "Thursday", time: "1 PM", course: "CPSC 121", type: "Lecture" },
  { day: "Friday", time: "10 AM", course: "COMM 101", type: "Discussion" },
  { day: "Friday", time: "2 PM", course: "ECON 102", type: "Lecture" },
  { day: "Friday", time: "3 PM", course: "COMM 101", type: "Lecture" },
];

const Schedule = () => {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [files, setFiles] = useState([]);

  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openExportModal, setOpenExportModal] = useState(false);

  const handleOpenUpload = () => setOpenUploadModal(true);
  const handleCloseUpload = () => setOpenUploadModal(false);

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
  const times = [
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
        <Typography variant="h6" align="center" gutterBottom>
          Welcome, user_name!
        </Typography>
        <Box sx={{ p: 4, backgroundColor: "#f9f6fb", mb: 2 }}>
          <Grid container>
            {/* Header */}
            <Grid item xs={1} />
            {days.map((day, index) => (
              <Grid
                item
                xs={1.5}
                key={index}
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                {day}
              </Grid>
            ))}
            {/* Time Slots */}
            {times.map((time) => (
              <React.Fragment key={time}>
                {/* Time Column */}
                <Grid
                  item
                  xs={1}
                  sx={{ textAlign: "right", pr: 1, fontWeight: "bold" }}
                >
                  {time}
                </Grid>
                {/* Schedule */}
                {days.map((day) => (
                  <Grid
                    item
                    xs={1.5}
                    key={day}
                    sx={{ border: "1px solid #e0e0e0", minHeight: "60px" }}
                  >
                    {scheduleData
                      .filter((slot) => slot.time === time && slot.day === day)
                      .map((slot, idx) => (
                        <Paper
                          key={idx}
                          elevation={3}
                          sx={{
                            backgroundColor: "#dcd6f7",
                            p: 1,
                            mb: 0.5,
                            fontSize: "0.875rem",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: "bold" }}
                          >
                            {slot.course}
                          </Typography>
                          <Typography variant="body2">{slot.type}</Typography>
                        </Paper>
                      ))}
                  </Grid>
                ))}
              </React.Fragment>
            ))}
          </Grid>
        </Box>
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
