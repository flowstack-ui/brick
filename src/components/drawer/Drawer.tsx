import { forwardRef, type HTMLAttributes } from "react";
import {
  Drawer as AtomDrawer,
  type DrawerCloseProps as AtomDrawerCloseProps,
  type DrawerContentProps as AtomDrawerContentProps,
  type DrawerDescriptionProps as AtomDrawerDescriptionProps,
  type DrawerOverlayProps as AtomDrawerOverlayProps,
  type DrawerPortalProps as AtomDrawerPortalProps,
  type DrawerTitleProps as AtomDrawerTitleProps,
  type DrawerTriggerProps as AtomDrawerTriggerProps,
  type ModalRootProps as AtomModalRootProps,
} from "@flowstack-ui/atom/drawer";
import {
  Modal as AtomModal,
  type ModalBranchProps as AtomModalBranchProps,
} from "@flowstack-ui/atom/modal";

export type DrawerPlacement = "start" | "end" | "top" | "bottom";
export type DrawerSize = "sm" | "md" | "lg" | "full";
export type DrawerRootProps = AtomModalRootProps;
export type DrawerTriggerProps = AtomDrawerTriggerProps;
export type DrawerPortalProps = AtomDrawerPortalProps;
export type DrawerOverlayProps = AtomDrawerOverlayProps;
export interface DrawerContentProps
  extends Omit<AtomDrawerContentProps, "placement"> {
  /** Logical edge from which the Drawer enters. @default "end" */
  placement?: DrawerPlacement;
  /** Complete Drawer dimension recipe. @default "md" */
  size?: DrawerSize;
}
export type DrawerHeaderProps = HTMLAttributes<HTMLDivElement> & {
  "data-slot"?: string;
};
export type DrawerBodyProps = HTMLAttributes<HTMLDivElement> & {
  "data-slot"?: string;
};
export type DrawerFooterProps = HTMLAttributes<HTMLDivElement> & {
  "data-slot"?: string;
};
export type DrawerTitleProps = AtomDrawerTitleProps;
export type DrawerDescriptionProps = AtomDrawerDescriptionProps;
export type DrawerCloseProps = AtomDrawerCloseProps;
export type DrawerBranchProps = AtomModalBranchProps;

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function slotOrDefault(slot: string | undefined, fallback: string) {
  return slot ?? fallback;
}

export const DrawerRoot = AtomDrawer.Root;
export const DrawerPortal = AtomDrawer.Portal;

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
  function DrawerOverlay({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomDrawer.Overlay
        {...props}
        className={mergeClassName("brick-drawer-overlay", className)}
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
      size = "md",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <AtomDrawer.Content
        {...props}
        className={mergeClassName("brick-drawer-content", className)}
        data-size={size}
        data-slot={slotOrDefault(dataSlot, "drawer-content")}
        placement={placement}
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
  function DrawerFooter({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <div
        {...props}
        className={mergeClassName("brick-drawer-footer", className)}
        data-slot={slotOrDefault(dataSlot, "drawer-footer")}
        ref={ref}
      />
    );
  },
);

export const DrawerClose = forwardRef<HTMLElement, DrawerCloseProps>(
  function DrawerClose({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomDrawer.Close
        {...props}
        className={mergeClassName("brick-drawer-close", className)}
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
