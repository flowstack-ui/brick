import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@flowstack-ui/brick/reset.css";
import "@flowstack-ui/brick/styles.css";
import "../theme-fixtures/qualification/generated/theme.css";
import "../theme-fixtures/preview-presets/presets.css";
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/outfit/wght.css";
import "./styles/shell.css";
import "./styles/scenario.css";
import { PlaygroundApp } from "./app/PlaygroundApp.js";
import { PlaygroundSettingsProvider } from "./settings/PlaygroundSettingsProvider.js";
import { initialSettings } from "./settings/settings-bootstrap.js";

const settings = initialSettings();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PlaygroundSettingsProvider initial={settings}><PlaygroundApp /></PlaygroundSettingsProvider>
  </StrictMode>,
);
