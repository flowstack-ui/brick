import { forwardRef } from "react";
import { radiusStyle, type RadiusShapeProps } from "../_radius/Radius.js";
import {
  Toggle as AtomToggle,
  type ToggleRootProps as AtomToggleRootProps,
} from "@flowstack-ui/atom/toggle";

export type ToggleVariant = "solid" | "soft" | "outline" | "ghost";
export type ToggleTone = "accent" | "neutral";
export type ToggleSize = "sm" | "md" | "lg";
export type ToggleShape = "rounded" | "pill";

export type ToggleProps = Omit<AtomToggleRootProps, "color" | "value"> & {
  /** Resting and selected visual treatment. @default "ghost" */
  variant?: ToggleVariant;
  /** Selected-state color treatment. @default "neutral" */
  tone?: ToggleTone;
  /** Complete control size. @default "md" */
  size?: ToggleSize;
  /** Use square padding for icon-only content. @default false */
  iconOnly?: boolean;
} & RadiusShapeProps<ToggleShape>;

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  {
    variant = "ghost",
    tone = "neutral",
    size = "md",
    shape = "rounded",
    radius,
    style,
    iconOnly = false,
    className,
    ...props
  },
  ref,
) {
  return (
    <AtomToggle.Root
      {...props}
      className={mergeClassName("brick-toggle", className)}
      data-icon-only={iconOnly ? "" : undefined}
      data-shape={radius === undefined ? shape : "rounded"}
      style={radiusStyle(radius, "--brick-toggle-radius", style)}
      data-size={size}
      data-tone={tone}
      data-variant={variant}
      ref={ref}
    />
  );
});

Toggle.displayName = "Toggle";
