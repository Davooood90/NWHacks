import axios from "axios";

function Calender() {
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
      const [hour, minute] = time.split(':');
      const isPM = time.toLowerCase().includes('pm');
      const isAM = time.toLowerCase().includes('am');
  
      let hour24 = parseInt(hour, 10);
  
      // Convert to 24-hour format
      if (isPM && hour24 !== 12) {
          hour24 += 12; // Convert PM hours (except 12 PM) to 24-hour format
      }
      if (isAM && hour24 === 12) {
          hour24 = 0;  // Convert 12 AM to 00:00
      }

      const temp = `${hour24.toString().padStart(2, '0')}${minute.padStart(2, '0')}`;
  
      return temp.substring(0, 4);  // Ensures 4 digits (e.g., 1400)
    };
    
    const startTime24 = formatTimeTo24Hr(startTime);
    const endTime24 = formatTimeTo24Hr(endTime);
    console.log(startTime24);

    // Generate RRULE (Recurrence rule) for repeating events
    const recurrence = {
      FREQ: "WEEKLY",
      BYDAY: daysOfWeek.split(" ").map((day) => {
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
      }).join(","),
      UNTIL: endDateFormatted + "T235959Z",
    };

    const recurrenceRule = `RRULE:FREQ=${recurrence.FREQ};BYDAY=${recurrence.BYDAY};UNTIL=${recurrence.UNTIL}`;

    // iCalendar format
    let calendarEvent = 
`BEGIN:VEVENT
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

      const meetings = res[i]["meeting"].split("\n").filter((item) => item !== "");
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

  const handleDownloadICS = () => {
    CourseList();
  };

  const handleAddToGoogleCalendar = () => {
    // You can implement the logic to add to Google Calendar here
    // This requires using the Google Calendar API.
    CourseList();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <button onClick={handleDownloadICS} style={{ margin: "10px" }}>
        Download as iCalendar (.ics)
      </button>
      <button onClick={handleAddToGoogleCalendar} style={{ margin: "10px" }}>
        Add to Google Calendar
      </button>
    </div>
  );
}

export default Calender;
