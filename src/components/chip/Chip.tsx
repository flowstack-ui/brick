import { forwardRef } from "react";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import { radiusStyle, type RadiusShapeProps } from "../_radius/Radius.js";
import {
  BadgeRoot as AtomBadgeRoot,
  type BadgeRootProps as AtomBadgeRootProps,
} from "@flowstack-ui/atom/badge";
import {
  ButtonRoot as AtomButtonRoot,
  type ButtonRootProps as AtomButtonRootProps,
} from "@flowstack-ui/atom/button";

export type ChipVariant = "soft" | "subtle" | "outline" | "surface" | "solid";
export type ChipTone =
  | "neutral"
  | "contrast"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";
export type ChipSize = "sm" | "md" | "lg" | "xl";
export type ChipDensity = "comfortable" | "compact";
export type ChipShape = "rounded" | "pill";

export type ChipRootProps = Omit<AtomBadgeRootProps, "color"> &
  RadiusShapeProps<ChipShape> & {
    variant?: ResponsiveValue<ChipVariant>;
    tone?: ChipTone;
    size?: ResponsiveValue<ChipSize>;
    density?: ResponsiveValue<ChipDensity>;
    unstyled?: boolean;
  };

export type ChipLabelProps = Omit<AtomBadgeRootProps, "color"> & {
  unstyled?: boolean;
};
export type ChipStartElementProps = ChipLabelProps;
export type ChipEndElementProps = ChipLabelProps;
export type ChipActionTriggerProps = Omit<
  AtomButtonRootProps,
  "href" | "loading"
> & { unstyled?: boolean };

export type ChipRemoveTriggerProps = Omit<
  AtomButtonRootProps,
  "aria-label" | "href" | "loading"
> & {
  ariaLabel: string;
  unstyled?: boolean;
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
      unstyled = false,
      ...props
    },
    ref,
  ) {
    return (
      <AtomBadgeRoot
        {...props}
        className={classes("brick-chip", className)}
        {...responsiveDataAttributes("data-density", density, {
          defaultValue: "comfortable",
          alwaysInitial: true,
        })}
        data-unstyled={unstyled ? "" : undefined}
        data-shape={radius === undefined ? shape : "rounded"}
        style={radiusStyle(radius, "--brick-chip-radius", style)}
        {...responsiveDataAttributes("data-size", size, {
          defaultValue: "md",
          alwaysInitial: true,
        })}
        data-tone={tone}
        {...responsiveDataAttributes("data-variant", variant, {
          defaultValue: "soft",
          alwaysInitial: true,
        })}
        ref={ref}
      />
    );
  },
);

export const ChipLabel = forwardRef<HTMLSpanElement, ChipLabelProps>(
  function ChipLabel(
    { className, unstyled, "data-slot": slot = "chip-label", ...props },
    ref,
  ) {
    return (
      <AtomBadgeRoot
        {...props}
        className={classes("brick-chip__label", className)}
        data-slot={slot}
        data-unstyled={unstyled ? "" : undefined}
        ref={ref}
      />
    );
  },
);

export const ChipRemoveTrigger = forwardRef<
  HTMLElement,
  ChipRemoveTriggerProps
>(function ChipRemoveTrigger(
  {
    ariaLabel,
    children,
    className,
    disabled,
    unstyled,
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
      data-unstyled={unstyled ? "" : undefined}
      data-slot={dataSlot}
      disabled={disabled}
      ref={ref}
    >
      {children ?? <DefaultRemoveIcon />}
    </AtomButtonRoot>
  );
});

ChipRoot.displayName = "Chip.Root";
ChipLabel.displayName = "Chip.Label";
ChipRemoveTrigger.displayName = "Chip.RemoveTrigger";

export const ChipStartElement = forwardRef<
  HTMLSpanElement,
  ChipStartElementProps
>(function ChipStartElement(
  { className, unstyled, "data-slot": slot = "chip-start-element", ...props },
  ref,
) {
  return (
    <AtomBadgeRoot
      {...props}
      className={classes("brick-chip__start-element", className)}
      data-slot={slot}
      data-unstyled={unstyled ? "" : undefined}
      ref={ref}
    />
  );
});

export const ChipEndElement = forwardRef<HTMLSpanElement, ChipEndElementProps>(
  function ChipEndElement(
    { className, unstyled, "data-slot": slot = "chip-end-element", ...props },
    ref,
  ) {
    return (
      <AtomBadgeRoot
        {...props}
        className={classes("brick-chip__end-element", className)}
        data-slot={slot}
        data-unstyled={unstyled ? "" : undefined}
        ref={ref}
      />
    );
  },
);

/** Keep removal beside this action, never inside its button host. */
export const ChipActionTrigger = forwardRef<
  HTMLElement,
  ChipActionTriggerProps
>(function ChipActionTrigger(
  { className, unstyled, "data-slot": slot = "chip-action-trigger", ...props },
  ref,
) {
  return (
    <AtomButtonRoot
      {...props}
      className={classes("brick-chip__action-trigger", className)}
      data-slot={slot}
      data-unstyled={unstyled ? "" : undefined}
      ref={ref}
    />
  );
});

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
