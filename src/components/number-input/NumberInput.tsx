"use client";
import { fieldVariantAttributes, type FieldVariant, type ResponsiveFieldVariant } from "../_field-variant/FieldVariant.js";

import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type ReactNode,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import {
  NumberInput as AtomNumberInput,
  useNumberInput as useAtomNumberInput,
  type UseNumberInputOptions,
  type NumberInputRootProviderProps as AtomProviderProps,
  type NumberInputLabelProps,
  type NumberInputValueTextProps,
  type NumberInputScrubberProps,
  type NumberInputDecrementProps as AtomDecrementProps,
  type NumberInputIncrementProps as AtomIncrementProps,
  type NumberInputInputProps as AtomInputProps,
  type NumberInputRootProps as AtomRootProps,
} from "@flowstack-ui/atom/number-input";
export type {
  UseNumberInputOptions,
  NumberInputLabelProps,
  NumberInputValueTextProps,
  NumberInputScrubberProps,
  NumberInputContextProps,
  NumberInputContextValue,
  NumberInputValueChangeDetails,
  NumberInputFocusChangeDetails,
  NumberInputValueInvalidDetails,
  NumberInputIds,
  NumberInputTranslations,
} from "@flowstack-ui/atom/number-input";
import {
  controlSizeDataAttributes,
  type ControlSize,
  type ResponsiveControlSize,
} from "../_control-size/ControlSize.js";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";

export type NumberInputVariant = "outline" | "surface" | "soft" | "subtle" | "ghost" | "plain" | "underline";
export type NumberInputSize = ControlSize;
export type NumberInputShape = "sharp" | "rounded" | "pill";
export type NumberInputStepperVisibility = "always" | "hover";
export type NumberInputLayout = "field" | "stepper";
type Visual = {
  fullWidth: boolean;
  layout: NumberInputLayout;
  shape?: NumberInputShape;
  size: ResponsiveControlSize;
  variant: ResponsiveFieldVariant;
  stepperVisibility?: NumberInputStepperVisibility;
};
const VisualContext = createContext<Visual>({
  fullWidth: true,
  layout: "field",
  shape: "rounded",
  size: "lg",
  variant: "outline",
});
const cn = (base: string, value?: string) =>
  value ? `${base} ${value}` : base;

type SharedRootProps = AtomRootProps & {
  fullWidth?: boolean;
  size?: ResponsiveControlSize;
  /** Show step actions persistently or reveal them on hover/focus for fine pointers. @default "always" */
  stepperVisibility?: NumberInputStepperVisibility;
  /** Arrange compact end controls or square controls around the value. @default "field" */
  layout?: NumberInputLayout;
};
import { radiusStyle, type RadiusShapeProps } from "../_radius/Radius.js";
type NumberInputRecipeProps =
  | ({
      variant?: Exclude<NumberInputVariant, "underline">;
    } & RadiusShapeProps<NumberInputShape>)
  | { variant: ResponsiveFieldVariant; shape?: never; radius?: never }
  | { variant: ResponsiveFieldVariant; shape?: never; radius?: never };
export type NumberInputRootProps = SharedRootProps & NumberInputRecipeProps;
export type NumberInputInputProps = AtomInputProps;
export type NumberInputIncrementProps = Omit<AtomIncrementProps, "children"> & {
  children?: ReactNode;
};
export type NumberInputDecrementProps = Omit<AtomDecrementProps, "children"> & {
  children?: ReactNode;
};
export interface NumberInputUnitProps extends HTMLAttributes<HTMLSpanElement> {
  "data-slot"?: string;
}
export interface NumberInputControlProps
  extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  /** Accessible name for the generated increment action. @default "Increment value" */
  incrementLabel?: string;
  /** Accessible name for the generated decrement action. @default "Decrement value" */
  decrementLabel?: string;
  "data-slot"?: string;
}

function StepArtwork({
  direction,
  layout,
}: {
  direction: "up" | "down";
  layout: NumberInputLayout;
}) {
  const path =
    layout === "stepper"
      ? direction === "up"
        ? "M3 8h10M8 3v10"
        : "M3 8h10"
      : direction === "up"
        ? "m4 10 4-4 4 4"
        : "m4 6 4 4 4-4";
  return (
    <svg
      aria-hidden="true"
      className="brick-number-input-step-artwork"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path d={path} />
    </svg>
  );
}

