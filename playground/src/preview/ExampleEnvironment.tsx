import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { DirectionProvider } from "@flowstack-ui/atom/direction";
import { applySettings } from "../settings/settings-bootstrap.js";
import type { PlaygroundSettings } from "../settings/settings-model.js";
import { parsePreviewMessage, previewProtocol } from "./preview-protocol.js";

/** Nonvisual direction scope for the original inline examples. No iframe,
 * surface, extra spacing or per-example controls; the English shell stays LTR.
 */
export function InlineExampleEnvironment({ children, dir }: { children: ReactNode; dir: "ltr" | "rtl" }) {
  return <DirectionProvider dir={dir}><div dir={dir} data-playground-examples="">{children}</div></DirectionProvider>;
}

/** Headless test-runner infrastructure, not example composition. Atom's public
 * provider supplies behavior context; native html dir supplies document layout.
 * Authored LocaleProviders and explicit component dir props remain nearer owners.
 */
export function ExampleEnvironment({ children, initial, id }: { children: ReactNode; initial: PlaygroundSettings; id: string }) {
  const [settings, setSettings] = useState(initial);
  const [fontError, setFontError] = useState(false);
  const received = useRef(false);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== parent || parent === window) return;
      const message = parsePreviewMessage(event.data, id);
      if (message?.type !== "settings") return;
      received.current = true;
      setSettings(message.settings);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [id]);
  useLayoutEffect(() => {
    applySettings(settings, true);
    setFontError(false);
    let cancelled = false;
    const family = settings.theme === "brick" && settings.font !== "default" ? `${settings.font === "inter" ? "Inter" : "Outfit"} Variable` : "system-ui";
    Promise.all([document.fonts.load(`400 16px "${family}"`), document.fonts.load(`600 16px "${family}"`)]).then(() => document.fonts.ready).then(() => {
      if (!cancelled && received.current) parent.postMessage({ protocol: previewProtocol, id, type: "applied" }, location.origin);
    }).catch(() => {
      if (cancelled) return;
      setFontError(true);
      if (parent !== window) parent.postMessage({ protocol: previewProtocol, id, type: "error", error: "Preview font could not load. Reset the example to retry." }, location.origin);
    });
    return () => { cancelled = true; };
  }, [id, settings]);
  return <DirectionProvider dir={settings.exampleDirection}>{fontError ? <p role="alert">Preview font could not load. Reload to retry.</p> : children}</DirectionProvider>;
}
