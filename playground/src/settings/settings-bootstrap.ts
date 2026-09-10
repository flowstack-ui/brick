import { resolveSettings, type PlaygroundSettings } from "./settings-model.js";
import { readSettings } from "./settings-storage.js";

export function applySettings(settings: PlaygroundSettings, preview = false) {
  const root = document.documentElement;
  if (settings.appearance === "system") root.removeAttribute("data-brick-appearance");
  else root.dataset.brickAppearance = settings.appearance;
  root.dir = preview ? settings.exampleDirection : "ltr";
  if (settings.theme === "qualification") root.dataset.flowstackTheme = "qualification";
  else root.removeAttribute("data-flowstack-theme");
  const ordinary = settings.theme === "brick";
  root.dataset.previewAccent = ordinary ? settings.accent : "default";
  root.dataset.previewRadius = ordinary ? settings.radius : "default";
  root.dataset.previewFont = ordinary ? settings.font : "default";
}

export function initialSettings(preview = false) {
  const value = resolveSettings(new URL(location.href), preview ? {} : readSettings());
  applySettings(value, preview);
  return value;
}
