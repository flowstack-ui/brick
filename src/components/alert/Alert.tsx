"use client";
import { createContext, forwardRef, useContext } from "react";
import { staticPart, type StaticPartProps } from "../_internal/StaticPart.js";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";

export type AlertStatus = "info" | "warning" | "success" | "error" | "neutral";
export type AlertTone = "neutral" | "accent" | "info" | "success" | "warning" | "danger";
export type AlertVariant = "soft" | "surface" | "outline" | "solid";
export type AlertSize = "sm" | "md" | "lg";
export type AlertRootProps = StaticPartProps & {
  status?: AlertStatus; tone?: AlertTone; variant?: ResponsiveValue<AlertVariant>;
  size?: ResponsiveValue<AlertSize>; inline?: ResponsiveValue<boolean>;
  align?: ResponsiveValue<"start" | "center">; radius?: Radius; accentStart?: boolean;
};
export type AlertContentProps = StaticPartProps & { tone?: "inherit" | "primary" };
export type AlertTitleProps = StaticPartProps;
export type AlertDescriptionProps = StaticPartProps;
export type AlertIndicatorProps = StaticPartProps;
const StatusContext = createContext<AlertStatus>("info");

export const AlertRoot = forwardRef<HTMLElement, AlertRootProps>(function AlertRoot(
  { status = "info", tone, variant = "soft", size = "md", inline = false,
    align = "start", radius, accentStart = false, style, ...props }, ref,
) {
  const palette = tone ?? (status === "error" ? "danger" : status);
  return <StatusContext.Provider value={status}>{staticPart("div", {
    ...props, style: radiusStyle(radius, "--brick-alert-radius", style),
    "data-status": status, "data-tone": palette, "data-accent-start": accentStart ? "" : undefined,
    ...responsiveDataAttributes("data-variant", variant, { defaultValue: "soft", alwaysInitial: true }),
    ...responsiveDataAttributes("data-size", size, { defaultValue: "md", alwaysInitial: true }),
    ...responsiveDataAttributes("data-inline", inline, { defaultValue: false }),
    ...responsiveDataAttributes("data-align", align, { defaultValue: "start", alwaysInitial: true }),
  } as StaticPartProps, ref, "brick-alert", "alert")}</StatusContext.Provider>;
});
export const AlertContent = forwardRef<HTMLElement, AlertContentProps>(({ tone = "inherit", ...props }, ref) => staticPart("div", { ...props, "data-tone": tone } as StaticPartProps, ref, "brick-alert-content", "alert-content"));
export const AlertTitle = forwardRef<HTMLElement, AlertTitleProps>((props, ref) => staticPart("div", props, ref, "brick-alert-title", "alert-title"));
export const AlertDescription = forwardRef<HTMLElement, AlertDescriptionProps>((props, ref) => staticPart("div", props, ref, "brick-alert-description", "alert-description"));

export const AlertIndicator = forwardRef<HTMLSpanElement, AlertIndicatorProps>(function AlertIndicator(
  { children, "data-slot": slot = "alert-indicator", ...props }, ref,
) {
  const status = useContext(StatusContext);
  return staticPart("span", { ...props, children: children ?? <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {status === "success" ? <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></> :
        status === "warning" || status === "error" ? <><path d="m12 3 10 18H2L12 3Z" /><path d="M12 9v4m0 4h.01" /></> :
        <><circle cx="12" cy="12" r="9" /><path d="M12 11v6m0-10h.01" /></>}
    </svg>, "data-slot": slot } as StaticPartProps, ref, "brick-alert-indicator", "alert-indicator");
});
AlertRoot.displayName = "Alert.Root";
AlertContent.displayName = "Alert.Content";
AlertTitle.displayName = "Alert.Title";
AlertDescription.displayName = "Alert.Description";
AlertIndicator.displayName = "Alert.Indicator";
export const Alert = Object.freeze({ Root: AlertRoot, Content: AlertContent, Title: AlertTitle, Description: AlertDescription, Indicator: AlertIndicator });
