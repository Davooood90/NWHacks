import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Routes, Route } from "react-router-dom";

import AppPage from "./pages/LoginPage(BE)";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <GoogleOAuthProvider clientId="405080598434-go6bo0850qf7ebno0lstqad1f8mi37ff.apps.googleusercontent.com">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
