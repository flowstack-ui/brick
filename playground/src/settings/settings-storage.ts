import { settingsStorageKey, validateSettings, type PlaygroundSettings } from "./settings-model.js";

export function readSettings(): Partial<PlaygroundSettings> {
  try { return validateSettings(JSON.parse(localStorage.getItem(settingsStorageKey) ?? "null")); }
  catch { return {}; }
}

export function saveSettings(settings: PlaygroundSettings): void {
  try { localStorage.setItem(settingsStorageKey, JSON.stringify(settings)); }
  catch { /* Storage is optional; URL and in-memory preferences still work. */ }
}
