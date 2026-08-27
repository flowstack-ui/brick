"use client";

import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  RadioGroup as AtomRadioGroup,
  useRadioGroupContext,
  type RadioGroupRootProps as AtomRootProps,
  type RadioRootProps as AtomItemProps,
} from "@flowstack-ui/atom/radio-group";

export type SegmentGroupSize = "sm" | "md" | "lg";

export interface SegmentGroupRootProps extends AtomRootProps {
  /** Shared item and indicator geometry. @default "md" */
  size?: SegmentGroupSize;
  /** Fill the available inline width and distribute items. @default false */
  fullWidth?: boolean;
}

export interface SegmentGroupItemProps extends AtomItemProps {
  /** Use square padding for icon-only content. @default false */
  iconOnly?: boolean;
}

export interface SegmentGroupItemTextProps extends HTMLAttributes<HTMLSpanElement> {
  "data-slot"?: string;
}

export interface SegmentGroupIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  "data-slot"?: string;
}

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

const useSafeLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export const SegmentGroupRoot = forwardRef<
  HTMLDivElement,
  SegmentGroupRootProps
>(function SegmentGroupRoot(
  {
    className,
    fullWidth = false,
    orientation = "horizontal",
    size = "md",
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <AtomRadioGroup.Root
      {...props}
      className={mergeClassName("brick-segment-group", className)}
      data-full-width={fullWidth ? "" : undefined}
      data-size={size}
      data-slot={dataSlot ?? "segment-group"}
      orientation={orientation}
      ref={ref}
    />
  );
});

export const SegmentGroupItem = forwardRef<
  HTMLButtonElement,
  SegmentGroupItemProps
>(function SegmentGroupItem(
  { className, iconOnly = false, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomRadioGroup.Radio
      {...props}
      className={mergeClassName("brick-segment-group__item", className)}
      data-icon-only={iconOnly ? "" : undefined}
      data-slot={dataSlot ?? "segment-group-item"}
      ref={ref}
    />
  );
});

export const SegmentGroupItemText = forwardRef<
  HTMLSpanElement,
  SegmentGroupItemTextProps
>(function SegmentGroupItemText(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <span
      {...props}
      className={mergeClassName("brick-segment-group__item-text", className)}
      data-slot={dataSlot ?? "segment-group-item-text"}
      ref={ref}
    />
  );
});

export const SegmentGroupIndicator = forwardRef<
  HTMLSpanElement,
  SegmentGroupIndicatorProps
>(function SegmentGroupIndicator(
  { className, style, "data-slot": dataSlot, ...props },
  forwardedRef,
) {
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const context = useRadioGroupContext();
  const [geometry, setGeometry] = useState<CSSProperties>();

  useSafeLayoutEffect(() => {
    const indicator = indicatorRef.current;
    const selected = context.getRadioElement(context.activeValue);
    const root = indicator?.closest<HTMLElement>("[data-slot='segment-group']");

    if (!indicator || !selected || !root) {
      setGeometry(undefined);
      return;
    }

    const updateGeometry = () => {
      const rootRect = root.getBoundingClientRect();
      const selectedRect = selected.getBoundingClientRect();
      setGeometry({
        "--brick-segment-group-indicator-block-size": `${selectedRect.height}px`,
        "--brick-segment-group-indicator-inline-size": `${selectedRect.width}px`,
        "--brick-segment-group-indicator-x": `${selectedRect.left - rootRect.left - root.clientLeft}px`,
        "--brick-segment-group-indicator-y": `${selectedRect.top - rootRect.top - root.clientTop}px`,
      } as CSSProperties);
    };

    updateGeometry();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(updateGeometry);
    observer.observe(root);
    observer.observe(selected);
    return () => observer.disconnect();
  }, [context.activeValue, context]);

  const setRefs = (node: HTMLSpanElement | null) => {
    indicatorRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <span
      {...props}
      aria-hidden="true"
      className={mergeClassName("brick-segment-group__indicator", className)}
      data-ready={geometry ? "" : undefined}
      data-slot={dataSlot ?? "segment-group-indicator"}
      ref={setRefs}
      style={{ ...style, ...geometry }}
    />
  );
});

SegmentGroupRoot.displayName = "SegmentGroup.Root";
SegmentGroupItem.displayName = "SegmentGroup.Item";
SegmentGroupItemText.displayName = "SegmentGroup.ItemText";
SegmentGroupIndicator.displayName = "SegmentGroup.Indicator";

export const SegmentGroup = Object.freeze({
  Root: SegmentGroupRoot,
  Item: SegmentGroupItem,
  ItemText: SegmentGroupItemText,
  Indicator: SegmentGroupIndicator,
});
