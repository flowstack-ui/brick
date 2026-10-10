"use client";

import { forwardRef } from "react";
import {
  Popover, usePopover, usePopoverState,
  type PopoverRootProps, type UsePopoverOptions,
  type PopoverContentProps, type PopoverBodyProps,
} from "../popover/index.js";

export type ToggleTipSize = "xs" | "sm" | "md" | "lg";
export type ToggleTipRootProps = PopoverRootProps;
export type UseToggleTipOptions = UsePopoverOptions;
export interface ToggleTipContentProps extends Omit<PopoverContentProps, "size" | "density" | "inset"> {
  /** Complete compact typography and padding recipe. @default "xs" */
  size?: ToggleTipSize;
}
export type ToggleTipBodyProps = PopoverBodyProps;

export function ToggleTipRoot({ positioning, ...props }: ToggleTipRootProps) {
  return <Popover.Root {...props} positioning={{ gutter: 4, ...positioning }} />;
}
export function useToggleTip({ positioning, ...options }: UseToggleTipOptions = {}) {
  return usePopover({ ...options, positioning: { gutter: 4, ...positioning } });
}
export const useToggleTipState = usePopoverState;

export const ToggleTipContent = forwardRef<HTMLDivElement, ToggleTipContentProps>(
  function ToggleTipContent({ size = "xs", radius = "sm", className, ...props }, ref) {
    return (
      <Popover.Content {...props} size="sm" radius={radius}
        className={["brick-toggle-tip", className].filter(Boolean).join(" ")}
        data-tip-size={size} ref={ref} />
    );
  },
);
export const ToggleTipBody = forwardRef<HTMLElement, ToggleTipBodyProps>(
  function ToggleTipBody({ className, ...props }, ref) {
    return <Popover.Body {...props} className={["brick-toggle-tip__body", className].filter(Boolean).join(" ")} ref={ref} />;
  },
);

export const ToggleTip = Object.freeze({
  Root: ToggleTipRoot,
  RootProvider: Popover.RootProvider,
  State: Popover.State,
  Anchor: Popover.Anchor,
  Trigger: Popover.Trigger,
  Portal: Popover.Portal,
  Content: ToggleTipContent,
  Body: ToggleTipBody,
  Title: Popover.Title,
  Description: Popover.Description,
  Close: Popover.Close,
  Arrow: Popover.Arrow,
  Indicator: Popover.Indicator,
});
