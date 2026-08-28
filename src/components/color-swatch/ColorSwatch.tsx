import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";

export type ColorSwatchSize = "sm" | "md" | "lg";

export interface ColorSwatchRootProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "aria-hidden" | "children" | "color"> {
  value: string;
  size?: ColorSwatchSize;
  label?: string;
  "data-slot"?: string;
}

export interface ColorSwatchMixProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "aria-hidden" | "children" | "color"> {
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
        data-slot={slot}
        ref={ref}
        style={{ ...style, "--brick-color-swatch-value": value } as SwatchStyle}
      />
    );
  },
);

export const ColorSwatchMix = forwardRef<HTMLSpanElement, ColorSwatchMixProps>(
  function ColorSwatchMix(
    {
      values,
      size = "md",
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
        data-slot={slot}
        ref={ref}
        style={{ ...style, "--brick-color-swatch-value": gradient } as SwatchStyle}
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
