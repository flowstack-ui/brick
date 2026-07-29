"use client";

import { createContext, forwardRef, useContext, type ReactNode } from "react";
import {
  NumberInput as AtomNumberInput,
  type NumberInputDecrementProps as AtomDecrementProps,
  type NumberInputIncrementProps as AtomIncrementProps,
  type NumberInputInputProps as AtomInputProps,
  type NumberInputRootProps as AtomRootProps,
} from "@flowstack-ui/atom/number-input";

export type NumberInputVariant = "outline" | "soft" | "underline";
export type NumberInputSize = "sm" | "md" | "lg";
export type NumberInputShape = "sharp" | "rounded" | "pill";
type Visual = { fullWidth: boolean; shape?: NumberInputShape; size: NumberInputSize; variant: NumberInputVariant };
const VisualContext = createContext<Visual>({ fullWidth: true, shape: "rounded", size: "md", variant: "outline" });
const cn = (base: string, value?: string) => value ? `${base} ${value}` : base;

type SharedRootProps = AtomRootProps & { fullWidth?: boolean; size?: NumberInputSize };
export type NumberInputRootProps = SharedRootProps & ({ variant?: "outline" | "soft"; shape?: NumberInputShape } | { variant: "underline"; shape?: never });
export type NumberInputInputProps = AtomInputProps;
export type NumberInputIncrementProps = Omit<AtomIncrementProps, "children"> & { children?: ReactNode };
export type NumberInputDecrementProps = Omit<AtomDecrementProps, "children"> & { children?: ReactNode };

function StepArtwork({ direction }: { direction: "up" | "down" }) {
  return <svg aria-hidden="true" className="brick-number-input-step-artwork" fill="none" viewBox="0 0 16 16"><path d={direction === "up" ? "m4 10 4-4 4 4" : "m4 6 4 4 4-4"} /></svg>;
}

export const NumberInputRoot = forwardRef<HTMLDivElement, NumberInputRootProps>(function NumberInputRoot({ children, className, fullWidth = true, shape = "rounded", size = "md", variant = "outline", "data-slot": dataSlot, ...props }, ref) {
  const visual = { fullWidth, shape: variant === "underline" ? undefined : shape, size, variant };
  return <VisualContext.Provider value={visual}><AtomNumberInput.Root {...props} className={cn("brick-number-input", className)} data-full-width={fullWidth ? "" : undefined} data-shape={visual.shape} data-size={size} data-slot={dataSlot ?? "number-input"} data-variant={variant} ref={ref}>{children}</AtomNumberInput.Root></VisualContext.Provider>;
});
export const NumberInputInput = forwardRef<HTMLInputElement, NumberInputInputProps>(function NumberInputInput({ className, "data-slot": dataSlot, ...props }, ref) { useContext(VisualContext); return <AtomNumberInput.Input {...props} className={cn("brick-number-input-control", className)} data-slot={dataSlot ?? "number-input-control"} ref={ref} />; });
export const NumberInputIncrement = forwardRef<HTMLButtonElement, NumberInputIncrementProps>(function NumberInputIncrement({ children, className, "data-slot": dataSlot, ...props }, ref) { return <AtomNumberInput.Increment {...props} className={cn("brick-number-input-step brick-number-input-increment", className)} data-slot={dataSlot ?? "number-input-increment"} ref={ref}>{children ?? <StepArtwork direction="up" />}</AtomNumberInput.Increment>; });
export const NumberInputDecrement = forwardRef<HTMLButtonElement, NumberInputDecrementProps>(function NumberInputDecrement({ children, className, "data-slot": dataSlot, ...props }, ref) { return <AtomNumberInput.Decrement {...props} className={cn("brick-number-input-step brick-number-input-decrement", className)} data-slot={dataSlot ?? "number-input-decrement"} ref={ref}>{children ?? <StepArtwork direction="down" />}</AtomNumberInput.Decrement>; });

export const NumberInput = { Root: NumberInputRoot, Input: NumberInputInput, Increment: NumberInputIncrement, Decrement: NumberInputDecrement } as const;
