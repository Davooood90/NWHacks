import axios from "axios";

function Calender() {

    const CourseList = async () => {
        const cred = sessionStorage.getItem("savedEmail");

        const response = await axios.get("http://localhost:3000/search", {
            params: { email: cred }
        });

        const res = response.data;

        console.log(res);

        for(let i = 0; i < res.length(); i++) {
            console.log(res[0]);
        }
    } 

    const handleDownloadICS = () => {
        CourseList();
    }

    const handleAddToGoogleCalendar = () => {
        CourseList();
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            {/* <h2>{course.name}</h2>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Location:</strong> {course.location}</p>
            <p><strong>Start Time:</strong> {new Date(course.start).toLocaleString()}</p>
            <p><strong>End Time:</strong> {new Date(course.end).toLocaleString()}</p>
     */}
            <button onClick={handleDownloadICS} style={{ margin: "10px" }}>
            Download as iCalendar (.ics)
            </button>
            <button onClick={handleAddToGoogleCalendar} style={{ margin: "10px" }}>
            Add to Google Calendar
            </button>
        </div>
    )
}

export default Calender;