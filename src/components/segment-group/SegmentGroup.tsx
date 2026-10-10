"use client";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import {
  RadioGroup as AtomRadioGroup,
  type RadioGroupRootProps as AtomRootProps,
  type RadioRootProps as AtomItemProps,
} from "@flowstack-ui/atom/radio-group";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import { For } from "../for/For.js";

export type SegmentGroupSize = "2xs" | "xs" | "sm" | "md" | "lg";
export type SegmentGroupTone = "neutral" | "accent" | "contrast";
export interface SegmentGroupRootProps extends AtomRootProps {
  radius?: Radius;
  /** Shared geometry. @default "md" */
  size?: SegmentGroupSize;
  /** Selected fill and foreground pair. @default "neutral" */
  tone?: SegmentGroupTone;
  /** Distribute items across the available width. @default false */
  fullWidth?: boolean;
}
export interface SegmentGroupItemProps extends AtomItemProps {
  iconOnly?: boolean;
}
export interface SegmentGroupItemTextProps
  extends HTMLAttributes<HTMLSpanElement> {
  "data-slot"?: string;
}
export interface SegmentGroupIndicatorProps
  extends HTMLAttributes<HTMLSpanElement> {
  "data-slot"?: string;
}
export interface SegmentGroupItemsProps {
  items: readonly (
    | string
    | { value: string; label: ReactNode; disabled?: boolean }
  )[];
}
const mergeClassName = (base: string, extra?: string) =>
  extra ? `${base} ${extra}` : base;

export const SegmentGroupRoot = forwardRef<
  HTMLDivElement,
  SegmentGroupRootProps
>(function SegmentGroupRoot(
  {
    className,
    fullWidth = false,
    orientation = "horizontal",
    size = "md",
    tone = "neutral",
    radius,
    style,
    "data-slot": slot,
    ...props
  },
  ref,
) {
  return (
    <AtomRadioGroup.Root
      {...props}
      ref={ref}
      orientation={orientation}
      className={mergeClassName("brick-segment-group", className)}
      style={radiusStyle(radius, "--brick-segment-group-radius", style)}
      data-size={size}
      data-tone={tone}
      data-full-width={fullWidth ? "" : undefined}
      data-slot={slot ?? "segment-group"}
    />
  );
});
export const SegmentGroupItem = forwardRef<
  HTMLButtonElement,
  SegmentGroupItemProps
>(function SegmentGroupItem(
  { className, iconOnly = false, "data-slot": slot, ...props },
  ref,
) {
  return (
    <AtomRadioGroup.Radio
      {...props}
      ref={ref}
      className={mergeClassName("brick-segment-group__item", className)}
      data-icon-only={iconOnly ? "" : undefined}
      data-slot={slot ?? "segment-group-item"}
    />
  );
});
export const SegmentGroupItemText = forwardRef<
  HTMLSpanElement,
  SegmentGroupItemTextProps
>(function SegmentGroupItemText(
  { className, "data-slot": slot, ...props },
  ref,
) {
  return (
    <span
      {...props}
      ref={ref}
      className={mergeClassName("brick-segment-group__item-text", className)}
      data-slot={slot ?? "segment-group-item-text"}
    />
  );
});
export const SegmentGroupIndicator = forwardRef<
  HTMLSpanElement,
  SegmentGroupIndicatorProps
>(function SegmentGroupIndicator(
  { className, "data-slot": slot, ...props },
  ref,
) {
  return (
    <AtomRadioGroup.Indicator
      {...props}
      ref={ref}
      className={mergeClassName("brick-segment-group__indicator", className)}
      data-slot={slot ?? "segment-group-indicator"}
    />
  );
});
/** Use Item directly for custom native props or icon-only labels. */
export function SegmentGroupItems({ items }: SegmentGroupItemsProps) {
  return (
    <For each={items}>
      {(entry) => {
        const item =
          typeof entry === "string" ? { value: entry, label: entry } : entry;
        return (
          <SegmentGroupItem
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            <SegmentGroupItemText>{item.label}</SegmentGroupItemText>
          </SegmentGroupItem>
        );
      }}
    </For>
  );
}
export const SegmentGroup = Object.freeze({
  Root: SegmentGroupRoot,
  Item: SegmentGroupItem,
  ItemText: SegmentGroupItemText,
  Indicator: SegmentGroupIndicator,
  Items: SegmentGroupItems,
});
