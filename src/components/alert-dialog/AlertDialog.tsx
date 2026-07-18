import { forwardRef, type HTMLAttributes } from "react";
import {
  AlertDialog as AtomAlertDialog,
  type AlertDialogActionProps as AtomAlertDialogActionProps,
  type AlertDialogCancelProps as AtomAlertDialogCancelProps,
  type AlertDialogContentProps as AtomAlertDialogContentProps,
  type AlertDialogDescriptionProps as AtomAlertDialogDescriptionProps,
  type AlertDialogOverlayProps as AtomAlertDialogOverlayProps,
  type AlertDialogPortalProps as AtomAlertDialogPortalProps,
  type AlertDialogRootProps as AtomAlertDialogRootProps,
  type AlertDialogTitleProps as AtomAlertDialogTitleProps,
  type AlertDialogTriggerProps as AtomAlertDialogTriggerProps,
} from "@flowstack-ui/atom/alert-dialog";

export type AlertDialogSize = "sm" | "md";
export type AlertDialogRootProps = AtomAlertDialogRootProps;
export type AlertDialogTriggerProps = AtomAlertDialogTriggerProps;
export type AlertDialogPortalProps = AtomAlertDialogPortalProps;
export type AlertDialogOverlayProps = Omit<AtomAlertDialogOverlayProps, "disabled">;
export interface AlertDialogContentProps extends AtomAlertDialogContentProps {
  size?: AlertDialogSize;
}
export type AlertDialogHeaderProps = HTMLAttributes<HTMLDivElement> & {
  "data-slot"?: string;
};
export type AlertDialogBodyProps = HTMLAttributes<HTMLDivElement> & {
  "data-slot"?: string;
};
export type AlertDialogFooterProps = HTMLAttributes<HTMLDivElement> & {
  "data-slot"?: string;
};
export type AlertDialogTitleProps = AtomAlertDialogTitleProps;
export type AlertDialogDescriptionProps = AtomAlertDialogDescriptionProps;
export type AlertDialogCancelProps = AtomAlertDialogCancelProps;
export type AlertDialogActionProps = AtomAlertDialogActionProps;

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function slotOrDefault(slot: string | undefined, fallback: string) {
  return slot ?? fallback;
}

export const AlertDialogRoot = AtomAlertDialog.Root;
export const AlertDialogPortal = AtomAlertDialog.Portal;

export const AlertDialogTrigger = forwardRef<HTMLElement, AlertDialogTriggerProps>(
  function AlertDialogTrigger({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomAlertDialog.Trigger
        {...props}
        className={mergeClassName("brick-alert-dialog-trigger", className)}
        data-slot={slotOrDefault(dataSlot, "alert-dialog-trigger")}
        ref={ref}
      />
    );
  },
);

export const AlertDialogOverlay = forwardRef<
  HTMLDivElement,
  AlertDialogOverlayProps
>(function AlertDialogOverlay(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomAlertDialog.Overlay
      {...props}
      className={mergeClassName("brick-alert-dialog-overlay", className)}
      data-slot={slotOrDefault(dataSlot, "alert-dialog-overlay")}
      ref={ref}
    />
  );
});

export const AlertDialogContent = forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>(function AlertDialogContent(
  { className, size = "md", "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomAlertDialog.Content
      {...props}
      className={mergeClassName("brick-alert-dialog-content", className)}
      data-size={size}
      data-slot={slotOrDefault(dataSlot, "alert-dialog-content")}
      ref={ref}
    />
  );
});

export const AlertDialogHeader = forwardRef<
  HTMLDivElement,
  AlertDialogHeaderProps
>(function AlertDialogHeader(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <div
      {...props}
      className={mergeClassName("brick-alert-dialog-header", className)}
      data-slot={slotOrDefault(dataSlot, "alert-dialog-header")}
      ref={ref}
    />
  );
});

export const AlertDialogTitle = forwardRef<
  HTMLHeadingElement,
  AlertDialogTitleProps
>(function AlertDialogTitle(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomAlertDialog.Title
      {...props}
      className={mergeClassName("brick-alert-dialog-title", className)}
      data-slot={slotOrDefault(dataSlot, "alert-dialog-title")}
      ref={ref}
    />
  );
});

export const AlertDialogDescription = forwardRef<
  HTMLParagraphElement,
  AlertDialogDescriptionProps
>(function AlertDialogDescription(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomAlertDialog.Description
      {...props}
      className={mergeClassName("brick-alert-dialog-description", className)}
      data-slot={slotOrDefault(dataSlot, "alert-dialog-description")}
      ref={ref}
    />
  );
});

export const AlertDialogBody = forwardRef<HTMLDivElement, AlertDialogBodyProps>(
  function AlertDialogBody({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <div
        {...props}
        className={mergeClassName("brick-alert-dialog-body", className)}
        data-slot={slotOrDefault(dataSlot, "alert-dialog-body")}
        ref={ref}
      />
    );
  },
);

export const AlertDialogFooter = forwardRef<
  HTMLDivElement,
  AlertDialogFooterProps
>(function AlertDialogFooter(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <div
      {...props}
      className={mergeClassName("brick-alert-dialog-footer", className)}
      data-slot={slotOrDefault(dataSlot, "alert-dialog-footer")}
      ref={ref}
    />
  );
});

export const AlertDialogCancel = forwardRef<HTMLElement, AlertDialogCancelProps>(
  function AlertDialogCancel({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomAlertDialog.Cancel
        {...props}
        className={mergeClassName("brick-alert-dialog-cancel", className)}
        data-slot={slotOrDefault(dataSlot, "alert-dialog-cancel")}
        ref={ref}
      />
    );
  },
);

export const AlertDialogAction = forwardRef<HTMLElement, AlertDialogActionProps>(
  function AlertDialogAction({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomAlertDialog.Action
        {...props}
        className={mergeClassName("brick-alert-dialog-action", className)}
        data-slot={slotOrDefault(dataSlot, "alert-dialog-action")}
        ref={ref}
      />
    );
  },
);

AlertDialogTrigger.displayName = "AlertDialog.Trigger";
AlertDialogOverlay.displayName = "AlertDialog.Overlay";
AlertDialogContent.displayName = "AlertDialog.Content";
AlertDialogHeader.displayName = "AlertDialog.Header";
AlertDialogTitle.displayName = "AlertDialog.Title";
AlertDialogDescription.displayName = "AlertDialog.Description";
AlertDialogBody.displayName = "AlertDialog.Body";
AlertDialogFooter.displayName = "AlertDialog.Footer";
AlertDialogCancel.displayName = "AlertDialog.Cancel";
AlertDialogAction.displayName = "AlertDialog.Action";

export const AlertDialog = Object.freeze({
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Portal: AlertDialogPortal,
  Overlay: AlertDialogOverlay,
  Content: AlertDialogContent,
  Header: AlertDialogHeader,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Body: AlertDialogBody,
  Footer: AlertDialogFooter,
  Cancel: AlertDialogCancel,
  Action: AlertDialogAction,
});
