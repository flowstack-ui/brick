"use client";
import { forwardRef, type ReactElement } from "react";
import { RadioCard as AtomCard, useRadioCardItemContext, type RadioCardRootProps as AtomRootProps, type RadioCardRootProviderProps as AtomProviderProps, type RadioCardItemProps as AtomItemProps, type RadioCardPartProps as AtomPartProps } from "@flowstack-ui/atom/radio-card";
import { composeHost } from "@flowstack-ui/atom/compose-host";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
import type { CheckboxTone } from "../checkbox/CheckboxPresentation.js";
export { useRadioCard, useRadioCardContext, useRadioCardItemContext } from "@flowstack-ui/atom/radio-card";
export type { RadioCardController, UseRadioCardProps, RadioCardHiddenInputProps } from "@flowstack-ui/atom/radio-card";
export type RadioCardSize = "sm" | "md" | "lg";
export type RadioCardVariant = "outline" | "surface" | "subtle" | "solid";
export type RadioCardAlign = "start" | "center" | "end";
export type RadioCardJustify = "start" | "center" | "end";
export type RadioCardTone = CheckboxTone;
export interface RadioCardPresentationProps {
  radius?: Radius;
  size?: ResponsiveValue<RadioCardSize>;
  variant?: ResponsiveValue<RadioCardVariant>;
  tone?: RadioCardTone;
  align?: ResponsiveValue<RadioCardAlign>;
  justify?: ResponsiveValue<RadioCardJustify>;
  contentOrientation?: ResponsiveValue<"horizontal" | "vertical">;
}
export interface RadioCardRootProps extends AtomRootProps, RadioCardPresentationProps {}
export interface RadioCardRootProviderProps extends AtomProviderProps, RadioCardPresentationProps {}
export type RadioCardItemProps = AtomItemProps;
export type RadioCardPartProps = AtomPartProps;
export interface RadioCardIndicatorProps extends RadioCardPartProps { checked?: ReactElement }
export type RadioCardRegionProps = Omit<RadioCardPartProps, "render">;
const cn = (base: string, extra?: string) => extra ? `${base} ${extra}` : base;
function presentation({ radius, size = "md", variant = "outline", tone = "accent", align = "start", justify = "start", orientation = "horizontal", contentOrientation = orientation, className, style, ...props }: RadioCardRootProps | RadioCardRootProviderProps) {
  return { ...props, orientation, className: cn("brick-radio-card", className), "data-tone": tone,
    ...responsiveDataAttributes("data-size", size, { defaultValue: "md", alwaysInitial: true }),
    ...responsiveDataAttributes("data-variant", variant, { defaultValue: "outline", alwaysInitial: true }),
    ...responsiveDataAttributes("data-align", align, { defaultValue: "start", alwaysInitial: true }),
    ...responsiveDataAttributes("data-justify", justify, { defaultValue: "start", alwaysInitial: true }),
    ...responsiveDataAttributes("data-content-orientation", contentOrientation, { defaultValue: "horizontal", alwaysInitial: true }),
    style: radiusStyle(radius, "--brick-radio-card-radius", style) };
}
export const RadioCardRoot = forwardRef<HTMLDivElement, RadioCardRootProps>(function RadioCardRoot(props, ref) {
  return <AtomCard.Root {...(presentation(props) as AtomRootProps)} ref={ref} />;
});
export const RadioCardRootProvider = forwardRef<HTMLDivElement, RadioCardRootProviderProps>(function RadioCardRootProvider(props, ref) {
  return <AtomCard.RootProvider {...(presentation(props) as AtomProviderProps)} ref={ref} />;
});
export const RadioCardItem = forwardRef<HTMLLabelElement, RadioCardItemProps>(function RadioCardItem({ className, ...props }, ref) {
  return <AtomCard.Item {...props} className={cn("brick-radio-card__item", className)} ref={ref} />;
});
function part(name: "Control" | "Title" | "Description" | "Label") {
  const Component = AtomCard[name];
  return forwardRef<HTMLSpanElement, RadioCardPartProps>(function RadioCardPart({ className, ...props }, ref) {
    return <Component {...props} className={cn(`brick-radio-card__${name.toLowerCase()}`, className)} ref={ref} />;
  });
}
function region(name: "content" | "addon") {
  return forwardRef<HTMLSpanElement, RadioCardRegionProps>(function RadioCardRegion({ className, asChild, children, ...props }, ref) {
    const attributes = { ...props, className: cn(`brick-radio-card__${name}`, className), "data-slot": props["data-slot"] ?? `radio-card-${name}`, ref };
    return asChild ? composeHost(children, attributes) : <span {...attributes}>{children}</span>;
  });
}
export const RadioCardLabel = part("Label");
export const RadioCardControl = part("Control");
export const RadioCardTitle = part("Title");
export const RadioCardDescription = part("Description");
export const RadioCardContent = region("content");
export const RadioCardAddon = region("addon");
export const RadioCardIndicator = forwardRef<HTMLSpanElement, RadioCardIndicatorProps>(function RadioCardIndicator({ checked, children, className, ...props }, ref) {
  const state = useRadioCardItemContext();
  return <AtomCard.Indicator {...props} ref={ref} className={cn("brick-radio-card__indicator", className)} data-custom={checked || children !== undefined ? "" : undefined}>
    {state.checked && checked ? checked : children ?? <span className="brick-radio-card__indicator-dot" />}
  </AtomCard.Indicator>;
});
export const RadioCardHiddenInput = AtomCard.HiddenInput;
export const RadioCardContext = AtomCard.Context;
export const RadioCardItemContext = AtomCard.ItemContext;
export const RadioCard = Object.freeze({ Root: RadioCardRoot, RootProvider: RadioCardRootProvider, Label: RadioCardLabel, Item: RadioCardItem, HiddenInput: RadioCardHiddenInput, Control: RadioCardControl, Content: RadioCardContent, Title: RadioCardTitle, Description: RadioCardDescription, Indicator: RadioCardIndicator, Addon: RadioCardAddon, Context: RadioCardContext, ItemContext: RadioCardItemContext });
