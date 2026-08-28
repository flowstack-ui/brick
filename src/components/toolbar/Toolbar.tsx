import { forwardRef } from "react";
import {
  Toolbar as AtomToolbar,
  type ToolbarButtonProps as AtomToolbarButtonProps,
  type ToolbarLinkProps as AtomToolbarLinkProps,
  type ToolbarRootProps as AtomToolbarRootProps,
  type ToolbarSeparatorProps as AtomToolbarSeparatorProps,
  type ToolbarToggleGroupProps as AtomToolbarToggleGroupProps,
  type ToolbarToggleItemProps as AtomToolbarToggleItemProps,
} from "@flowstack-ui/atom/toolbar";

export type ToolbarVariant = "plain" | "soft" | "outline";
export type ToolbarSize = "sm" | "md" | "lg";

export interface ToolbarRootProps extends AtomToolbarRootProps {
  variant?: ToolbarVariant;
  size?: ToolbarSize;
}
export type ToolbarButtonProps = AtomToolbarButtonProps;
export type ToolbarLinkProps = AtomToolbarLinkProps;
export type ToolbarSeparatorProps = AtomToolbarSeparatorProps;
export type ToolbarToggleVariant = "solid" | "soft" | "outline" | "ghost";
export type ToolbarToggleTone = "accent" | "neutral";
export type ToolbarToggleGroupProps = Omit<AtomToolbarToggleGroupProps, "color"> & {
  /** Shared ToggleItem visual treatment. @default "soft" */
  variant?: ToolbarToggleVariant;
  /** Shared ToggleItem selected-state color treatment. @default "accent" */
  tone?: ToolbarToggleTone;
};
export type ToolbarToggleItemProps = AtomToolbarToggleItemProps;

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const ToolbarRoot = forwardRef<HTMLDivElement, ToolbarRootProps>(
  function ToolbarRoot({ className, size = "md", variant = "soft", ...props }, ref) {
    return <AtomToolbar.Root {...props} className={classes("brick-toolbar", className)} data-size={size} data-variant={variant} ref={ref} />;
  },
);
export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  function ToolbarButton({ className, ...props }, ref) {
    return <AtomToolbar.Button {...props} className={classes("brick-toolbar__button", className)} ref={ref} />;
  },
);
export const ToolbarLink = forwardRef<HTMLAnchorElement, ToolbarLinkProps>(
  function ToolbarLink({ className, ...props }, ref) {
    return <AtomToolbar.Link {...props} className={classes("brick-toolbar__link", className)} ref={ref} />;
  },
);
export function ToolbarSeparator({ className, ...props }: ToolbarSeparatorProps) {
  return <AtomToolbar.Separator {...props} className={classes("brick-toolbar__separator", className)} />;
}
export function ToolbarToggleGroup({ className, tone = "accent", variant = "soft", ...props }: ToolbarToggleGroupProps) {
  return <AtomToolbar.ToggleGroup {...props} className={classes("brick-toolbar__toggle-group", className)} data-tone={tone} data-variant={variant} />;
}
export const ToolbarToggleItem = forwardRef<HTMLButtonElement, ToolbarToggleItemProps>(
  function ToolbarToggleItem({ className, ...props }, ref) {
    return <AtomToolbar.ToggleItem {...props} className={classes("brick-toolbar__toggle-item", className)} ref={ref} />;
  },
);

ToolbarRoot.displayName = "Toolbar.Root";
ToolbarButton.displayName = "Toolbar.Button";
ToolbarLink.displayName = "Toolbar.Link";
ToolbarToggleItem.displayName = "Toolbar.ToggleItem";

export const Toolbar = { Root: ToolbarRoot, Button: ToolbarButton, Link: ToolbarLink, Separator: ToolbarSeparator, ToggleGroup: ToolbarToggleGroup, ToggleItem: ToolbarToggleItem } as const;