export const NumberInputRoot = forwardRef<HTMLDivElement, NumberInputRootProps>(
  function NumberInputRoot(
    {
      children,
      className,
      fullWidth = true,
      layout = "field",
      shape = "rounded",
      radius,
      style,
      size = "lg",
      stepperVisibility = "always",
      variant = "outline",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const { locale, dir, localeText } = useLocaleContext();
    const visual = {
      fullWidth,
      layout,
      shape:
        variant === "underline"
          ? undefined
          : radius === undefined
            ? shape
            : ("rounded" as const),
      size,
      variant,
      stepperVisibility,
    };
    return (
      <VisualContext.Provider value={visual}>
        <AtomNumberInput.Root
          {...props}
          locale={props.locale ?? locale}
          dir={props.dir ?? dir}
          translations={{
            incrementLabel: localeText.incrementValue,
            decrementLabel: localeText.decrementValue,
            ...props.translations,
          }}
          className={cn("brick-number-input brick-control-size", className)}
          data-full-width={fullWidth ? "" : undefined}
          data-layout={layout}
          data-shape={visual.shape}
          style={radiusStyle(
            variant === "underline" ? undefined : radius,
            "--brick-number-input-radius",
            style,
          )}
          data-slot={dataSlot ?? "number-input"}
          data-stepper-visibility={stepperVisibility}
          {...fieldVariantAttributes(variant)}
          ref={ref}
          {...controlSizeDataAttributes(size)}
        >
          {children}
        </AtomNumberInput.Root>
      </VisualContext.Provider>
    );
  },
);
export const NumberInputInput = forwardRef<
  HTMLInputElement,
  NumberInputInputProps
>(function NumberInputInput(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  useContext(VisualContext);
  return (
    <AtomNumberInput.Input
      {...props}
      className={cn("brick-number-input-control", className)}
      data-slot={dataSlot ?? "number-input-control"}
      ref={ref}
    />
  );
});
export const NumberInputIncrement = forwardRef<
  HTMLButtonElement,
  NumberInputIncrementProps
>(function NumberInputIncrement(
  { children, className, "data-slot": dataSlot, ...props },
  ref,
) {
  const { layout } = useContext(VisualContext);
  return (
    <AtomNumberInput.Increment
      {...props}
      className={cn(
        "brick-number-input-step brick-number-input-increment",
        className,
      )}
      data-slot={dataSlot ?? "number-input-increment"}
      ref={ref}
    >
      {children ?? <StepArtwork direction="up" layout={layout} />}
    </AtomNumberInput.Increment>
  );
});
export const NumberInputDecrement = forwardRef<
  HTMLButtonElement,
  NumberInputDecrementProps
>(function NumberInputDecrement(
  { children, className, "data-slot": dataSlot, ...props },
  ref,
) {
  const { layout } = useContext(VisualContext);
  return (
    <AtomNumberInput.Decrement
      {...props}
      className={cn(
        "brick-number-input-step brick-number-input-decrement",
        className,
      )}
      data-slot={dataSlot ?? "number-input-decrement"}
      ref={ref}
    >
      {children ?? <StepArtwork direction="down" layout={layout} />}
    </AtomNumberInput.Decrement>
  );
});
export const NumberInputUnit = forwardRef<
  HTMLSpanElement,
  NumberInputUnitProps
>(function NumberInputUnit(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <span
      {...props}
      className={cn("brick-number-input-unit", className)}
      data-slot={dataSlot ?? "number-input-unit"}
      ref={ref}
    />
  );
});
export interface NumberInputGroupProps extends HTMLAttributes<HTMLDivElement> {
  "data-slot"?: string;
}
/** Visual field boundary; state and semantics stay with the surrounding Atom root. */
export const NumberInputGroup = forwardRef<
  HTMLDivElement,
  NumberInputGroupProps
>(function NumberInputGroup({ className, "data-slot": slot, ...props }, ref) {
  const visual = useContext(VisualContext);
  return (
    <AtomNumberInput.Context>
      {(context) => (
        <div
          {...props}
          ref={ref}
          className={cn(
            "brick-number-input brick-number-input-group",
            className,
          )}
          data-slot={slot ?? "number-input-group"}
          data-layout={visual.layout}
          {...fieldVariantAttributes(visual.variant)}
          data-shape={visual.shape}
          data-stepper-visibility={visual.stepperVisibility}
          data-invalid={context.invalid ? "" : undefined}
        />
      )}
    </AtomNumberInput.Context>
  );
});
export interface NumberInputElementProps
  extends HTMLAttributes<HTMLDivElement> {
  placement?: "start" | "end";
  "data-slot"?: string;
}
export const NumberInputElement = forwardRef<
  HTMLDivElement,
  NumberInputElementProps
>(function NumberInputElement(
  { placement = "start", className, "data-slot": slot, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn("brick-number-input-element", className)}
      data-placement={placement}
      data-slot={slot ?? "number-input-element"}
    />
  );
});
export const NumberInputControl = forwardRef<
  HTMLSpanElement,
  NumberInputControlProps
