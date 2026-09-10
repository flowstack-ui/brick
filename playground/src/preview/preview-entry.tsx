import { Component, useEffect, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "@flowstack-ui/brick/reset.css";
import "@flowstack-ui/brick/styles.css";
import "../../theme-fixtures/qualification/generated/theme.css";
import "../../theme-fixtures/preview-presets/presets.css";
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/outfit/wght.css";
import "../styles/scenario.css";
import "./preview-document.css";
import { initialSettings } from "../settings/settings-bootstrap.js";
import { PreviewContext } from "./PreviewContext.js";
import { isPreviewComponent, previewRegistry } from "./preview-registry.js";
import { previewProtocol, type PreviewMessage } from "./preview-protocol.js";
import { ExampleEnvironment } from "./ExampleEnvironment.js";

const initial = initialSettings(true);
const url = new URL(location.href);
const component = url.searchParams.get("component") ?? "";
const scenario = url.searchParams.get("example") ?? "";
const id = url.searchParams.get("previewId") ?? "standalone";
const root = createRoot(document.getElementById("root")!);
const send = (message: PreviewMessage) => {
  if (parent !== window) parent.postMessage(message, location.origin);
};
const report = (error: string) => send({ protocol: previewProtocol, id, type: "error", error: error.slice(0, 500) });

class PreviewBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  componentDidCatch(error: Error) { report(error.message); }
  render() { return this.state.error ? <p role="alert">This example could not render. Reload to retry.</p> : this.props.children; }
}

function Ready({ children }: { children: ReactNode }) {
  useEffect(() => {
    let cancelled = false;
    // Only the passive Aspect Ratio adapter is content-fit. Overlays and
    // viewport-dependent examples always retain a fixed-height document.
    const observer = component === "aspect-ratio" ? new ResizeObserver(() => {
      const root = document.getElementById("root")!;
      const style = getComputedStyle(document.body);
      const height = Math.min(1200, Math.max(160, Math.ceil(root.getBoundingClientRect().height + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom))));
      send({ protocol: previewProtocol, id, type: "size", height });
    }) : null;
    observer?.observe(document.getElementById("root")!);
    document.fonts.ready.then(() => {
      if (cancelled) return;
      document.documentElement.dataset.playgroundReady = "true";
      send({ protocol: previewProtocol, id, type: "ready" });
    }).catch(() => report("Example fonts could not settle."));
    return () => { cancelled = true; observer?.disconnect(); };
  }, []);
  return children;
}

async function start() {
  if (!isPreviewComponent(component)) throw new Error("Unknown preview component.");
  const { Page, scenarios } = await previewRegistry[component].load();
  const definition = scenarios.find(item => item.id === scenario);
  if (!definition) throw new Error("Unknown preview example.");
  document.title = `${definition.title} — ${component} — Brick preview`;
  root.render(<PreviewBoundary><ExampleEnvironment initial={initial} id={id}><Ready><PreviewContext.Provider value={{ mode: "preview", component, scenario }}>
    <main className="evidence-app" aria-label={definition.title}><Page /></main>
  </PreviewContext.Provider></Ready></ExampleEnvironment></PreviewBoundary>);
}
start().catch(error => {
  report(error instanceof Error ? error.message : "Preview failed to load.");
  root.render(<p role="alert">This preview could not load. Check the component and example link, then reload.</p>);
});
