"use client";

import { createContext, forwardRef, useContext, type HTMLAttributes, type ReactNode } from "react";
import {
  Combobox as AtomCombobox,
  type ComboboxClearProps as AtomClearProps,
  type ComboboxControlProps as AtomControlProps,
  type ComboboxContentProps as AtomContentProps,
  type ComboboxEmptyProps as AtomEmptyProps,
  type ComboboxGroupProps as AtomGroupProps,
  type ComboboxInputProps as AtomInputProps,
  type ComboboxItemProps as AtomItemProps,
  type ComboboxLabelProps as AtomLabelProps,
  type ComboboxListboxProps as AtomListboxProps,
  type ComboboxLoadingProps as AtomLoadingProps,
  type ComboboxPortalProps as AtomPortalProps,
  type ComboboxRootProps as AtomRootProps,
  type ComboboxTriggerProps as AtomTriggerProps,
} from "@flowstack-ui/atom/combobox";

export type ComboboxVariant = "outline" | "soft" | "underline";
export type ComboboxSize = "sm" | "md" | "lg";
export type ComboboxShape = "sharp" | "rounded" | "pill";

type RootShared = AtomRootProps & { size?: ComboboxSize; fullWidth?: boolean };
export type ComboboxRootProps = RootShared & ({ variant?: "outline" | "soft"; shape?: ComboboxShape } | { variant: "underline"; shape?: never });
export type ComboboxControlProps = AtomControlProps;
export type ComboboxInputProps = AtomInputProps;
export type ComboboxClearProps = Omit<AtomClearProps, "children"> & { children?: ReactNode };
export type ComboboxIndicatorProps = HTMLAttributes<HTMLSpanElement> & { "data-slot"?: string };
export type ComboboxTriggerProps = Omit<AtomTriggerProps, "children"> & { children?: ReactNode };
export type ComboboxPortalProps = AtomPortalProps;
export type ComboboxContentProps = AtomContentProps;
export type ComboboxListboxProps = AtomListboxProps;
export type ComboboxGroupProps = AtomGroupProps;
export type ComboboxLabelProps = AtomLabelProps;
export type ComboboxItemProps = AtomItemProps;
export type ComboboxEmptyProps = AtomEmptyProps;
export type ComboboxLoadingProps = AtomLoadingProps;

const VisualContext = createContext({ fullWidth: true, shape: "rounded" as ComboboxShape | undefined, size: "md" as ComboboxSize, variant: "outline" as ComboboxVariant });
const cn = (base: string, value?: string) => value ? `${base} ${value}` : base;
const slot = (value: string | undefined, fallback: string) => value ?? fallback;

function ClearArtwork() { return <svg aria-hidden="true" className="brick-combobox-clear-artwork" fill="none" viewBox="0 0 16 16"><path d="m4 4 8 8m0-8-8 8" /></svg>; }
function IndicatorArtwork() { return <svg aria-hidden="true" className="brick-combobox-indicator-artwork" fill="none" viewBox="0 0 16 16"><path d="m4 6 4 4 4-4" /></svg>; }

export function ComboboxRoot({ children, fullWidth = true, shape = "rounded", size = "md", variant = "outline", ...props }: ComboboxRootProps) {
  const resolvedShape = variant === "underline" ? undefined : shape;
  return <VisualContext.Provider value={{ fullWidth, shape: resolvedShape, size, variant }}><AtomCombobox.Root {...props}>{children}</AtomCombobox.Root></VisualContext.Provider>;
}

