import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import AppPage from "./pages/AppPage";
import TimeTablePage from "./pages/TimeTablePage";
import Courses from "./pages/Course";
import GradesDashboard from "./pages/Grades";
import { Navigate } from 'react-router-dom';

function App() {

  const ProtectedRoute = ({ element }) => {
    return sessionStorage.getItem("userEmail") ? element : <Navigate to="/login" />;
  };

  return (
    <GoogleOAuthProvider clientId="405080598434-go6bo0850qf7ebno0lstqad1f8mi37ff.apps.googleusercontent.com">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app/timetable" element={<TimeTablePage />} />
        <Route path="/app/courses" element={<Courses />} />
        <Route path="/app/grades" element={<GradesDashboard />} />
        <Route 
          path="/app" 
          element={<ProtectedRoute element={<AppPage />} />} 
        />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
