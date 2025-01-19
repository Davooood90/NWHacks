import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Test from "./Test.jsx";
import { BrowserRouter } from "react-router-dom";
import Calender from "./pages/Calendar.jsx";

// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {/* <Calender /> */}
    </BrowserRouter>
  </StrictMode>
);
