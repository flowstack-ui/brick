import { forwardRef } from "react";
import {
  Switch as AtomSwitch,
  type SwitchRootProps as AtomSwitchRootProps,
  type SwitchThumbProps as AtomSwitchThumbProps,
} from "@flowstack-ui/atom/switch";

export type SwitchSize = "xs" | "sm" | "md" | "lg";
export type SwitchVariant = "solid" | "raised";

export interface SwitchRootProps extends AtomSwitchRootProps {
  /** Complete visual control size. @default "md" */
  size?: SwitchSize;
  /** Track and thumb treatment. @default "solid" */
  variant?: SwitchVariant;
}

export type SwitchThumbProps = AtomSwitchThumbProps;

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

export const SwitchRoot = forwardRef<HTMLButtonElement, SwitchRootProps>(
  function SwitchRoot(
    {
      className,
      size = "md",
      variant = "solid",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <AtomSwitch.Root
        {...props}
        className={mergeClassName("brick-switch", className)}
        data-size={size}
        data-slot={dataSlot ?? "switch"}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);

export const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>(
  function SwitchThumb({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomSwitch.Thumb
        {...props}
        className={mergeClassName("brick-switch-thumb", className)}
        data-slot={dataSlot ?? "switch-thumb"}
        ref={ref}
      />
    );
  },
);

SwitchRoot.displayName = "Switch.Root";
SwitchThumb.displayName = "Switch.Thumb";

export const Switch = Object.freeze({ Root: SwitchRoot, Thumb: SwitchThumb });
