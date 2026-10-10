export const settingOptions = {
  appearance: ["system", "light", "dark"],
  exampleDirection: ["ltr", "rtl"],
  theme: ["brick", "qualification"],
  accent: ["default", "blue", "teal", "rose", "orange"],
  radius: ["default", "square", "small", "large"],
  font: ["default", "inter", "outfit"],
} as const;

export type PlaygroundSettings = {
  [K in keyof typeof settingOptions]: (typeof settingOptions)[K][number];
};
export const defaultSettings: PlaygroundSettings = {
  appearance: "system", exampleDirection: "ltr", theme: "brick", accent: "default", radius: "default", font: "default",
};
export const settingsKeys = Object.keys(settingOptions) as (keyof PlaygroundSettings)[];
export const settingsStorageKey = "brick-playground-settings-v1";

export function validateSettings(value: unknown): Partial<PlaygroundSettings> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const result: Record<string, string> = {};
  for (const key of settingsKeys) {
    const candidate = (value as Record<string, unknown>)[key];
    if (typeof candidate === "string" && (settingOptions[key] as readonly string[]).includes(candidate)) {
      result[key] = candidate;
    }
  }
  return result as Partial<PlaygroundSettings>;
}

export function resolveSettings(url: URL, stored?: unknown): PlaygroundSettings {
  const persisted = url.searchParams.get("testMode") === "1" ? {} : validateSettings(stored);
  const query = Object.fromEntries(settingsKeys.filter(key => url.searchParams.has(key)).map(key => [key, url.searchParams.get(key)]));
  // Explicit but invalid query values fall back to defaults, never personal state.
  const explicitDefaults = Object.fromEntries(Object.keys(query).map(key => [key, defaultSettings[key as keyof PlaygroundSettings]]));
  return { ...defaultSettings, ...persisted, ...explicitDefaults, ...validateSettings(query) };
}

export function settingsUrl(url: URL, settings: PlaygroundSettings): URL {
  const result = new URL(url);
  for (const key of settingsKeys) result.searchParams.set(key, settings[key]);
  return result;
}

export function previewWidth(value: string | null): string {
  if (value === "fit") return value;
  if (value !== null && /^\d{3,4}$/.test(value) && Number(value) >= 160 && Number(value) <= 1920) return String(Number(value));
  return "fit";
}

/** Sharing includes configuration, never arbitrary route data or form values. */
export function shareSettingsUrl(url: URL, settings: PlaygroundSettings): URL {
  const result = settingsUrl(new URL(url.pathname, url.origin), settings);
  if (["0", "1"].includes(url.searchParams.get("isolated") ?? "")) result.searchParams.set("isolated", url.searchParams.get("isolated")!);
  const example = url.searchParams.get("previewExample");
  if (example && /^[a-z][a-z0-9-]*\.[a-z0-9-]+$/.test(example)) {
    result.searchParams.set("previewExample", example);
    result.searchParams.set("previewWidth", previewWidth(url.searchParams.get("previewWidth")));
  }
  if (/^#(?:scenario-[a-z0-9-]+|top)$/.test(url.hash)) result.hash = url.hash;
  return result;
}
