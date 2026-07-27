import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import {
  Accordion as AtomAccordion,
  type AccordionContentProps as AtomAccordionContentProps,
  type AccordionHeaderProps as AtomAccordionHeaderProps,
  type AccordionItemProps as AtomAccordionItemProps,
  type AccordionRootProps as AtomAccordionRootProps,
  type AccordionTriggerProps as AtomAccordionTriggerProps,
} from "@flowstack-ui/atom/accordion";

export type AccordionVariant = "plain" | "soft" | "outline";
export type AccordionSize = "sm" | "md" | "lg";

export type AccordionRootProps = AtomAccordionRootProps & {
  variant?: AccordionVariant;
  size?: AccordionSize;
};
export type AccordionItemProps = AtomAccordionItemProps;
export type AccordionHeaderProps = AtomAccordionHeaderProps;
export type AccordionTriggerProps = AtomAccordionTriggerProps;
export type AccordionContentProps = AtomAccordionContentProps;

export interface AccordionIndicatorProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children" | "aria-hidden"> {
  children?: ReactNode;
  "data-slot"?: string;
}

export interface AccordionContentInnerProps extends HTMLAttributes<HTMLDivElement> {
  "data-slot"?: string;
}

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(function AccordionRoot(
  { className, size = "md", variant = "plain", "data-slot": slot, ...props },
  ref,
) {
  return <AtomAccordion.Root {...props} className={classes("brick-accordion", className)} data-size={size} data-slot={slot ?? "accordion-root"} data-variant={variant} ref={ref} />;
});

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { className, "data-slot": slot, ...props },
  ref,
) {
  return <AtomAccordion.Item {...props} className={classes("brick-accordion-item", className)} data-slot={slot ?? "accordion-item"} ref={ref} />;
});

export const AccordionHeader = forwardRef<HTMLHeadingElement, AccordionHeaderProps>(function AccordionHeader(
  { className, "data-slot": slot, ...props },
  ref,
) {
  return <AtomAccordion.Header {...props} className={classes("brick-accordion-header", className)} data-slot={slot ?? "accordion-header"} ref={ref} />;
});

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(function AccordionTrigger(
  { className, "data-slot": slot, ...props },
  ref,
) {
  return <AtomAccordion.Trigger {...props} className={classes("brick-accordion-trigger", className)} data-slot={slot ?? "accordion-trigger"} ref={ref} />;
});

export const AccordionIndicator = forwardRef<HTMLSpanElement, AccordionIndicatorProps>(function AccordionIndicator(
  { children, className, "data-slot": slot, ...props },
  ref,
) {
  return <span {...props} aria-hidden="true" className={classes("brick-accordion-indicator", className)} data-slot={slot ?? "accordion-indicator"} ref={ref}>{children ?? <svg fill="none" viewBox="0 0 16 16"><path d="m6 3.5 4.5 4.5L6 12.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>}</span>;
});

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(function AccordionContent(
  { className, "data-slot": slot, ...props },
  ref,
) {
  return <AtomAccordion.Content {...props} className={classes("brick-accordion-content", className)} data-slot={slot ?? "accordion-content"} ref={ref} />;
});

export const AccordionContentInner = forwardRef<HTMLDivElement, AccordionContentInnerProps>(function AccordionContentInner(
  { className, "data-slot": slot, ...props },
  ref,
) {
  return <div {...props} className={classes("brick-accordion-content-inner", className)} data-slot={slot ?? "accordion-content-inner"} ref={ref} />;
});

AccordionRoot.displayName = "Accordion.Root";
AccordionItem.displayName = "Accordion.Item";
AccordionHeader.displayName = "Accordion.Header";
AccordionTrigger.displayName = "Accordion.Trigger";
AccordionIndicator.displayName = "Accordion.Indicator";
AccordionContent.displayName = "Accordion.Content";
AccordionContentInner.displayName = "Accordion.ContentInner";

export const Accordion = Object.freeze({
  Root: AccordionRoot,
  Item: AccordionItem,
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Indicator: AccordionIndicator,
  Content: AccordionContent,
  ContentInner: AccordionContentInner,
});
