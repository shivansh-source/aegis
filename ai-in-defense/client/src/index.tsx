import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Tailwind base styles
import App from "./App";

// Get the root element
const container = document.getElementById("root");

// Create a root
const root = createRoot(container!); // Non-null assertion (!) since we know root exists

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);