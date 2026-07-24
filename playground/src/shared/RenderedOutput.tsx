import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Text, VStack } from "@flowstack-ui/brick";
import "./rendered-output.playground.css";

function formatMarkup(markup: string) {
  return markup
    .replace(/></g, ">\n<")
    .replace(/\s(?=[\w:-]+=")/g, "\n  ");
}

export function RenderedOutput({
  children,
  label = "Rendered HTML",
}: {
  children: ReactNode;
  label?: string;
}) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState("");

  useLayoutEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const updateMarkup = () => {
      const element = preview.firstElementChild;
      setMarkup(element ? formatMarkup(element.outerHTML) : "");
    };

    updateMarkup();
    const observer = new MutationObserver(updateMarkup);
    observer.observe(preview, {
      attributeFilter: [
        "aria-checked",
        "aria-controls",
        "aria-describedby",
        "aria-expanded",
        "aria-labelledby",
        "aria-pressed",
        "data-state",
        "disabled",
        "href",
        "id",
      ],
      attributes: true,
      childList: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, []);

  return (
    <article className="playground-output-evidence">
      <div className="playground-output-evidence__preview" ref={previewRef}>
        {children}
      </div>
      <VStack className="playground-output-evidence__output" gap="3">
        <Text as="p" variant="body-sm">{label}</Text>
        <pre aria-label={label} data-rendered-output tabIndex={0}>
          <code>{markup}</code>
        </pre>
      </VStack>
    </article>
  );
}
