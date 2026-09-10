"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import { ActionBar as AtomActionBar, type ActionBarRootProps,
  type ActionBarContentProps as AtomActionBarContentProps, type ActionBarCloseTriggerProps,
  type ActionBarSelectionTriggerProps, type ActionBarContextValue } from "@flowstack-ui/atom/action-bar";
import { Divider } from "../divider/Divider.js";

export type ActionBarContentProps = AtomActionBarContentProps & { radius?: Radius };
export type { ActionBarRootProps, ActionBarCloseTriggerProps,
  ActionBarSelectionTriggerProps, ActionBarContextValue };
export type ActionBarPlacement = "bottom" | "bottom-start" | "bottom-end";
export interface ActionBarPositionerProps extends HTMLAttributes<HTMLDivElement> {
  placement?: ActionBarPlacement;
}
export type ActionBarSeparatorProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;
const cx = (base: string, extra?: string) => extra ? `${base} ${extra}` : base;

export const ActionBarRoot = AtomActionBar.Root;
export const ActionBarRootProvider = AtomActionBar.RootProvider;
export const ActionBarContext = AtomActionBar.Context;
export const ActionBarPortal = AtomActionBar.Portal;
export const ActionBarTitle = AtomActionBar.Title;
export const ActionBarDescription = AtomActionBar.Description;

export const ActionBarPositioner = forwardRef<HTMLDivElement, ActionBarPositionerProps>(
  function ActionBarPositioner({ placement = "bottom", className, ...props }, ref) {
    return <AtomActionBar.Positioner {...props} ref={ref} className={cx("brick-action-bar__positioner", className)}
      data-slot="action-bar-positioner" data-placement={placement} />;
  },
);
export const ActionBarContent = forwardRef<HTMLDivElement, ActionBarContentProps>(
  function ActionBarContent({ className, radius, style, ...props }, ref) {
    return <AtomActionBar.Content {...props} ref={ref} style={radiusStyle(radius, "--brick-action-bar-radius", style)} className={cx("brick-action-bar", className)} />;
  },
);
export const ActionBarSelectionTrigger = forwardRef<HTMLButtonElement, ActionBarSelectionTriggerProps>(
  function ActionBarSelectionTrigger({ className, ...props }, ref) {
    return <AtomActionBar.SelectionTrigger {...props} ref={ref} className={cx("brick-action-bar__selection-trigger", className)} />;
  },
);
export const ActionBarCloseTrigger = AtomActionBar.CloseTrigger;
export const ActionBarSeparator = forwardRef<HTMLDivElement, ActionBarSeparatorProps>(
  function ActionBarSeparator({ className, ...props }, ref) {
    return <Divider {...props} ref={ref} orientation="vertical" stretch={false}
      className={cx("brick-action-bar__separator", className)} />;
  },
);
export const ActionBar = { Root: ActionBarRoot, RootProvider: ActionBarRootProvider,
  Context: ActionBarContext, Portal: ActionBarPortal, Positioner: ActionBarPositioner,
  Content: ActionBarContent, SelectionTrigger: ActionBarSelectionTrigger,
  CloseTrigger: ActionBarCloseTrigger, Separator: ActionBarSeparator,
  Title: ActionBarTitle, Description: ActionBarDescription } as const;
