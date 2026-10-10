import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

export type ControlSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type ResponsiveControlSize = ResponsiveValue<ControlSize>;

export function controlSizeDataAttributes(size: ResponsiveControlSize) {
  return responsiveDataAttributes("data-size", size, {
    alwaysInitial: true,
    defaultValue: "lg",
  });
}
