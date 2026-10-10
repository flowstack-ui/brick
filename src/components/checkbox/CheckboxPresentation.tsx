"use client";
import { createContext, useContext, type CSSProperties } from "react";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import { radiusStyle, type Radius } from "../_radius/Radius.js";

export type CheckboxSize = "xs" | "sm" | "md" | "lg";
export type CheckboxVariant = "solid" | "outline" | "subtle";
export type CheckboxTone =
  | "neutral"
  | "accent"
  | "contrast"
  | "info"
  | "success"
  | "warning"
  | "danger";
export interface CheckboxPresentationProps {
  size?: ResponsiveValue<CheckboxSize>;
  variant?: CheckboxVariant;
  tone?: CheckboxTone;
  radius?: Radius;
  density?: "comfortable" | "compact";
  labelPlacement?: "start" | "end";
}
export const CheckboxPresentationContext =
  createContext<CheckboxPresentationProps>({});
CheckboxPresentationContext.displayName = "CheckboxPresentation";
export function useCheckboxPresentation(props: CheckboxPresentationProps) {
  const inherited = useContext(CheckboxPresentationContext);
  return {
    size: props.size ?? inherited.size ?? "md",
    variant: props.variant ?? inherited.variant ?? "solid",
    tone: props.tone ?? inherited.tone ?? "accent",
    radius: props.radius ?? inherited.radius,
    density: props.density ?? inherited.density ?? "comfortable",
    labelPlacement: props.labelPlacement ?? inherited.labelPlacement ?? "end",
  } as const;
}
export function checkboxPresentationAttributes(
  props: CheckboxPresentationProps,
  style?: CSSProperties,
) {
  return {
    ...responsiveDataAttributes("data-size", props.size ?? "md", {
      alwaysInitial: true,
      defaultValue: "md",
    }),
    "data-variant": props.variant,
    "data-tone": props.tone,
    "data-density": props.density,
    "data-label-placement": props.labelPlacement,
    style: radiusStyle(props.radius, "--brick-checkbox-radius", style),
  };
}
