"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
import {
  Drawer as AtomDrawer,
  type DrawerCloseProps as AtomDrawerCloseProps,
  type DrawerContentProps as AtomDrawerContentProps,
  type DrawerDescriptionProps as AtomDrawerDescriptionProps,
  type DrawerOverlayProps as AtomDrawerOverlayProps,
  type DrawerPortalProps as AtomDrawerPortalProps,
  type DrawerTitleProps as AtomDrawerTitleProps,
  type DrawerTriggerProps as AtomDrawerTriggerProps,
  type DrawerPositionerProps as AtomDrawerPositionerProps,
  type DrawerContextProps,
  type DrawerContextValue,
  type ModalRootProps as AtomModalRootProps,
} from "@flowstack-ui/atom/drawer";
import {
  Modal as AtomModal,
  type ModalBranchProps as AtomModalBranchProps,
} from "@flowstack-ui/atom/modal";

export type DrawerPlacement = "start" | "end" | "top" | "bottom";
export type DrawerSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";
export type DrawerPositioning = "fixed" | "absolute";
export type DrawerInset = "none" | "sm" | "md" | "lg";
export type DrawerClosePlacement = "inline" | "corner";
export interface DrawerPositionerProps extends AtomDrawerPositionerProps {
  /** Containing block: viewport or an explicitly positioned application region. */
  positioning?: DrawerPositioning;
  inset?: DrawerInset;
}
export type { DrawerContextProps, DrawerContextValue };
export type DrawerFooterJustify = "start" | "center" | "end" | "between";
export type DrawerRootProps = AtomModalRootProps;
export type DrawerTriggerProps = AtomDrawerTriggerProps;
export type DrawerPortalProps = AtomDrawerPortalProps;
export type DrawerOverlayProps = AtomDrawerOverlayProps & { positioning?: DrawerPositioning };
export interface DrawerContentProps
  extends Omit<AtomDrawerContentProps, "placement"> {
  /** Logical edge from which the Drawer enters. @default "end" */
  placement?: ResponsiveValue<DrawerPlacement>;
  /** Complete Drawer dimension recipe. @default "xs" */
  size?: ResponsiveValue<DrawerSize>;
  radius?: Radius;
}
export type DrawerHeaderProps = HTMLAttributes<HTMLDivElement> & {
  "data-slot"?: string;
};
export type DrawerBodyProps = HTMLAttributes<HTMLDivElement> & {
  "data-slot"?: string;
};
export type DrawerFooterProps = HTMLAttributes<HTMLDivElement> & {
  /** Logical action distribution. @default "end" */
  justify?: DrawerFooterJustify;
  "data-slot"?: string;
};
export type DrawerTitleProps = AtomDrawerTitleProps;
export type DrawerDescriptionProps = AtomDrawerDescriptionProps;
export type DrawerCloseProps = AtomDrawerCloseProps & { placement?: DrawerClosePlacement };
export type DrawerBranchProps = AtomModalBranchProps;

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function slotOrDefault(slot: string | undefined, fallback: string) {
  return slot ?? fallback;
}

export const DrawerRoot = AtomDrawer.Root;
export const DrawerPortal = AtomDrawer.Portal;
export const DrawerContext = AtomDrawer.Context;
export const DrawerPositioner = forwardRef<HTMLDivElement, DrawerPositionerProps>(
  function DrawerPositioner({ positioning = "fixed", inset = "none", className, "data-slot": slot, ...props }, ref) {
    return <AtomDrawer.Positioner {...props} ref={ref}
      className={mergeClassName("brick-drawer-positioner", className)}
      data-positioning={positioning} data-inset={inset}
      data-slot={slotOrDefault(slot, "drawer-positioner")} />;
  },
);

export const DrawerTrigger = forwardRef<HTMLElement, DrawerTriggerProps>(
  function DrawerTrigger({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomDrawer.Trigger
        {...props}
        className={mergeClassName("brick-drawer-trigger", className)}
        data-slot={slotOrDefault(dataSlot, "drawer-trigger")}
        ref={ref}
      />
    );
  },
);

