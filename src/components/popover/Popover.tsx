"use client";

import { FloatingArrowArtwork, floatingArrowWidth, floatingArrowHeight, floatingArrowStyle } from "../_floating-arrow/FloatingArrowArtwork.js";
import { radiusStyle, type Radius } from "../_radius/Radius.js";

import {
  cloneElement,
  forwardRef,
  isValidElement,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import {
  Popover as AtomPopover,
  usePopover as useAtomPopover,
  usePopoverState,
  markPopoverPart,
  type UsePopoverReturn,
  type PopoverRootProviderProps,
  type PopoverAnchorProps as AtomPopoverAnchorProps,
  type PopoverArrowProps as AtomPopoverArrowProps,
  type PopoverCloseProps as AtomPopoverCloseProps,
  type PopoverContentProps as AtomPopoverContentProps,
  type PopoverDescriptionProps as AtomPopoverDescriptionProps,
  type PopoverPortalProps as AtomPopoverPortalProps,
  type PopoverRootProps as AtomPopoverRootProps,
  type PopoverTitleProps as AtomPopoverTitleProps,
  type PopoverTriggerProps as AtomPopoverTriggerProps,
} from "@flowstack-ui/atom/popover";

export type PopoverSize = "sm" | "md" | "lg";
export type PopoverDensity = "comfortable" | "compact";
export type PopoverInset = "xs" | "sm" | "md" | "lg";
export { usePopoverState };
export type { UsePopoverReturn, PopoverRootProviderProps };
export type { PopoverPositioningOptions, PopoverIds, PopoverLifecycleOptions, PopoverStateProps, PopoverIndicatorProps } from "@flowstack-ui/atom/popover";
export type PopoverRootProps = Omit<
  AtomPopoverRootProps,
  "triggerMode" | "openDelay" | "closeDelay"
>;
export type PopoverAnchorProps = AtomPopoverAnchorProps;
export type PopoverTriggerProps = AtomPopoverTriggerProps;
export type PopoverPortalProps = AtomPopoverPortalProps;
export interface PopoverContentProps extends AtomPopoverContentProps {
  radius?: Radius;
  /** Preferred maximum inline size. @default "md" */
  size?: PopoverSize;
  /** Visual inset and title density. @default "comfortable" */
  density?: PopoverDensity;
  /** Independent panel spacing; defaults to the selected density's inset. */
  inset?: PopoverInset;
}
export type PopoverTitleProps = AtomPopoverTitleProps;
export type PopoverDescriptionProps = AtomPopoverDescriptionProps;
export type PopoverCloseProps = AtomPopoverCloseProps;
export type PopoverArrowProps = AtomPopoverArrowProps;

export interface PopoverStructureProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  children?: ReactNode;
  render?: ReactElement;
  "data-slot"?: string;
}

export type PopoverHeaderProps = PopoverStructureProps;
export type PopoverBodyProps = PopoverStructureProps;
export type PopoverFooterProps = PopoverStructureProps;

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function slotOrDefault(slot: string | undefined, fallback: string) {
  return slot ?? fallback;
}

function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T | null) => {
    const cleanups = refs.map(ref => {
      if (typeof ref === "function") return ref(value);
      if (ref) ref.current = value;
    });
    if (cleanups.some(cleanup => typeof cleanup === "function")) return () => refs.forEach((ref, index) => {
      const cleanup = cleanups[index];
      if (typeof cleanup === "function") cleanup();
      else if (typeof ref === "function") ref(null);
      else if (ref) ref.current = null;
    });
  };
}

function renderStructurePart(
  children: ReactNode,
  className: string,
  dataSlot: string,
  props: HTMLAttributes<HTMLElement>,
  ref: Ref<HTMLElement>,
  asChild: boolean,
  render: ReactElement | undefined,
) {
  const candidate = render ?? (asChild && isValidElement(children) ? children : null);
  if (candidate && isValidElement<Record<string, unknown>>(candidate)) {
    const candidateProps = candidate.props;
    const events: Record<string, unknown> = {};
    for (const [key, outer] of Object.entries(props)) {
      const inner = candidateProps[key];
      if (key.startsWith("on") && typeof outer === "function" && typeof inner === "function") {
        events[key] = (...args: unknown[]) => { inner(...args); outer(...args); };
      }
    }
    return cloneElement(candidate, {
      ...candidateProps,
      ...props,
      ...events,
      children: render ? children : candidateProps.children,
      className: mergeClassName(
        className,
        [candidateProps.className, props.className].filter(Boolean).join(" ") || undefined,
      ),
      "data-slot": dataSlot,
      ref: composeRefs(candidateProps.ref as Ref<HTMLElement> | undefined, ref),
      style: {
        ...(candidateProps.style as CSSProperties | undefined),
        ...props.style,
      },
    });
  }

  return (
    <div
      {...props}
      className={mergeClassName(className, props.className)}
      data-slot={dataSlot}
      ref={ref as Ref<HTMLDivElement>}
    >
      {children}
    </div>
  );
}

