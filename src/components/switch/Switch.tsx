"use client";

import { forwardRef } from "react";
import {
  Switch as AtomSwitch,
  type SwitchControlProps as AtomSwitchControlProps,
  type SwitchFieldProps as AtomSwitchFieldProps,
  type SwitchHiddenInputProps as AtomSwitchHiddenInputProps,
  type SwitchIndicatorProps as AtomSwitchIndicatorProps,
  type SwitchLabelProps as AtomSwitchLabelProps,
  type SwitchRootProps as AtomSwitchRootProps,
  type SwitchRootProviderProps as AtomSwitchRootProviderProps,
  type SwitchThumbIndicatorProps as AtomSwitchThumbIndicatorProps,
  type SwitchThumbProps as AtomSwitchThumbProps,
} from "@flowstack-ui/atom/switch";
import {
  SwitchPresentationContext,
  switchPresentationAttributes,
  useSwitchPresentation,
  type SwitchPresentationProps,
} from "./SwitchPresentation.js";

export { useSwitch, useSwitchContext } from "@flowstack-ui/atom/switch";
export type {
  SwitchController,
  UseSwitchProps,
} from "@flowstack-ui/atom/switch";
export type {
  SwitchPresentationProps,
  SwitchLabelPlacement,
  SwitchSize,
  SwitchTone,
  SwitchVariant,
} from "./SwitchPresentation.js";

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

type LegacyPresentationProps = Omit<SwitchPresentationProps, "labelPlacement">;
export interface SwitchRootProps
  extends AtomSwitchRootProps,
    LegacyPresentationProps {}
export type SwitchThumbProps = AtomSwitchThumbProps;
export interface SwitchFieldProps
  extends AtomSwitchFieldProps,
    SwitchPresentationProps {}
export interface SwitchRootProviderProps
  extends AtomSwitchRootProviderProps,
    SwitchPresentationProps {}
export interface SwitchControlProps
  extends AtomSwitchControlProps,
    LegacyPresentationProps {}
export type SwitchLabelProps = AtomSwitchLabelProps;
export type SwitchHiddenInputProps = AtomSwitchHiddenInputProps;
export type SwitchIndicatorProps = AtomSwitchIndicatorProps;
export type SwitchThumbIndicatorProps = AtomSwitchThumbIndicatorProps;

export const SwitchRoot = forwardRef<HTMLButtonElement, SwitchRootProps>(
  function SwitchRoot(
    { className, size, variant, tone, style, "data-slot": slot, ...props },
    ref,
  ) {
    const presentation = useSwitchPresentation({ size, variant, tone });
    return (
      <AtomSwitch.Root
        {...props}
        className={mergeClassName("brick-switch", className)}
        {...switchPresentationAttributes(presentation, style)}
        data-slot={slot ?? "switch"}
        ref={ref}
      />
    );
  },
);

export const SwitchField = forwardRef<HTMLDivElement, SwitchFieldProps>(
  function SwitchField(
    {
      className,
      size,
      variant,
      tone,
      labelPlacement,
      style,
      "data-slot": slot,
      ...props
    },
    ref,
  ) {
    const presentation = useSwitchPresentation({ size, variant, tone, labelPlacement });
    return (
      <SwitchPresentationContext.Provider value={presentation}>
        <AtomSwitch.Field
          {...props}
          className={mergeClassName("brick-switch-field", className)}
          {...switchPresentationAttributes(presentation, style)}
          data-slot={slot ?? "switch-field"}
          ref={ref}
        />
      </SwitchPresentationContext.Provider>
    );
  },
);

