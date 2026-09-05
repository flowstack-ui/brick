"use client";

import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  NumberInput as AtomNumberInput,
  type NumberInputDecrementProps as AtomDecrementProps,
  type NumberInputIncrementProps as AtomIncrementProps,
  type NumberInputInputProps as AtomInputProps,
  type NumberInputRootProps as AtomRootProps,
} from "@flowstack-ui/atom/number-input";
import {
  controlSizeDataAttributes,
  type ControlSize,
  type ResponsiveControlSize,
} from "../_control-size/ControlSize.js";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";

export type NumberInputVariant = "outline" | "soft" | "underline";
export type NumberInputSize = ControlSize;
export type NumberInputShape = "sharp" | "rounded" | "pill";
export type NumberInputStepperVisibility = "always" | "hover";
export type NumberInputLayout = "field" | "stepper";
type Visual = {
  fullWidth: boolean;
  layout: NumberInputLayout;
  shape?: NumberInputShape;
  size: ResponsiveControlSize;
  variant: NumberInputVariant;
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
export type NumberInputRootProps = SharedRootProps &
  (
    | { variant?: "outline" | "soft"; shape?: NumberInputShape }
    | { variant: "underline"; shape?: never }
  );
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
export interface NumberInputControlProps extends HTMLAttributes<HTMLSpanElement> {
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
      size = "lg",
      stepperVisibility = "always",
      variant = "outline",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const visual = {
      fullWidth,
      layout,
      shape: variant === "underline" ? undefined : shape,
      size,
      variant,
    };
    return (
      <VisualContext.Provider value={visual}>
        <AtomNumberInput.Root
          {...props}
          className={cn("brick-number-input brick-control-size", className)}
          data-full-width={fullWidth ? "" : undefined}
          data-layout={layout}
          data-shape={visual.shape}
          data-slot={dataSlot ?? "number-input"}
          data-stepper-visibility={stepperVisibility}
          data-variant={variant}
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
  const { localeText } = useLocaleContext();
  return (
    <span
      {...props}
      className={cn("brick-number-input-stepper", className)}
      data-slot={dataSlot ?? "number-input-stepper"}
      ref={ref}
    >
      {children === undefined ? (
        <>
          <NumberInputIncrement aria-label={incrementLabel ?? localeText.incrementValue} />
          <NumberInputDecrement aria-label={decrementLabel ?? localeText.decrementValue} />
        </>
      ) : (
        children
      )}
    </span>
  );
});

export const NumberInput = {
  Root: NumberInputRoot,
  Input: NumberInputInput,
  Control: NumberInputControl,
  Increment: NumberInputIncrement,
  Decrement: NumberInputDecrement,
  Unit: NumberInputUnit,
} as const;
