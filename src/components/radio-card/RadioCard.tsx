"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import {
  RadioGroup as AtomRadioGroup,
  type RadioGroupRootProps as AtomRadioGroupRootProps,
  type RadioRootProps as AtomRadioRootProps,
} from "@flowstack-ui/atom/radio-group";

export type RadioCardSize = "sm" | "md" | "lg";
export type RadioCardVariant = "outline" | "surface" | "subtle" | "solid";
export type RadioCardAlign = "start" | "center" | "end";
export type RadioCardJustify = "start" | "center" | "end";

export interface RadioCardRootProps extends AtomRadioGroupRootProps {
  size?: RadioCardSize;
  variant?: RadioCardVariant;
  align?: RadioCardAlign;
  justify?: RadioCardJustify;
}

export type RadioCardItemProps = AtomRadioRootProps;

export interface RadioCardPartProps extends HTMLAttributes<HTMLSpanElement> {
  "data-slot"?: string;
}

export interface RadioCardIndicatorProps extends RadioCardPartProps {
  children?: ReactNode;
}

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const RadioCardRoot = forwardRef<HTMLDivElement, RadioCardRootProps>(
  function RadioCardRoot(
    {
      align = "start",
      className,
      justify = "start",
      orientation = "horizontal",
      size = "md",
      variant = "outline",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <AtomRadioGroup.Root
        {...props}
        className={mergeClassName("brick-radio-card", className)}
        data-align={align}
        data-justify={justify}
        data-size={size}
        data-slot={dataSlot ?? "radio-card"}
        data-variant={variant}
        orientation={orientation}
        ref={ref}
      />
    );
  },
);

export const RadioCardItem = forwardRef<HTMLButtonElement, RadioCardItemProps>(
  function RadioCardItem({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomRadioGroup.Radio
        {...props}
        className={mergeClassName("brick-radio-card__item", className)}
        data-slot={dataSlot ?? "radio-card-item"}
        ref={ref}
      />
    );
  },
);

function createPart(displayName: string, className: string, defaultSlot: string) {
  const Part = forwardRef<HTMLSpanElement, RadioCardPartProps>(function Part(
    { className: customClassName, "data-slot": dataSlot, ...props },
    ref,
  ) {
    return <span {...props} className={mergeClassName(className, customClassName)} data-slot={dataSlot ?? defaultSlot} ref={ref} />;
  });
  Part.displayName = displayName;
  return Part;
}

export const RadioCardControl = createPart("RadioCard.Control", "brick-radio-card__control", "radio-card-control");
export const RadioCardContent = createPart("RadioCard.Content", "brick-radio-card__content", "radio-card-content");
export const RadioCardTitle = createPart("RadioCard.Title", "brick-radio-card__title", "radio-card-title");
export const RadioCardDescription = createPart("RadioCard.Description", "brick-radio-card__description", "radio-card-description");
export const RadioCardAddon = createPart("RadioCard.Addon", "brick-radio-card__addon", "radio-card-addon");

export const RadioCardIndicator = forwardRef<HTMLSpanElement, RadioCardIndicatorProps>(function RadioCardIndicator(
  { children, className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <span {...props} aria-hidden="true" className={mergeClassName("brick-radio-card__indicator", className)} data-custom={children !== undefined ? "" : undefined} data-slot={dataSlot ?? "radio-card-indicator"} ref={ref}>
      {children ?? <span className="brick-radio-card__indicator-dot" />}
    </span>
  );
});

RadioCardRoot.displayName = "RadioCard.Root";
RadioCardItem.displayName = "RadioCard.Item";
RadioCardIndicator.displayName = "RadioCard.Indicator";

export const RadioCard = Object.freeze({
  Root: RadioCardRoot,
  Item: RadioCardItem,
  Control: RadioCardControl,
  Content: RadioCardContent,
  Title: RadioCardTitle,
  Description: RadioCardDescription,
  Indicator: RadioCardIndicator,
  Addon: RadioCardAddon,
});
