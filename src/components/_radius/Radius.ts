import type { CSSProperties } from "react";

/** Core sizes are distinct from appearance-invariant semantic radius roles. */
export type Radius =
  | "none"
  | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
  | "subtle" | "control" | "surface" | "overlay" | "full";

const radiusValues: Record<Radius, string> = {
  none: "0px",
  "2xs": "var(--brick-radius-core-2xs)",
  xs: "var(--brick-radius-core-xs)",
  sm: "var(--brick-radius-core-sm)",
  md: "var(--brick-radius-core-md)",
  lg: "var(--brick-radius-core-lg)",
  xl: "var(--brick-radius-core-xl)",
  "2xl": "var(--brick-radius-core-2xl)",
  "3xl": "var(--brick-radius-core-3xl)",
  "4xl": "var(--brick-radius-core-4xl)",
  subtle: "var(--brick-radius-subtle)",
  control: "var(--brick-radius-control)",
  surface: "var(--brick-radius-surface)",
  overlay: "var(--brick-radius-overlay)",
  full: "var(--brick-radius-full)",
};

/** Finite token selection only; do not forward untyped arbitrary input to CSS. */
export function radiusStyle(
  radius: Radius | undefined,
  property: `--brick-${string}`,
  style?: CSSProperties,
): CSSProperties | undefined {
  if (radius === undefined || !Object.prototype.hasOwnProperty.call(radiusValues, radius)) return style;
  return { [property]: radiusValues[radius], ...style };
}

/** Legacy corner recipes remain supported, but cannot be mixed with radius. */
export type RadiusShapeProps<Shape extends string> =
  | { radius?: Radius; shape?: never }
  | { radius?: never; /** @deprecated Use radius for corner selection. */ shape?: Shape };

export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
