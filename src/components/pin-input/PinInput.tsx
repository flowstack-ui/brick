"use client";
import { radiusStyle, type RadiusShapeProps } from "../_radius/Radius.js";
import { fieldVariantAttributes, type FieldVariant, type ResponsiveFieldVariant } from "../_field-variant/FieldVariant.js";
import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  PinInput as AtomPinInput,
  type PinInputInputProps as AtomInputProps,
  type PinInputRootProps as AtomRootProps,
  type PinInputSeparatorProps as AtomSeparatorProps,
  type PinInputRootProviderProps as AtomRootProviderProps,
  type PinInputLabelProps as AtomLabelProps,
  type PinInputControlProps as AtomControlProps,
} from "@flowstack-ui/atom/pin-input";
export { usePinInput, usePinInputContext } from "@flowstack-ui/atom/pin-input";
export type {
  PinInputController,
  PinInputOptions,
  PinInputValueChangeDetails,
  PinInputInvalidDetails,
  PinInputContextProps,
  PinInputType,
} from "@flowstack-ui/atom/pin-input";
import {
  controlSizeDataAttributes,
  type ControlSize,
  type ResponsiveControlSize,
} from "../_control-size/ControlSize.js";
export type PinInputVariant = FieldVariant;
export type ResponsivePinInputVariant = ResponsiveFieldVariant;
export type PinInputTone = "neutral" | "accent";
export type PinInputSize = ControlSize;
export type PinInputShape = "sharp" | "rounded";
export type PinInputLayout = "separated" | "attached";
const VisualContext = createContext({
  layout: "separated" as PinInputLayout,
  shape: "rounded" as PinInputShape | undefined,
  size: "lg" as ResponsiveControlSize,
  variant: "outline" as ResponsivePinInputVariant,
});
const cn = (a: string, b?: string) => (b ? `${a} ${b}` : a);
type Shared = AtomRootProps & {
  tone?: PinInputTone;
  layout?: PinInputLayout;
  size?: ResponsiveControlSize;
};
export type PinInputRootProps = Shared &
  (
    | ({ variant?: Exclude<PinInputVariant, "underline"> } & RadiusShapeProps<PinInputShape>)
    | { variant: "underline"; shape?: never; radius?: never }
    | { variant: ResponsivePinInputVariant; shape?: never; radius?: never }
  );
export type PinInputGroupProps = HTMLAttributes<HTMLDivElement> & {
  "data-slot"?: string;
};
export type PinInputInputProps = AtomInputProps;
export type PinInputSeparatorProps = Omit<AtomSeparatorProps, "children"> & {
  children?: ReactNode;
};
export const PinInputRoot = forwardRef<HTMLDivElement, PinInputRootProps>(
  function PinInputRoot(
    {
      children,
      className,
      layout = "separated",
      shape = "rounded",
      radius,
      style,
      size = "lg",
      variant = "outline",
      tone = "accent",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const visual = {
      layout,
      shape: variant === "underline" ? undefined : radius === undefined ? shape : "rounded" as const,
      size,
      variant,
    };
    return (
      <VisualContext.Provider value={visual}>
        <AtomPinInput.Root
          {...props}
          className={cn("brick-pin-input brick-control-size", className)}
          data-layout={layout}
          data-shape={visual.shape}
          style={radiusStyle(variant === "underline" ? undefined : radius, "--brick-pin-input-radius", style)}
          data-slot={dataSlot ?? "pin-input"}
          {...fieldVariantAttributes(variant)}
          data-tone={tone}
          ref={ref}
          {...controlSizeDataAttributes(size)}
        >
          {children}
        </AtomPinInput.Root>
      </VisualContext.Provider>
    );
  },
);
export const PinInputGroup = forwardRef<HTMLDivElement, PinInputGroupProps>(
  function PinInputGroup({ className, "data-slot": dataSlot, ...props }, ref) {
    const v = useContext(VisualContext);
    return (
      <div
        {...props}
        className={cn("brick-pin-input-group", className)}
        data-layout={v.layout}
        data-slot={dataSlot ?? "pin-input-group"}
        ref={ref}
      />
    );
  },
);
export const PinInputInput = forwardRef<HTMLInputElement, PinInputInputProps>(
  function PinInputInput({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomPinInput.Input
        {...props}
        className={cn("brick-pin-input-input", className)}
        data-slot={dataSlot ?? "pin-input-input"}
        ref={ref}
      />
    );
  },
);
export const PinInputSeparator = forwardRef<
  HTMLSpanElement,
  PinInputSeparatorProps
>(function PinInputSeparator(
  { children = "–", className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomPinInput.Separator
      {...props}
      className={cn("brick-pin-input-separator", className)}
      data-slot={dataSlot ?? "pin-input-separator"}
      ref={ref}
    >
      {children}
    </AtomPinInput.Separator>
  );
});
export type PinInputRootProviderProps = AtomRootProviderProps & {
  tone?: PinInputTone;
  layout?: PinInputLayout;
  size?: ResponsiveControlSize;
} & (
    | ({ variant?: Exclude<PinInputVariant, "underline"> } & RadiusShapeProps<PinInputShape>)
    | { variant: "underline"; shape?: never; radius?: never }
    | { variant: ResponsivePinInputVariant; shape?: never; radius?: never }
  );
export const PinInputRootProvider = forwardRef<
  HTMLDivElement,
  PinInputRootProviderProps
>(function PinInputRootProvider(
  {
    children,
    className,
    layout = "separated",
    shape = "rounded",
    radius,
    style,
    size = "lg",
    variant = "outline",
    tone = "accent",
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  const visual = {
    layout,
    shape: variant === "underline" ? undefined : radius === undefined ? shape : "rounded" as const,
    size,
    variant,
  };
  return (
    <VisualContext.Provider value={visual}>
      <AtomPinInput.RootProvider
        {...props}
        className={cn("brick-pin-input brick-control-size", className)}
        data-layout={layout}
        data-shape={visual.shape}
        style={radiusStyle(variant === "underline" ? undefined : radius, "--brick-pin-input-radius", style)}
        data-slot={dataSlot ?? "pin-input"}
        {...fieldVariantAttributes(variant)}
        data-tone={tone}
        ref={ref}
        {...controlSizeDataAttributes(size)}
      >
        {children}
      </AtomPinInput.RootProvider>
    </VisualContext.Provider>
  );
});
export const PinInputContext = AtomPinInput.Context;
export type PinInputLabelProps = AtomLabelProps;
export const PinInputLabel = forwardRef<HTMLLabelElement, PinInputLabelProps>(
  function PinInputLabel({ className, ...props }, ref) {
    return (
      <AtomPinInput.Label
        {...props}
        className={cn("brick-pin-input-label", className)}
        ref={ref}
      />
    );
  },
);
export type PinInputControlProps = AtomControlProps;
export const PinInputControl = forwardRef<HTMLDivElement, PinInputControlProps>(
  function PinInputControl({ className, ...props }, ref) {
    const visual = useContext(VisualContext);
    return (
      <AtomPinInput.Control
        {...props}
        className={cn("brick-pin-input-control", className)}
        data-layout={visual.layout}
        ref={ref}
      />
    );
  },
);
export const PinInput = {
  Root: PinInputRoot,
  RootProvider: PinInputRootProvider,
  Context: PinInputContext,
  Label: PinInputLabel,
  Control: PinInputControl,
  Group: PinInputGroup,
  Input: PinInputInput,
  Separator: PinInputSeparator,
} as const;
