import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@flowstack-ui/brick/reset.css";
import "@flowstack-ui/brick/styles.css";
import "../theme-fixtures/qualification/generated/theme.css";
import "./styles/shell.css";
import "./styles/scenario.css";
import { PlaygroundApp } from "./app/PlaygroundApp.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PlaygroundApp />
  </StrictMode>,
);
