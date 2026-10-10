import { settingsKeys, validateSettings, type PlaygroundSettings } from "../settings/settings-model.js";

export const previewProtocol = "brick-preview-v1";
export type PreviewMessage =
  | { protocol: typeof previewProtocol; id: string; type: "settings"; settings: PlaygroundSettings }
  | { protocol: typeof previewProtocol; id: string; type: "ready" }
  | { protocol: typeof previewProtocol; id: string; type: "applied" }
  | { protocol: typeof previewProtocol; id: string; type: "size"; height: number }
  | { protocol: typeof previewProtocol; id: string; type: "error"; error: string };

export function parsePreviewMessage(value: unknown, id: string): PreviewMessage | null {
  if (!value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  if (data.protocol !== previewProtocol || data.id !== id) return null;
  if (data.type === "ready") return { protocol: previewProtocol, id, type: "ready" };
  if (data.type === "applied") return { protocol: previewProtocol, id, type: "applied" };
  if (data.type === "size" && typeof data.height === "number" && Number.isInteger(data.height) && data.height >= 160 && data.height <= 1200) {
    return { protocol: previewProtocol, id, type: "size", height: data.height };
  }
  if (data.type === "error" && typeof data.error === "string" && data.error.length <= 500) {
    return { protocol: previewProtocol, id, type: "error", error: data.error };
  }
  if (data.type === "settings") {
    const settings = validateSettings(data.settings);
    if (settingsKeys.every(key => settings[key] !== undefined)) {
      return { protocol: previewProtocol, id, type: "settings", settings: settings as PlaygroundSettings };
    }
  }
  return null;
}