>(function NumberInputControl(
  {
    children,
    className,
    decrementLabel,
    incrementLabel,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <span
      {...props}
      className={cn("brick-number-input-stepper", className)}
      data-slot={dataSlot ?? "number-input-stepper"}
      ref={ref}
    >
      {children === undefined ? (
        <>
          <NumberInputIncrement aria-label={incrementLabel} />
          <NumberInputDecrement aria-label={decrementLabel} />
        </>
      ) : (
        children
      )}
    </span>
  );
});

export function useNumberInput(options: UseNumberInputOptions = {}) {
  const { locale, dir, localeText } = useLocaleContext();
  return useAtomNumberInput({
    ...options,
    locale: options.locale ?? locale,
    dir: options.dir ?? dir,
    translations: {
      incrementLabel: localeText.incrementValue,
      decrementLabel: localeText.decrementValue,
      ...options.translations,
    },
  });
}
export type NumberInputRootProviderProps = AtomProviderProps & {
  size?: ResponsiveControlSize;
  fullWidth?: boolean;
  layout?: NumberInputLayout;
  stepperVisibility?: NumberInputStepperVisibility;
} & NumberInputRecipeProps;
export const NumberInputRootProvider = forwardRef<
  HTMLDivElement,
  NumberInputRootProviderProps
>(function NumberInputRootProvider(
  {
    size = "lg",
    variant = "outline",
    fullWidth = true,
    layout = "field",
    stepperVisibility = "always",
    shape = "rounded",
    radius,
    style,
    className,
    ...props
  },
  ref,
) {
  const resolvedShape =
    variant === "underline"
      ? undefined
      : radius === undefined
        ? shape
        : "rounded";
  return (
    <VisualContext.Provider
      value={{
        size,
        variant,
        fullWidth,
        layout,
        shape: resolvedShape,
        stepperVisibility,
      }}
    >
      <AtomNumberInput.RootProvider
        {...props}
        ref={ref}
        className={cn("brick-number-input brick-control-size", className)}
        {...fieldVariantAttributes(variant)}
        data-layout={layout}
        data-stepper-visibility={stepperVisibility}
        data-shape={resolvedShape}
        data-full-width={fullWidth ? "" : undefined}
        {...controlSizeDataAttributes(size)}
        style={radiusStyle(
          variant === "underline" ? undefined : radius,
          "--brick-number-input-radius",
          style,
        )}
      />
    </VisualContext.Provider>
  );
});
export const NumberInputLabel: ForwardRefExoticComponent<
  NumberInputLabelProps & RefAttributes<HTMLLabelElement>
> = forwardRef<HTMLLabelElement, NumberInputLabelProps>(
  function NumberInputLabel({ className, ...props }, ref) {
    return (
      <AtomNumberInput.Label
        {...props}
        ref={ref}
        className={cn("brick-number-input-label", className)}
      />
    );
  },
);
export const NumberInputValueText: ForwardRefExoticComponent<
  NumberInputValueTextProps & RefAttributes<HTMLSpanElement>
> = forwardRef<HTMLSpanElement, NumberInputValueTextProps>(
  function NumberInputValueText({ className, ...props }, ref) {
    return (
      <AtomNumberInput.ValueText
        {...props}
        ref={ref}
        className={cn("brick-number-input-value-text", className)}
      />
    );
  },
);
export const NumberInputScrubber: ForwardRefExoticComponent<
  NumberInputScrubberProps & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, NumberInputScrubberProps>(
  function NumberInputScrubber({ className, ...props }, ref) {
    return (
      <AtomNumberInput.Scrubber
        {...props}
        ref={ref}
        className={cn("brick-number-input-scrubber", className)}
      />
    );
  },
);
export const NumberInputContext = AtomNumberInput.Context;

export const NumberInput: {
  Root: typeof NumberInputRoot;
  RootProvider: typeof NumberInputRootProvider;
  Label: typeof NumberInputLabel;
  ValueText: typeof NumberInputValueText;
  Scrubber: typeof NumberInputScrubber;
  Context: typeof NumberInputContext;
  Input: typeof NumberInputInput;
  Control: typeof NumberInputControl;
  Group: typeof NumberInputGroup;
  Element: typeof NumberInputElement;
  Increment: typeof NumberInputIncrement;
  Decrement: typeof NumberInputDecrement;
  Unit: typeof NumberInputUnit;
} = {
  Root: NumberInputRoot,
  RootProvider: NumberInputRootProvider,
  Label: NumberInputLabel,
  ValueText: NumberInputValueText,
  Scrubber: NumberInputScrubber,
  Context: NumberInputContext,
  Input: NumberInputInput,
  Control: NumberInputControl,
  Group: NumberInputGroup,
  Element: NumberInputElement,
  Increment: NumberInputIncrement,
  Decrement: NumberInputDecrement,
  Unit: NumberInputUnit,
} as const;
