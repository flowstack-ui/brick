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
  Tooltip as AtomTooltip,
  type TooltipArrowProps as AtomTooltipArrowProps,
  type TooltipContentProps as AtomTooltipContentProps,
  type TooltipPortalProps as AtomTooltipPortalProps,
  type TooltipProviderProps as AtomTooltipProviderProps,
  type TooltipRootProps as AtomTooltipRootProps,
  type TooltipTriggerProps as AtomTooltipTriggerProps,
} from "@flowstack-ui/atom/tooltip";

export type TooltipProviderProps = AtomTooltipProviderProps;
export type TooltipRootProps = AtomTooltipRootProps;
export type TooltipTriggerProps = AtomTooltipTriggerProps;
export type TooltipPortalProps = AtomTooltipPortalProps;
export type TooltipContentProps = Omit<
  AtomTooltipContentProps,
  "aria-label" | "ariaLabel"
>;
export type TooltipArrowProps = AtomTooltipArrowProps;

export interface TooltipTextProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  render?: ReactElement;
  "data-slot"?: string;
}

export type TooltipTitleProps = TooltipTextProps;
export type TooltipDescriptionProps = TooltipTextProps;

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

function renderTextPart(
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
    <span
      {...props}
      className={mergeClassName(className, props.className)}
      data-slot={dataSlot}
      ref={ref}
    >
      {children}
    </span>
  );
}

export const TooltipProvider = AtomTooltip.Provider;
export const TooltipRoot = AtomTooltip.Root;
export const TooltipPortal = AtomTooltip.Portal;

export const TooltipTrigger = forwardRef<HTMLElement, TooltipTriggerProps>(
  function TooltipTrigger({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomTooltip.Trigger
        {...props}
        className={mergeClassName("brick-tooltip__trigger", className)}
        data-slot={slotOrDefault(dataSlot, "tooltip-trigger")}
        ref={ref}
      />
    );
  },
);

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent(
    { className, sideOffset = 8, "data-slot": dataSlot, ...props },
    ref,
  ) {
    return (
      <AtomTooltip.Content
        {...props}
        className={mergeClassName("brick-tooltip", className)}
        data-slot={slotOrDefault(dataSlot, "tooltip")}
        ref={ref}
        sideOffset={sideOffset}
      />
    );
  },
);

export const TooltipTitle = forwardRef<HTMLElement, TooltipTitleProps>(
  function TooltipTitle(
    { asChild = false, children, className, render, "data-slot": dataSlot, ...props },
    ref,
  ) {
    return renderTextPart(
      children,
      "brick-tooltip__title",
      slotOrDefault(dataSlot, "tooltip-title"),
      { ...props, className },
      ref,
      asChild,
      render,
    );
  },
);

export const TooltipDescription = forwardRef<HTMLElement, TooltipDescriptionProps>(
  function TooltipDescription(
    { asChild = false, children, className, render, "data-slot": dataSlot, ...props },
    ref,
  ) {
    return renderTextPart(
      children,
      "brick-tooltip__description",
      slotOrDefault(dataSlot, "tooltip-description"),
      { ...props, className },
      ref,
      asChild,
      render,
    );
  },
);

export const TooltipArrow = forwardRef<SVGSVGElement, TooltipArrowProps>(
  function TooltipArrow({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomTooltip.Arrow
        {...props}
        className={mergeClassName("brick-tooltip__arrow", className)}
        data-slot={slotOrDefault(dataSlot, "tooltip-arrow")}
        ref={ref}
      />
    );
  },
);

TooltipTrigger.displayName = "Tooltip.Trigger";
TooltipContent.displayName = "Tooltip.Content";
TooltipTitle.displayName = "Tooltip.Title";
TooltipDescription.displayName = "Tooltip.Description";
TooltipArrow.displayName = "Tooltip.Arrow";

export const Tooltip = Object.freeze({
  Provider: TooltipProvider,
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Portal: TooltipPortal,
  Content: TooltipContent,
  Title: TooltipTitle,
  Description: TooltipDescription,
  Arrow: TooltipArrow,
});