export const ComboboxControl = forwardRef<HTMLDivElement, ComboboxControlProps>(function ComboboxControl({ className, "data-slot": dataSlot, ...props }, ref) {
  const visual = useContext(VisualContext);
  return <AtomCombobox.Control {...props} className={cn("brick-combobox-control", className)} data-full-width={visual.fullWidth ? "" : undefined} data-shape={visual.shape} data-size={visual.size} data-slot={slot(dataSlot, "combobox-control")} data-variant={visual.variant} ref={ref} />;
});
export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(function ComboboxInput({ className, "data-slot": dataSlot, ...props }, ref) { return <AtomCombobox.Input {...props} className={cn("brick-combobox-input", className)} data-slot={slot(dataSlot, "combobox-input")} ref={ref} />; });
export const ComboboxClear = forwardRef<HTMLButtonElement, ComboboxClearProps>(function ComboboxClear({ children, className, "data-slot": dataSlot, ...props }, ref) { return <AtomCombobox.Clear {...props} className={cn("brick-combobox-clear", className)} data-slot={slot(dataSlot, "combobox-clear")} ref={ref}>{children ?? <ClearArtwork />}</AtomCombobox.Clear>; });
export const ComboboxIndicator = forwardRef<HTMLSpanElement, ComboboxIndicatorProps>(function ComboboxIndicator({ children, className, "data-slot": dataSlot, ...props }, ref) { return <span {...props} aria-hidden="true" className={cn("brick-combobox-indicator", className)} data-slot={slot(dataSlot, "combobox-indicator")} ref={ref}>{children ?? <IndicatorArtwork />}</span>; });
export const ComboboxTrigger = forwardRef<HTMLButtonElement, ComboboxTriggerProps>(function ComboboxTrigger({ children, className, "data-slot": dataSlot, ...props }, ref) { return <AtomCombobox.Trigger {...props} aria-label={props["aria-label"] ?? "Toggle options"} className={cn("brick-combobox-trigger", className)} data-slot={slot(dataSlot, "combobox-trigger")} ref={ref}>{children ?? <ComboboxIndicator />}</AtomCombobox.Trigger>; });
export const ComboboxPortal = AtomCombobox.Portal;
export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(function ComboboxContent({ className, "data-slot": dataSlot, ...props }, ref) { return <AtomCombobox.Content {...props} className={cn("brick-combobox-content", className)} data-slot={slot(dataSlot, "combobox-content")} ref={ref} />; });
export const ComboboxListbox = forwardRef<HTMLDivElement, ComboboxListboxProps>(function ComboboxListbox({ className, "data-slot": dataSlot, ...props }, ref) { return <AtomCombobox.Listbox {...props} className={cn("brick-combobox-listbox", className)} data-slot={slot(dataSlot, "combobox-listbox")} ref={ref} />; });
export const ComboboxGroup = forwardRef<HTMLDivElement, ComboboxGroupProps>(function ComboboxGroup({ className, "data-slot": dataSlot, ...props }, ref) { return <AtomCombobox.Group {...props} className={cn("brick-combobox-group", className)} data-slot={slot(dataSlot, "combobox-group")} ref={ref} />; });
export const ComboboxLabel = forwardRef<HTMLElement, ComboboxLabelProps>(function ComboboxLabel({ className, "data-slot": dataSlot, ...props }, ref) { return <AtomCombobox.Label {...props} className={cn("brick-combobox-label", className)} data-slot={slot(dataSlot, "combobox-label")} ref={ref} />; });
export const ComboboxItem = forwardRef<HTMLDivElement, ComboboxItemProps>(function ComboboxItem({ className, "data-slot": dataSlot, ...props }, ref) { return <AtomCombobox.Item {...props} className={cn("brick-combobox-item", className)} data-slot={slot(dataSlot, "combobox-item")} ref={ref} />; });
export const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(function ComboboxEmpty({ className, "data-slot": dataSlot, ...props }, ref) { return <AtomCombobox.Empty {...props} className={cn("brick-combobox-message brick-combobox-empty", className)} data-slot={slot(dataSlot, "combobox-empty")} ref={ref} />; });
export const ComboboxLoading = forwardRef<HTMLDivElement, ComboboxLoadingProps>(function ComboboxLoading({ className, "data-slot": dataSlot, ...props }, ref) { return <AtomCombobox.Loading {...props} className={cn("brick-combobox-message brick-combobox-loading", className)} data-slot={slot(dataSlot, "combobox-loading")} ref={ref} />; });

export const Combobox = Object.freeze({ Root: ComboboxRoot, Label: ComboboxLabel, Control: ComboboxControl, Input: ComboboxInput, Clear: ComboboxClear, Trigger: ComboboxTrigger, Indicator: ComboboxIndicator, Portal: ComboboxPortal, Content: ComboboxContent, Listbox: ComboboxListbox, Group: ComboboxGroup, Item: ComboboxItem, Empty: ComboboxEmpty, Loading: ComboboxLoading });
