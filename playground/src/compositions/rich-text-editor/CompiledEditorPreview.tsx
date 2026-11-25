import { useCallback, useEffect, useRef, useState } from "react";
import { Frame, Surface } from "@flowstack-ui/brick";
import { usePlaygroundSettings } from "../../settings/PlaygroundSettingsProvider.js";
import presets from "../../../theme-fixtures/preview-presets/presets.css?url";
import qualification from "../../../theme-fixtures/qualification/generated/theme.css?url";
import inter from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";
import outfit from "@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2?url";

/** Deliberate source-distribution boundary, not a general component preview
 * migration. Only reviewed compiled assets are present in this repository. */
export function CompiledEditorPreview({
  example,
  title,
}: {
  example: string;
  title: string;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const cleanup = useRef<() => void>(() => {});
  const [height, setHeight] = useState(300);
  const { settings } = usePlaygroundSettings();
  const apply = useCallback(() => {
    const document = frame.current?.contentDocument;
    if (!document?.documentElement) return;
    const root = document.documentElement;
    if (settings.appearance === "system")
      root.removeAttribute("data-brick-appearance");
    else root.dataset.brickAppearance = settings.appearance;
    root.dir = settings.exampleDirection;
    if (settings.theme === "qualification")
      root.dataset.flowstackTheme = "qualification";
    else root.removeAttribute("data-flowstack-theme");
    root.dataset.previewAccent =
      settings.theme === "brick" ? settings.accent : "default";
    root.dataset.previewRadius =
      settings.theme === "brick" ? settings.radius : "default";
    root.dataset.previewFont =
      settings.theme === "brick" ? settings.font : "default";
    if (!document.querySelector("[data-editor-theme]")) {
      for (const href of [presets, qualification]) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.dataset.editorTheme = "";
        document.head.append(link);
      }
      const fonts = document.createElement("style");
      fonts.textContent = `@font-face{font-family:"Inter Variable";src:url("${inter}") format("woff2");font-weight:100 900;font-display:swap}@font-face{font-family:"Outfit Variable";src:url("${outfit}") format("woff2");font-weight:100 900;font-display:swap}`;
      document.head.append(fonts);
    }
  }, [settings]);
  useEffect(apply, [apply]);
  useEffect(() => () => cleanup.current(), []);
  const loaded = useCallback(() => {
    apply();
    cleanup.current();
    const document = frame.current?.contentDocument;
    const view = frame.current?.contentWindow;
    const content = document?.getElementById("root");
    if (!document || !view || !content) return;
    // Measure the source-owned content, not documentElement.scrollHeight:
    // the latter cannot shrink below the iframe's previous viewport height.
    let pending = 0;
    const measure = () => {
      view.cancelAnimationFrame(pending);
      pending = view.requestAnimationFrame(() => {
        const rootHeight = content.getBoundingClientRect().height;
        setHeight(Math.ceil(rootHeight));
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    measure();
    cleanup.current = () => {
      observer.disconnect();
      view.cancelAnimationFrame(pending);
    };
  }, [apply]);
  return (
    <Frame blockSize={height} asChild>
      <Surface bordered asChild>
        <iframe
          ref={frame}
          title={title}
          loading="lazy"
          onLoad={loaded}
          src={`/previews/rich-text-editor/index.html?example=${encodeURIComponent(example)}`}
        />
      </Surface>
    </Frame>
  );
}
