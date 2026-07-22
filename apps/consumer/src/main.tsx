import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@flowstack-ui/brick/reset.css";
import "@flowstack-ui/brick/styles.css";
import { App } from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
