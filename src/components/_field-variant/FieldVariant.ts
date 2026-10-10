import { normalizeResponsiveValue, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";

export type FieldVariant = "outline" | "surface" | "soft" | "subtle" | "ghost" | "plain" | "underline";
export type ResponsiveFieldVariant = ResponsiveValue<FieldVariant>;

/** Serialize inherited values so each media rule can restore complete paint. */
export function fieldVariantAttributes(variant: ResponsiveFieldVariant) {
  const values = normalizeResponsiveValue(variant);
  let current = values.initial ?? "outline";
  return Object.fromEntries((["initial", "sm", "md", "lg", "xl"] as const).map(key => {
    current = values[key] ?? current;
    return [key === "initial" ? "data-variant" : `data-variant-${key}`, current];
  }));
}
