import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import { radiusStyle, type RadiusShapeProps } from "../_radius/Radius.js";

export type ColorSwatchSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inherit" | "full";
export type ColorSwatchShape = "sharp" | "rounded" | "circle";

export type ColorSwatchRootProps =
  Omit<HTMLAttributes<HTMLSpanElement>, "aria-hidden" | "children" | "color"> & RadiusShapeProps<ColorSwatchShape> & {
  value: string;
  size?: ColorSwatchSize;
  label?: string;
  "data-slot"?: string;
}

export type ColorSwatchMixProps =
  Omit<HTMLAttributes<HTMLSpanElement>, "aria-hidden" | "children" | "color"> & RadiusShapeProps<ColorSwatchShape> & {
  values: readonly [string, string, ...string[]];
  size?: ColorSwatchSize;
  label?: string;
  "data-slot"?: string;
}

type SwatchStyle = CSSProperties & {
  "--brick-color-swatch-value"?: string;
};

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

function accessibility(label: string | undefined) {
  return label
    ? { role: "img", "aria-label": label }
    : { "aria-hidden": true as const };
}

export const ColorSwatchRoot = forwardRef<HTMLSpanElement, ColorSwatchRootProps>(
  function ColorSwatchRoot(
    {
      value,
      size = "md",
      shape = "rounded",
      radius,
      label,
      className,
      style,
      "data-slot": slot = "color-swatch-root",
      ...props
    },
    ref,
  ) {
    return (
      <span
        {...props}
        {...accessibility(label)}
        className={classes("brick-color-swatch", className)}
        data-size={size}
        data-shape={radius === undefined ? shape : "rounded"}
        data-slot={slot}
        ref={ref}
        style={radiusStyle(radius, "--brick-color-swatch-radius", { ...style, "--brick-color-swatch-value": value } as SwatchStyle)}
      />
    );
  },
);

export const ColorSwatchMix = forwardRef<HTMLSpanElement, ColorSwatchMixProps>(
  function ColorSwatchMix(
    {
      values,
      size = "md",
      shape = "rounded",
      radius,
      label,
      className,
      style,
      "data-slot": slot = "color-swatch-mix",
      ...props
    },
    ref,
  ) {
    const segment = 100 / values.length;
    const gradient = `conic-gradient(${values.map((value, index) => `${value} ${index * segment}% ${(index + 1) * segment}%`).join(", ")})`;
    return (
      <span
        {...props}
        {...accessibility(label)}
        className={classes("brick-color-swatch brick-color-swatch--mix", className)}
        data-size={size}
        data-shape={radius === undefined ? shape : "rounded"}
        data-slot={slot}
        ref={ref}
        style={radiusStyle(radius, "--brick-color-swatch-radius", { ...style, "--brick-color-swatch-value": gradient } as SwatchStyle)}
      />
    );
  },
);

ColorSwatchRoot.displayName = "ColorSwatch.Root";
ColorSwatchMix.displayName = "ColorSwatch.Mix";

export const ColorSwatch = Object.freeze({
  Root: ColorSwatchRoot,
  Mix: ColorSwatchMix,
});
