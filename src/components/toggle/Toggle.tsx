import { forwardRef } from "react";
import {
  Toggle as AtomToggle,
  type ToggleRootProps as AtomToggleRootProps,
} from "@flowstack-ui/atom/toggle";

export type ToggleVariant = "soft" | "outline" | "ghost";
export type ToggleSize = "sm" | "md" | "lg";
export type ToggleShape = "rounded" | "pill";

export type ToggleProps = Omit<AtomToggleRootProps, "color" | "value"> & {
  /** Resting and selected visual treatment. @default "soft" */
  variant?: ToggleVariant;
  /** Complete control size. @default "md" */
  size?: ToggleSize;
  /** Control geometry. @default "rounded" */
  shape?: ToggleShape;
  /** Use square padding for icon-only content. @default false */
  iconOnly?: boolean;
};

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  {
    variant = "soft",
    size = "md",
    shape = "rounded",
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
      data-shape={shape}
      data-size={size}
      data-variant={variant}
      ref={ref}
    />
  );
});

Toggle.displayName = "Toggle";
