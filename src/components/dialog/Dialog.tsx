import { forwardRef, type HTMLAttributes } from "react";
import {
  Dialog as AtomDialog,
  type DialogCloseProps as AtomDialogCloseProps,
  type DialogContentProps as AtomDialogContentProps,
  type DialogDescriptionProps as AtomDialogDescriptionProps,
  type DialogOverlayProps as AtomDialogOverlayProps,
  type DialogPortalProps as AtomDialogPortalProps,
  type DialogTitleProps as AtomDialogTitleProps,
  type DialogTriggerProps as AtomDialogTriggerProps,
  type ModalRootProps as AtomModalRootProps,
} from "@flowstack-ui/atom/dialog";
import {
  Modal as AtomModal,
  type ModalBranchProps as AtomModalBranchProps,
} from "@flowstack-ui/atom/modal";

export type DialogSize = "sm" | "md" | "lg";
export type DialogRootProps = AtomModalRootProps;
export type DialogTriggerProps = AtomDialogTriggerProps;
export type DialogPortalProps = AtomDialogPortalProps;
export type DialogOverlayProps = AtomDialogOverlayProps;
export interface DialogContentProps extends AtomDialogContentProps {
  size?: DialogSize;
}
export type DialogHeaderProps = HTMLAttributes<HTMLDivElement> & { "data-slot"?: string };
export type DialogBodyProps = HTMLAttributes<HTMLDivElement> & { "data-slot"?: string };
export type DialogFooterProps = HTMLAttributes<HTMLDivElement> & { "data-slot"?: string };
export type DialogTitleProps = AtomDialogTitleProps;
export type DialogDescriptionProps = AtomDialogDescriptionProps;
export type DialogCloseProps = AtomDialogCloseProps;
export type DialogBranchProps = AtomModalBranchProps;

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function slotOrDefault(slot: string | undefined, fallback: string) {
  return slot ?? fallback;
}

export const DialogRoot = AtomDialog.Root;
export const DialogPortal = AtomDialog.Portal;

export const DialogTrigger = forwardRef<HTMLElement, DialogTriggerProps>(
  function DialogTrigger({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomDialog.Trigger
        {...props}
        className={mergeClassName("brick-dialog-trigger", className)}
        data-slot={slotOrDefault(dataSlot, "dialog-trigger")}
        ref={ref}
      />
    );
  },
);

export const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  function DialogOverlay({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomDialog.Overlay
        {...props}
        className={mergeClassName("brick-dialog-overlay", className)}
        data-slot={slotOrDefault(dataSlot, "dialog-overlay")}
        ref={ref}
      />
    );
  },
);

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent(
    { className, size = "md", "data-slot": dataSlot, ...props },
    ref,
  ) {
    return (
      <AtomDialog.Content
        {...props}
        className={mergeClassName("brick-dialog-content", className)}
        data-size={size}
        data-slot={slotOrDefault(dataSlot, "dialog-content")}
        ref={ref}
      />
    );
  },
);

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  function DialogHeader({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <div
        {...props}
        className={mergeClassName("brick-dialog-header", className)}
        data-slot={slotOrDefault(dataSlot, "dialog-header")}
        ref={ref}
      />
    );
  },
);

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  function DialogTitle({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomDialog.Title
        {...props}
        className={mergeClassName("brick-dialog-title", className)}
        data-slot={slotOrDefault(dataSlot, "dialog-title")}
        ref={ref}
      />
    );
  },
);

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  function DialogDescription({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomDialog.Description
        {...props}
        className={mergeClassName("brick-dialog-description", className)}
        data-slot={slotOrDefault(dataSlot, "dialog-description")}
        ref={ref}
      />
    );
  },
);

export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  function DialogBody({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <div
        {...props}
        className={mergeClassName("brick-dialog-body", className)}
        data-slot={slotOrDefault(dataSlot, "dialog-body")}
        ref={ref}
      />
    );
  },
);

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  function DialogFooter({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <div
        {...props}
        className={mergeClassName("brick-dialog-footer", className)}
        data-slot={slotOrDefault(dataSlot, "dialog-footer")}
        ref={ref}
      />
    );
  },
);

export const DialogClose = forwardRef<HTMLElement, DialogCloseProps>(
  function DialogClose({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomDialog.Close
        {...props}
        className={mergeClassName("brick-dialog-close", className)}
        data-slot={slotOrDefault(dataSlot, "dialog-close")}
        ref={ref}
      />
    );
  },
);

export const DialogBranch = forwardRef<HTMLElement, DialogBranchProps>(
  function DialogBranch({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomModal.Branch
        {...props}
        className={mergeClassName("brick-dialog-branch", className)}
        data-slot={slotOrDefault(dataSlot, "modal-branch")}
        ref={ref}
      />
    );
  },
);

DialogTrigger.displayName = "Dialog.Trigger";
DialogOverlay.displayName = "Dialog.Overlay";
DialogContent.displayName = "Dialog.Content";
DialogHeader.displayName = "Dialog.Header";
DialogTitle.displayName = "Dialog.Title";
DialogDescription.displayName = "Dialog.Description";
DialogBody.displayName = "Dialog.Body";
DialogFooter.displayName = "Dialog.Footer";
DialogClose.displayName = "Dialog.Close";
DialogBranch.displayName = "Dialog.Branch";

export const Dialog = Object.freeze({
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
  Branch: DialogBranch,
});
