import React, { useState } from "react";
import axios from "axios";

function Calender() {
  const [icsContent, setIcsContent] = useState(""); // State to hold iCalendar content
  const [courses, setCourses] = useState([]); // State to hold course list

  // Function to convert input string into an iCalendar formatted string
  const StringToCal = (name, description, inputString) => {
    const temp = inputString.split(" | ");
    const date = temp[0].split(" - ");
    const time = temp[2].split(" - ");

    const startDate = date[0];
    const endDate = date[1];
    const daysOfWeek = temp[1];
    const startTime = time[0];
    const endTime = time[1];
    const location = temp[3];

    const uid = "uid" + Math.random().toString(36).substring(2, 15);
    const dtstamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0];
    const startDateFormatted = startDate.replace(/-/g, "");
    const endDateFormatted = endDate.replace(/-/g, "");

    // Convert time to 24-hour format
    const formatTimeTo24Hr = (time) => {
      const [hour, minute] = time.split(":");
      const isPM = time.toLowerCase().includes("pm");
      const isAM = time.toLowerCase().includes("am");

      let hour24 = parseInt(hour, 10);

      if (isPM && hour24 !== 12) {
        hour24 += 12;
      }
      if (isAM && hour24 === 12) {
        hour24 = 0;
      }

      return `${hour24.toString().padStart(2, "0")}${minute.padStart(
        2,
        "0"
      )}`.substring(0, 4);
    };

    const startTime24 = formatTimeTo24Hr(startTime);
    const endTime24 = formatTimeTo24Hr(endTime);

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

    return `BEGIN:VEVENT
DESCRIPTION:${description}
UID:${uid}
DTSTAMP:${dtstamp}
DTSTART;TZID=America/Vancouver:${startDateFormatted}T${startTime24}00
DTEND;TZID=America/Vancouver:${startDateFormatted}T${endTime24}00
SUMMARY:${name}
LOCATION:${location}
${recurrenceRule}
END:VEVENT\n`;
  };

  const CourseList = async () => {
    const cred = sessionStorage.getItem("userEmail");

    const response = await axios.get("http://localhost:3000/search", {
      params: { email: cred },
    });

    const res = response.data[0]["courseList"];
    setCourses(res); // Update courses state

    let newIcsContent = `BEGIN:VCALENDAR
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
        newIcsContent += StringToCal(name, description, meeting);
      }
    }

    newIcsContent += `END:VCALENDAR`;
    setIcsContent(newIcsContent); // Update iCalendar content state
  };

  const handleDownloadICS = () => {
    const blob = new Blob([icsContent], { type: "text/calendar" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "calendar-events.ics";
    link.click();
  };

  const handleFetchAndUpdate = () => {
    CourseList(); // Fetch and update calendar content
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <button onClick={handleFetchAndUpdate} style={{ margin: "10px" }}>
        Fetch and Update Calendar
      </button>
      <button
        onClick={handleDownloadICS}
        style={{ margin: "10px" }}
        disabled={!icsContent}
      >
        Download as iCalendar (.ics)
      </button>
      <div style={{ marginTop: "20px" }}>
        <h3>Courses:</h3>
        <ul>
          {courses.map((course, index) => (
            <li key={index}>{course.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Calender;
