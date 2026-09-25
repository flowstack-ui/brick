import { createElement, forwardRef, type Ref } from "react";
import { composeHost } from "@flowstack-ui/atom/compose-host";
import type { StaticPartProps } from "../_internal/StaticPart.js";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";

export type StatSize = "sm" | "md" | "lg";
export type ResponsiveStatSize = ResponsiveValue<StatSize>;
export type StatTone = "neutral" | "accent" | "info" | "success" | "warning" | "danger";
export type StatRootProps = StaticPartProps & { size?: ResponsiveStatSize };
export type StatGroupProps = StaticPartProps & { size?: ResponsiveStatSize };
export type StatLabelProps = StaticPartProps;
export type StatValueTextProps = StaticPartProps;
export type StatValueUnitProps = StaticPartProps;
export type StatHelpTextProps = StaticPartProps;
export type StatIndicatorProps = StaticPartProps & { tone?: StatTone };

// Stat owns only its styled anatomy; Atom owns projection and ref/event merging.
function staticPart(tag: "dl" | "div" | "dt" | "dd" | "span", props: StaticPartProps, ref: Ref<HTMLElement>, base: string, slot: string) {
  const { asChild, children, className, "data-slot": dataSlot = slot, ...native } = props;
  const host = { ...native, ref, className: [base, className].filter(Boolean).join(" "), "data-slot": dataSlot };
  return asChild ? composeHost(children, host) : createElement(tag, host, children);
}

function sizeAttributes(size: ResponsiveStatSize | undefined) {
  return size === undefined ? {} : responsiveDataAttributes("data-size", size, { defaultValue: "md", alwaysInitial: true });
}

// An omitted size inherits its Group through CSS without a client-only context.
export const StatRoot = forwardRef<HTMLElement, StatRootProps>(function StatRoot({ size, ...props }, ref) {
  return staticPart("dl", { ...props, ...sizeAttributes(size) }, ref, "brick-stat", "stat");
});
export const StatGroup = forwardRef<HTMLElement, StatGroupProps>(function StatGroup({ size, ...props }, ref) {
  return staticPart("div", { role: "group", ...props, ...sizeAttributes(size) }, ref, "brick-stat-group", "stat-group");
});
export const StatLabel = forwardRef<HTMLElement, StatLabelProps>((props, ref) => staticPart("dt", props, ref, "brick-stat-label", "stat-label"));
export const StatValueText = forwardRef<HTMLElement, StatValueTextProps>((props, ref) => staticPart("dd", props, ref, "brick-stat-value-text", "stat-value-text"));
export const StatValueUnit = forwardRef<HTMLElement, StatValueUnitProps>((props, ref) => staticPart("span", props, ref, "brick-stat-value-unit", "stat-value-unit"));
export const StatHelpText = forwardRef<HTMLElement, StatHelpTextProps>((props, ref) => staticPart("dd", props, ref, "brick-stat-help-text", "stat-help-text"));
export const StatUpIndicator = forwardRef<HTMLElement, StatIndicatorProps>(function StatUpIndicator({ tone = "success", children, ...props }, ref) {
  return staticPart("span", { ...props, "data-tone": tone, "aria-hidden": true, children: children ?? <svg viewBox="0 0 16 16" fill="currentColor" focusable="false"><path d="M8 3 14 13H2Z" /></svg> } as StaticPartProps, ref, "brick-stat-indicator", "stat-up-indicator");
});
export const StatDownIndicator = forwardRef<HTMLElement, StatIndicatorProps>(function StatDownIndicator({ tone = "danger", children, ...props }, ref) {
  return staticPart("span", { ...props, "data-tone": tone, "aria-hidden": true, children: children ?? <svg viewBox="0 0 16 16" fill="currentColor" focusable="false"><path d="m8 13 6-10H2Z" /></svg> } as StaticPartProps, ref, "brick-stat-indicator", "stat-down-indicator");
});
StatRoot.displayName = "Stat.Root";
StatGroup.displayName = "Stat.Group";
StatLabel.displayName = "Stat.Label";
StatValueText.displayName = "Stat.ValueText";
StatValueUnit.displayName = "Stat.ValueUnit";
StatHelpText.displayName = "Stat.HelpText";
StatUpIndicator.displayName = "Stat.UpIndicator";
StatDownIndicator.displayName = "Stat.DownIndicator";
export const Stat = Object.freeze({ Root: StatRoot, Group: StatGroup, Label: StatLabel, ValueText: StatValueText, ValueUnit: StatValueUnit, HelpText: StatHelpText, UpIndicator: StatUpIndicator, DownIndicator: StatDownIndicator });
