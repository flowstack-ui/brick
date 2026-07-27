import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import {
  Collapsible as AtomCollapsible,
  type CollapsibleContentProps as AtomCollapsibleContentProps,
  type CollapsibleRootProps as AtomCollapsibleRootProps,
  type CollapsibleTriggerProps as AtomCollapsibleTriggerProps,
} from "@flowstack-ui/atom/collapsible";

export type CollapsibleVariant = "plain" | "soft" | "outline";
export type CollapsibleSize = "sm" | "md" | "lg";

export interface CollapsibleRootProps extends AtomCollapsibleRootProps {
  variant?: CollapsibleVariant;
  size?: CollapsibleSize;
}
export type CollapsibleTriggerProps = AtomCollapsibleTriggerProps;
export type CollapsibleContentProps = AtomCollapsibleContentProps;

export interface CollapsibleIndicatorProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children" | "aria-hidden"> {
  children?: ReactNode;
  "data-slot"?: string;
}

export interface CollapsibleContentInnerProps extends HTMLAttributes<HTMLDivElement> {
  "data-slot"?: string;
}

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleRootProps>(
  function CollapsibleRoot(
    { className, size = "md", variant = "plain", "data-slot": slot, ...props },
    ref,
  ) {
    return (
      <AtomCollapsible.Root
        {...props}
        className={classes("brick-collapsible", className)}
        data-size={size}
        data-slot={slot ?? "collapsible-root"}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  function CollapsibleTrigger({ className, "data-slot": slot, ...props }, ref) {
    return (
      <AtomCollapsible.Trigger
        {...props}
        className={classes("brick-collapsible-trigger", className)}
        data-slot={slot ?? "collapsible-trigger"}
        ref={ref}
      />
    );
  },
);

export const CollapsibleIndicator = forwardRef<HTMLSpanElement, CollapsibleIndicatorProps>(
  function CollapsibleIndicator({ children, className, "data-slot": slot, ...props }, ref) {
    return (
      <span
        {...props}
        aria-hidden="true"
        className={classes("brick-collapsible-indicator", className)}
        data-slot={slot ?? "collapsible-indicator"}
        ref={ref}
      >
        {children ?? (
          <svg fill="none" viewBox="0 0 16 16">
            <path d="m6 3.5 4.5 4.5L6 12.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        )}
      </span>
    );
  },
);

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  function CollapsibleContent({ className, "data-slot": slot, ...props }, ref) {
    return (
      <AtomCollapsible.Content
        {...props}
        className={classes("brick-collapsible-content", className)}
        data-slot={slot ?? "collapsible-content"}
        ref={ref}
      />
    );
  },
);

export const CollapsibleContentInner = forwardRef<HTMLDivElement, CollapsibleContentInnerProps>(
  function CollapsibleContentInner({ className, "data-slot": slot, ...props }, ref) {
    return (
      <div
        {...props}
        className={classes("brick-collapsible-content-inner", className)}
        data-slot={slot ?? "collapsible-content-inner"}
        ref={ref}
      />
    );
  },
);

CollapsibleRoot.displayName = "Collapsible.Root";
CollapsibleTrigger.displayName = "Collapsible.Trigger";
CollapsibleIndicator.displayName = "Collapsible.Indicator";
CollapsibleContent.displayName = "Collapsible.Content";
CollapsibleContentInner.displayName = "Collapsible.ContentInner";

export const Collapsible = Object.freeze({
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Indicator: CollapsibleIndicator,
  Content: CollapsibleContent,
  ContentInner: CollapsibleContentInner,
});
