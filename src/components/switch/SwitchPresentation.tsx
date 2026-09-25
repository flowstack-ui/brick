"use client";

import { createContext, useContext, type CSSProperties } from "react";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

export type SwitchSize = "xs" | "sm" | "md" | "lg";
export type SwitchVariant = "solid" | "raised";
export type SwitchLabelPlacement = "start" | "end";
export type SwitchTone =
  | "neutral"
  | "accent"
  | "contrast"
  | "info"
  | "success"
  | "warning"
  | "danger";

export interface SwitchPresentationProps {
  size?: ResponsiveValue<SwitchSize>;
  variant?: ResponsiveValue<SwitchVariant>;
  tone?: SwitchTone;
  labelPlacement?: SwitchLabelPlacement;
}

export const SwitchPresentationContext = createContext<SwitchPresentationProps>({});
SwitchPresentationContext.displayName = "SwitchPresentation";

export function useSwitchPresentation(props: SwitchPresentationProps) {
  const inherited = useContext(SwitchPresentationContext);
  return {
    size: props.size ?? inherited.size ?? "md",
    variant: props.variant ?? inherited.variant ?? "solid",
    tone: props.tone ?? inherited.tone ?? "accent",
    labelPlacement: props.labelPlacement ?? inherited.labelPlacement ?? "end",
  } as const;
}

export function switchPresentationAttributes(
  props: SwitchPresentationProps,
  style?: CSSProperties,
) {
  return {
    ...responsiveDataAttributes("data-size", props.size ?? "md", {
      alwaysInitial: true,
      defaultValue: "md",
    }),
    ...responsiveDataAttributes("data-variant", props.variant ?? "solid", {
      alwaysInitial: true,
      defaultValue: "solid",
    }),
    "data-tone": props.tone,
    "data-label-placement": props.labelPlacement,
    style,
  };
}
