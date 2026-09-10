import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { radiusStyle, type RadiusShapeProps } from "../_radius/Radius.js";
import {
  BadgeRoot as AtomBadgeRoot,
  type BadgeRootProps as AtomBadgeRootProps,
} from "@flowstack-ui/atom/badge";
import {
  ButtonRoot as AtomButtonRoot,
  type ButtonRootProps as AtomButtonRootProps,
} from "@flowstack-ui/atom/button";

export type ChipVariant = "soft" | "outline" | "surface" | "solid";
export type ChipTone = "neutral" | "accent" | "info" | "success" | "warning" | "danger";
export type ChipSize = "sm" | "md" | "lg" | "xl";
export type ChipDensity = "comfortable" | "compact";
export type ChipShape = "rounded" | "pill";

export type ChipRootProps = Omit<AtomBadgeRootProps, "color"> & RadiusShapeProps<ChipShape> & {
  variant?: ChipVariant;
  tone?: ChipTone;
  size?: ChipSize;
  density?: ChipDensity;
};

export type ChipLabelProps = ComponentPropsWithoutRef<"span">;
export type ChipStartElementProps = ComponentPropsWithoutRef<"span"> & { "data-slot"?: string };
export type ChipEndElementProps = ComponentPropsWithoutRef<"span"> & { "data-slot"?: string };
export type ChipActionTriggerProps = Omit<AtomButtonRootProps, "href" | "loading">;

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
      density = "comfortable",
      shape = "pill",
      radius,
      style,
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
        data-density={density}
        data-shape={radius === undefined ? shape : "rounded"}
        style={radiusStyle(radius, "--brick-chip-radius", style)}
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

export const ChipStartElement = forwardRef<HTMLSpanElement, ChipStartElementProps>(
  function ChipStartElement({ className, "data-slot": slot = "chip-start-element", ...props }, ref) {
    return <span {...props} className={classes("brick-chip__start-element", className)} data-slot={slot} ref={ref} />;
  },
);

export const ChipEndElement = forwardRef<HTMLSpanElement, ChipEndElementProps>(
  function ChipEndElement({ className, "data-slot": slot = "chip-end-element", ...props }, ref) {
    return <span {...props} className={classes("brick-chip__end-element", className)} data-slot={slot} ref={ref} />;
  },
);

/** Keep removal beside this action, never inside its button host. */
export const ChipActionTrigger = forwardRef<HTMLElement, ChipActionTriggerProps>(
  function ChipActionTrigger({ className, "data-slot": slot = "chip-action-trigger", ...props }, ref) {
    return <AtomButtonRoot {...props} className={classes("brick-chip__action-trigger", className)} data-slot={slot} ref={ref} />;
  },
);

ChipStartElement.displayName = "Chip.StartElement";
ChipEndElement.displayName = "Chip.EndElement";
ChipActionTrigger.displayName = "Chip.ActionTrigger";

export const Chip = {
  Root: ChipRoot,
  Label: ChipLabel,
  RemoveTrigger: ChipRemoveTrigger,
  StartElement: ChipStartElement,
  EndElement: ChipEndElement,
  ActionTrigger: ChipActionTrigger,
} as const;