export const SwitchRootProvider = forwardRef<HTMLDivElement, SwitchRootProviderProps>(
  function SwitchRootProvider(
    {
      className,
      size,
      variant,
      tone,
      labelPlacement,
      style,
      "data-slot": slot,
      ...props
    },
    ref,
  ) {
    const presentation = useSwitchPresentation({ size, variant, tone, labelPlacement });
    return (
      <SwitchPresentationContext.Provider value={presentation}>
        <AtomSwitch.RootProvider
          {...props}
          className={mergeClassName("brick-switch-field", className)}
          {...switchPresentationAttributes(presentation, style)}
          data-slot={slot ?? "switch-root-provider"}
          ref={ref}
        />
      </SwitchPresentationContext.Provider>
    );
  },
);

export const SwitchControl = forwardRef<HTMLButtonElement, SwitchControlProps>(
  function SwitchControl(
    { children, className, size, variant, tone, style, "data-slot": slot, ...props },
    ref,
  ) {
    const presentation = useSwitchPresentation({ size, variant, tone });
    return (
      <AtomSwitch.Control
        {...props}
        className={mergeClassName("brick-switch brick-switch-control", className)}
        {...switchPresentationAttributes(presentation, style)}
        data-slot={slot ?? "switch-control"}
        ref={ref}
      >
        {children === undefined ? <SwitchThumb /> : children}
      </AtomSwitch.Control>
    );
  },
);

export const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>(
  function SwitchThumb({ className, "data-slot": slot, ...props }, ref) {
    return (
      <AtomSwitch.Thumb
        {...props}
        className={mergeClassName("brick-switch-thumb", className)}
        data-slot={slot ?? "switch-thumb"}
        ref={ref}
      />
    );
  },
);

export const SwitchLabel = forwardRef<HTMLLabelElement, SwitchLabelProps>(
  function SwitchLabel({ className, "data-slot": slot, ...props }, ref) {
    return (
      <AtomSwitch.Label
        {...props}
        className={mergeClassName("brick-switch-label", className)}
        data-slot={slot ?? "switch-label"}
        ref={ref}
      />
    );
  },
);

export const SwitchHiddenInput = forwardRef<HTMLInputElement, SwitchHiddenInputProps>(
  function SwitchHiddenInput({ className, "data-slot": slot, ...props }, ref) {
    return <AtomSwitch.HiddenInput {...props} className={mergeClassName("brick-switch-input", className)} data-slot={slot ?? "switch-input"} ref={ref} />;
  },
);

export const SwitchIndicator = forwardRef<HTMLSpanElement, SwitchIndicatorProps>(
  function SwitchIndicator({ className, "data-slot": slot, ...props }, ref) {
    return (
      <AtomSwitch.Indicator
        {...props}
        className={mergeClassName("brick-switch-indicator", className)}
        data-slot={slot ?? "switch-indicator"}
        ref={ref}
      />
    );
  },
);

export const SwitchThumbIndicator = forwardRef<
  HTMLSpanElement,
  SwitchThumbIndicatorProps
>(function SwitchThumbIndicator({ className, "data-slot": slot, ...props }, ref) {
  return (
    <AtomSwitch.ThumbIndicator
      {...props}
      className={mergeClassName("brick-switch-thumb-indicator", className)}
      data-slot={slot ?? "switch-thumb-indicator"}
      ref={ref}
    />
  );
});

SwitchRoot.displayName = "Switch.Root";
SwitchField.displayName = "Switch.Field";
SwitchRootProvider.displayName = "Switch.RootProvider";
SwitchControl.displayName = "Switch.Control";
SwitchThumb.displayName = "Switch.Thumb";
SwitchLabel.displayName = "Switch.Label";
SwitchHiddenInput.displayName = "Switch.HiddenInput";
SwitchIndicator.displayName = "Switch.Indicator";
SwitchThumbIndicator.displayName = "Switch.ThumbIndicator";

export const Switch = Object.freeze({
  Root: SwitchRoot,
  Field: SwitchField,
  RootProvider: SwitchRootProvider,
  Control: SwitchControl,
  Thumb: SwitchThumb,
  Label: SwitchLabel,
  HiddenInput: SwitchHiddenInput,
  Indicator: SwitchIndicator,
  ThumbIndicator: SwitchThumbIndicator,
});
