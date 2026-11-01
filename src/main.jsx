import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";

const container = document.getElementById("root");

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// The production build is pre-rendered to static HTML, so hydrate when markup exists.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
