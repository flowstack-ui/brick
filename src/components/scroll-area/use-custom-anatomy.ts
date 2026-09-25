import { useCallback, useEffect, useRef, type ForwardedRef } from "react";

/** Diagnose an incomplete custom composition without observing native roots. */
export function useCustomAnatomy(
  forwardedRef: ForwardedRef<HTMLDivElement>,
  custom: boolean,
  orientation: "vertical" | "horizontal" | "both",
) {
  const host = useRef<HTMLDivElement | null>(null);
  const forwardedCleanup = useRef<unknown>(undefined);
  const warned = useRef(false);
  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      host.current = node;
      if (typeof forwardedRef === "function") {
        if (node === null && typeof forwardedCleanup.current === "function") {
          forwardedCleanup.current();
          forwardedCleanup.current = undefined;
        } else forwardedCleanup.current = forwardedRef(node);
      } else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );
  useEffect(() => {
    if (!custom || !host.current || warned.current) return;
    const root = host.current;
    const window = root.ownerDocument.defaultView;
    if (!window) return;
    const frame = window.requestAnimationFrame(() => {
      const viewport = root.querySelector(
        ":scope > .brick-scroll-area-viewport",
      );
      const content = viewport?.querySelector(
        ":scope > .brick-scroll-area-content",
      );
      const axes =
        orientation === "both" ? ["horizontal", "vertical"] : [orientation];
      const complete =
        content &&
        axes.every((axis) =>
          root.querySelector(
            `:scope > .brick-scroll-area-scrollbar[data-orientation="${axis}"] > .brick-scroll-area-thumb`,
          ),
        );
      if (!complete) {
        warned.current = true;
        console.warn(
          "[Brick ScrollArea] Custom mode requires Viewport > Content and a Scrollbar with Thumb for each enabled axis. Native scrollbars remain available until the anatomy is complete.",
        );
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [custom, orientation]);
  return ref;
}