export const DrawerOverlay = forwardRef<HTMLDivElement, DrawerOverlayProps>(
  function DrawerOverlay({ className, positioning = "fixed", "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomDrawer.Overlay
        {...props}
        className={mergeClassName("brick-drawer-overlay", className)}
        data-positioning={positioning}
        data-slot={slotOrDefault(dataSlot, "drawer-overlay")}
        ref={ref}
      />
    );
  },
);

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  function DrawerContent(
    {
      className,
      placement = "end",
      size = "xs",
      radius,
      style,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <AtomDrawer.Content
        {...props}
        className={mergeClassName("brick-drawer-content", className)}
        style={radiusStyle(radius, "--brick-drawer-radius", style)}
        {...responsiveDataAttributes("data-size", size, { defaultValue: "xs", alwaysInitial: true })}
        data-slot={slotOrDefault(dataSlot, "drawer-content")}
        {...responsiveDataAttributes("data-placement", placement, { defaultValue: "end", alwaysInitial: true })}
        placement={typeof placement === "string" ? placement : placement.initial ?? "end"}
        ref={ref}
      />
    );
  },
);

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  function DrawerHeader({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <div
        {...props}
        className={mergeClassName("brick-drawer-header", className)}
        data-slot={slotOrDefault(dataSlot, "drawer-header")}
        ref={ref}
      />
    );
  },
);

export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  function DrawerTitle({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomDrawer.Title
        {...props}
        className={mergeClassName("brick-drawer-title", className)}
        data-slot={slotOrDefault(dataSlot, "drawer-title")}
        ref={ref}
      />
    );
  },
);

export const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  DrawerDescriptionProps
>(function DrawerDescription(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomDrawer.Description
      {...props}
      className={mergeClassName("brick-drawer-description", className)}
      data-slot={slotOrDefault(dataSlot, "drawer-description")}
      ref={ref}
    />
  );
});

export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  function DrawerBody({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <div
        {...props}
        className={mergeClassName("brick-drawer-body", className)}
        data-slot={slotOrDefault(dataSlot, "drawer-body")}
        ref={ref}
      />
    );
  },
);

export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  function DrawerFooter(
    { className, justify = "end", "data-slot": dataSlot, ...props },
    ref,
  ) {
    return (
      <div
        {...props}
        className={mergeClassName("brick-drawer-footer", className)}
        data-justify={justify}
        data-slot={slotOrDefault(dataSlot, "drawer-footer")}
        ref={ref}
      />
    );
  },
);

export const DrawerClose = forwardRef<HTMLElement, DrawerCloseProps>(
  function DrawerClose({ className, placement = "inline", "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomDrawer.Close
        {...props}
        className={mergeClassName("brick-drawer-close", className)}
        data-placement={placement}
        data-slot={slotOrDefault(dataSlot, "drawer-close")}
        ref={ref}
      />
    );
  },
);

export const DrawerBranch = forwardRef<HTMLElement, DrawerBranchProps>(
  function DrawerBranch({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomModal.Branch
        {...props}
        className={mergeClassName("brick-drawer-branch", className)}
        data-slot={slotOrDefault(dataSlot, "drawer-branch")}
        ref={ref}
      />
    );
  },
);

DrawerTrigger.displayName = "Drawer.Trigger";
DrawerOverlay.displayName = "Drawer.Overlay";
DrawerContent.displayName = "Drawer.Content";
DrawerHeader.displayName = "Drawer.Header";
DrawerTitle.displayName = "Drawer.Title";
DrawerDescription.displayName = "Drawer.Description";
DrawerBody.displayName = "Drawer.Body";
DrawerFooter.displayName = "Drawer.Footer";
DrawerClose.displayName = "Drawer.Close";
DrawerBranch.displayName = "Drawer.Branch";

export const Drawer = Object.freeze({
  Context: DrawerContext,
  Positioner: DrawerPositioner,
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Portal: DrawerPortal,
  Overlay: DrawerOverlay,
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Body: DrawerBody,
  Footer: DrawerFooter,
  Close: DrawerClose,
  Branch: DrawerBranch,
});
