"use client";

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
export type PopoverRootProps = Omit<
  AtomPopoverRootProps,
  "triggerMode" | "openDelay" | "closeDelay"
>;
export type PopoverAnchorProps = AtomPopoverAnchorProps;
export type PopoverTriggerProps = AtomPopoverTriggerProps;
export type PopoverPortalProps = AtomPopoverPortalProps;
export interface PopoverContentProps extends AtomPopoverContentProps {
  /** Preferred maximum inline size. @default "md" */
  size?: PopoverSize;
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
    for (const ref of refs) {
      if (typeof ref === "function") ref(value);
      else if (ref) ref.current = value;
    }
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
    return cloneElement(candidate, {
      ...candidateProps,
      ...props,
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
    { className, sideOffset = 8, size = "md", "data-slot": dataSlot, ...props },
    ref,
  ) {
    return (
      <AtomPopover.Content
        {...props}
        className={mergeClassName("brick-popover", className)}
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
  function PopoverArrow({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomPopover.Arrow
        {...props}
        className={mergeClassName("brick-popover__arrow", className)}
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

export const Popover = Object.freeze({
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
