import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

function App() {
  return (
    <GoogleOAuthProvider clientId="405080598434-go6bo0850qf7ebno0lstqad1f8mi37ff.apps.googleusercontent.com">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
