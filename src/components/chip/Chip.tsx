import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import {
  BadgeRoot as AtomBadgeRoot,
  type BadgeRootProps as AtomBadgeRootProps,
} from "@flowstack-ui/atom/badge";
import {
  ButtonRoot as AtomButtonRoot,
  type ButtonRootProps as AtomButtonRootProps,
} from "@flowstack-ui/atom/button";

export type ChipVariant = "soft" | "outline";
export type ChipTone = "neutral" | "accent";
export type ChipSize = "sm" | "md" | "lg";
export type ChipShape = "rounded" | "pill";

export type ChipRootProps = Omit<AtomBadgeRootProps, "color"> & {
  variant?: ChipVariant;
  tone?: ChipTone;
  size?: ChipSize;
  shape?: ChipShape;
};

export type ChipLabelProps = ComponentPropsWithoutRef<"span">;

export type ChipRemoveTriggerProps = Omit<
  AtomButtonRootProps,
  "aria-label" | "href" | "loading"
> & {
  ariaLabel: string;
};

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

function DefaultRemoveIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="m4 4 8 8M12 4l-8 8" />
    </svg>
  );
}

export const ChipRoot = forwardRef<HTMLSpanElement, ChipRootProps>(
  function ChipRoot(
    {
      className,
      shape = "pill",
      size = "md",
      tone = "neutral",
      variant = "soft",
      ...props
    },
    ref,
  ) {
    return (
      <AtomBadgeRoot
        {...props}
        className={classes("brick-chip", className)}
        data-shape={shape}
        data-size={size}
        data-tone={tone}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);

export const ChipLabel = forwardRef<HTMLSpanElement, ChipLabelProps>(
  function ChipLabel({ className, ...props }, ref) {
    return (
      <span
        {...props}
        className={classes("brick-chip__label", className)}
        data-slot="chip-label"
        ref={ref}
      />
    );
  },
);

export const ChipRemoveTrigger = forwardRef<HTMLElement, ChipRemoveTriggerProps>(
  function ChipRemoveTrigger(
    {
      ariaLabel,
      children,
      className,
      disabled,
      "data-slot": dataSlot = "chip-remove-trigger",
      ...props
    },
    ref,
  ) {
    return (
      <AtomButtonRoot
        {...props}
        aria-label={ariaLabel}
        className={classes("brick-chip__remove-trigger", className)}
        data-disabled={disabled ? "" : undefined}
        data-slot={dataSlot}
        disabled={disabled}
        ref={ref}
      >
        {children ?? <DefaultRemoveIcon />}
      </AtomButtonRoot>
    );
  },
);

ChipRoot.displayName = "Chip.Root";
ChipLabel.displayName = "Chip.Label";
ChipRemoveTrigger.displayName = "Chip.RemoveTrigger";

export const Chip = {
  Root: ChipRoot,
  Label: ChipLabel,
  RemoveTrigger: ChipRemoveTrigger,
} as const;
