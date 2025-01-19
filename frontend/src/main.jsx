import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Test from "./Test.jsx";
import { BrowserRouter } from "react-router-dom";
import Calender from "./pages/Calender.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Test />
      <Calender />
    </BrowserRouter>
  </StrictMode>
);
