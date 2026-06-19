import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApplicationProvider } from "./contexts/ApplicationContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApplicationProvider>
      <App />
    </ApplicationProvider>
  </StrictMode>,
);
