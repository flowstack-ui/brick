import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { applySettings } from "./settings-bootstrap.js";
import { defaultSettings, resolveSettings, settingsUrl, shareSettingsUrl, validateSettings, type PlaygroundSettings } from "./settings-model.js";
import { readSettings, saveSettings } from "./settings-storage.js";

interface SettingsContextValue {
  settings: PlaygroundSettings;
  update: (patch: Partial<PlaygroundSettings>) => void;
  reset: () => void;
  configuredUrl: () => string;
}
const SettingsContext = createContext<SettingsContextValue | null>(null);

export function PlaygroundSettingsProvider({ children, initial }: { children: ReactNode; initial: PlaygroundSettings }) {
  const [settings, setSettings] = useState(initial);
  const update = useCallback((patch: Partial<PlaygroundSettings>) => {
    setSettings(previous => ({ ...previous, ...validateSettings(patch) }));
  }, []);
  useEffect(() => {
    const sync = () => setSettings(resolveSettings(new URL(location.href), readSettings()));
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  useEffect(() => {
    applySettings(settings);
    const url = settingsUrl(new URL(location.href), settings);
    if (url.href !== location.href) history.replaceState(history.state, "", url);
    if (url.searchParams.get("testMode") !== "1") saveSettings(settings);
  }, [settings]);
  const value = useMemo(() => ({ settings, update,
    reset: () => setSettings({ ...defaultSettings }),
    configuredUrl: () => shareSettingsUrl(new URL(location.href), settings).href,
  }), [settings, update]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function usePlaygroundSettings() {
  const value = useContext(SettingsContext);
  if (!value) throw new Error("Playground settings require their provider.");
  return value;
}
