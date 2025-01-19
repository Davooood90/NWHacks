import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login'; // for Google OAuth login
import { google } from 'googleapis';
import ics from 'ics-js';

const GoogleCalendarSync = () => {
  const [authToken, setAuthToken] = useState(null);
  const [icalData, setIcalData] = useState(null);
  
  // Function to handle the Google Login
  const handleLoginSuccess = (response) => {
    setAuthToken(response.accessToken); // Store the access token
  };

  // Function to handle the file upload and parse the .ics file
  const handleIcalFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/calendar') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const icalData = e.target.result;
        setIcalData(icalData); // Store the parsed ical data
      };
      reader.readAsText(file);
    }
  };

  // Function to sync .ics data to Google Calendar
  const syncToGoogleCalendar = () => {
    if (!icalData || !authToken) {
      alert('Please login and upload an iCalendar file first.');
      return;
    }

    const calendar = google.calendar({ version: 'v3', auth: authToken });

    // Parse the ics data
    const parsedEvents = ics.parse(icalData);
    parsedEvents.forEach((event) => {
      const googleEvent = {
        summary: event.summary,
        location: event.location,
        description: event.description,
        start: {
          dateTime: event.startDate,
          timeZone: 'UTC',
        },
        end: {
          dateTime: event.endDate,
          timeZone: 'UTC',
        },
      };

      calendar.events.insert(
        {
          calendarId: 'primary', // Insert into the user's primary calendar
          resource: googleEvent,
        },
        (err, event) => {
          if (err) {
            console.error('Error syncing event to Google Calendar:', err);
          } else {
            console.log('Event synced:', event.data);
          }
        }
      );
    });
  };

  return (
    <div>
      <h1>Sync iCalendar to Google Calendar</h1>
      {/* Google login button */}
      {!authToken ? (
        <GoogleLogin
          clientId="YOUR_GOOGLE_CLIENT_ID" // Replace with your Google OAuth Client ID
          buttonText="Login with Google"
          onSuccess={handleLoginSuccess}
          onFailure={(error) => console.error('Login failed', error)}
          scope="https://www.googleapis.com/auth/calendar"
        />
      ) : (
        <div>
          <h2>Welcome, you are logged in!</h2>
          <input type="file" accept=".ics" onChange={handleIcalFileUpload} />
          <button onClick={syncToGoogleCalendar}>Sync to Google Calendar</button>
        </div>
      )}
    </div>
  );
};

export default GoogleCalendarSync;