function createStructurePart(className: string, slot: string, displayName: string) {
  const Part = forwardRef<HTMLElement, PopoverStructureProps>(function PopoverStructurePart(
    { asChild = false, children, className: consumerClassName, render, "data-slot": dataSlot, ...props },
    ref,
  ) {
    return renderStructurePart(
      children,
      className,
      slotOrDefault(dataSlot, slot),
      { ...props, className: consumerClassName },
      ref,
      asChild,
      render,
    );
  });
  Part.displayName = displayName;
  return Part;
}

export function PopoverRoot(props: PopoverRootProps) {
  return <AtomPopover.Root {...props} triggerMode="click" />;
}

export type UsePopoverOptions = Omit<PopoverRootProps, "children">;
export function usePopover(options: UsePopoverOptions = {}): UsePopoverReturn {
  return useAtomPopover({ ...options, triggerMode: "click" });
}
export function PopoverRootProvider({ value, children }: PopoverRootProviderProps) {
  if (value.triggerMode !== "click") throw new Error("Brick Popover requires a click-mode controller. Use Brick usePopover.");
  return <AtomPopover.RootProvider value={value}>{children}</AtomPopover.RootProvider>;
}
export const PopoverState = AtomPopover.State;
export const PopoverIndicator = forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<typeof AtomPopover.Indicator>>(
  function PopoverIndicator({ className, ...props }, ref) {
    return <AtomPopover.Indicator {...props} className={mergeClassName("brick-popover-indicator", className)} ref={ref} />;
  },
);

export const PopoverAnchor = forwardRef<HTMLElement, PopoverAnchorProps>(
  function PopoverAnchor({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomPopover.Anchor
        {...props}
        className={mergeClassName("brick-popover__anchor", className)}
        data-slot={slotOrDefault(dataSlot, "popover-anchor")}
        ref={ref}
      />
    );
  },
);

export const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(
  function PopoverTrigger({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomPopover.Trigger
        {...props}
        className={mergeClassName("brick-popover__trigger", className)}
        data-slot={slotOrDefault(dataSlot, "popover-trigger")}
        ref={ref}
      />
    );
  },
);

export const PopoverPortal = AtomPopover.Portal;

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    {
      className,
      density = "comfortable",
      inset,
      radius,
      style,
      sideOffset = 8,
      size = "md",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <AtomPopover.Content
        {...props}
        className={mergeClassName("brick-popover", className)}
        style={radiusStyle(radius, "--brick-popover-radius", style)}
        data-density={density}
        data-inset={inset}
        data-size={size}
        data-slot={slotOrDefault(dataSlot, "popover")}
        ref={ref}
        sideOffset={sideOffset}
      />
    );
  },
);

export const PopoverHeader = createStructurePart(
  "brick-popover__header",
  "popover-header",
  "Popover.Header",
);
export const PopoverBody = createStructurePart(
  "brick-popover__body",
  "popover-body",
  "Popover.Body",
);
export const PopoverFooter = createStructurePart(
  "brick-popover__footer",
  "popover-footer",
  "Popover.Footer",
);

// Keep Atom's semantic components unwrapped so Content can identify them during SSR.
export const PopoverTitle = AtomPopover.Title;
export const PopoverDescription = AtomPopover.Description;

export const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(
  function PopoverClose({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomPopover.Close
        {...props}
        className={mergeClassName("brick-popover__close", className)}
        data-slot={slotOrDefault(dataSlot, "popover-close")}
        ref={ref}
      />
    );
  },
);

export const PopoverArrow = forwardRef<SVGSVGElement, PopoverArrowProps>(
  function PopoverArrow({ className, children, width, height, style, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomPopover.Arrow
        {...props}
        width={width ?? floatingArrowWidth}
        height={height ?? floatingArrowHeight}
        style={floatingArrowStyle(width, height, style)}
        className={mergeClassName("brick-popover__arrow brick-floating-arrow", className)}
        children={children ?? (props.asChild || props.render ? undefined : <FloatingArrowArtwork width={width ?? floatingArrowWidth} height={height ?? floatingArrowHeight} />)}
        data-slot={slotOrDefault(dataSlot, "popover-arrow")}
        ref={ref}
      />
    );
  },
);

PopoverRoot.displayName = "Popover.Root";
PopoverAnchor.displayName = "Popover.Anchor";
PopoverTrigger.displayName = "Popover.Trigger";
PopoverContent.displayName = "Popover.Content";
PopoverClose.displayName = "Popover.Close";
PopoverArrow.displayName = "Popover.Arrow";
markPopoverPart(PopoverArrow, "arrow");

export const Popover = Object.freeze({
  RootProvider: PopoverRootProvider,
  State: PopoverState,
  Indicator: PopoverIndicator,
  Root: PopoverRoot,
  Anchor: PopoverAnchor,
  Trigger: PopoverTrigger,
  Portal: PopoverPortal,
  Content: PopoverContent,
  Header: PopoverHeader,
  Title: PopoverTitle,
  Description: PopoverDescription,
  Body: PopoverBody,
  Footer: PopoverFooter,
  Close: PopoverClose,
  Arrow: PopoverArrow,
});
