"use client";
import { radiusStyle, type RadiusShapeProps } from "../_radius/Radius.js";

import { createContext, useContext, forwardRef, type ReactNode, type ComponentProps, type ForwardRefExoticComponent, type RefAttributes } from "react";
import { DateInput as AtomDateInput, useDateInput as useAtomDateInput, type DateInputRootProps as AtomRootProps } from "@flowstack-ui/atom/date-input";
import { controlSizeDataAttributes, type ResponsiveControlSize } from "../_control-size/ControlSize.js";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";
import { fieldVariantAttributes, type FieldVariant, type ResponsiveFieldVariant } from "../_field-variant/FieldVariant.js";
export { useDateInputContext, type UseDateInputReturn } from "@flowstack-ui/atom/date-input";
export function useDateInput(props: AtomRootProps): ReturnType<typeof useAtomDateInput> {
  const inherited = useLocaleContext();
  return useAtomDateInput({ ...props, locale: props.locale ?? inherited.locale, dir: props.dir ?? inherited.dir, invalidMessage: props.invalidMessage ?? inherited.localeText.invalidDate });
}

export type DateInputVariant = FieldVariant;
export type DateInputShape = "sharp" | "rounded" | "pill";
export type DateInputTone = "neutral" | "accent";
export type DateInputRecipeProps = { size?: ResponsiveControlSize; tone?: DateInputTone } & (
  ({ variant?: Exclude<FieldVariant, "underline"> } & RadiusShapeProps<DateInputShape>) | { variant: "underline"; shape?: never; radius?: never } | { variant: ResponsiveFieldVariant; shape?: never; radius?: never }
);
export type DateInputRootProps = AtomRootProps & DateInputRecipeProps;
export type DateInputPropsProviderProps = DateInputRecipeProps & { children?: ReactNode };
const Presentation = createContext<DateInputRecipeProps>({});
/** Keep mutually exclusive recipe choices exclusive across nested defaults. */
export function mergeDateFieldRecipe(inherited: DateInputRecipeProps, supplied: DateInputRecipeProps): DateInputRecipeProps {
  const size = supplied.size ?? inherited.size;
  const variant = supplied.variant ?? inherited.variant;
  const tone = supplied.tone ?? inherited.tone;
  if (variant === "underline" || typeof variant === "object") return { size, variant, tone, radius: undefined, shape: undefined };
  if (supplied.radius !== undefined) return { size, variant, tone, radius: supplied.radius, shape: undefined };
  if (supplied.shape !== undefined) return { size, variant, tone, shape: supplied.shape, radius: undefined };
  if (inherited.radius !== undefined) return { size, variant, tone, radius: inherited.radius, shape: undefined };
  return { size, variant, tone, shape: inherited.shape, radius: undefined };
}
export function DateInputPropsProvider({ children, ...props }: DateInputPropsProviderProps) {
  const inherited = useContext(Presentation);
  return <Presentation.Provider value={mergeDateFieldRecipe(inherited, props)}>{children}</Presentation.Provider>;
}
const classes = (base: string, extra?: string) => [base, extra].filter(Boolean).join(" ");
export const DateInputControl = forwardRef<HTMLDivElement, ComponentProps<typeof AtomDateInput.Control>>(function DateInputControl({ className, ...props }, ref) {
  return <AtomDateInput.Control {...props} ref={ref} className={classes("brick-date-input__control", className)} />;
});
export const DateInputLabel = forwardRef<HTMLLabelElement, ComponentProps<typeof AtomDateInput.Label>>(function DateInputLabel({ className, ...props }, ref) {
  return <AtomDateInput.Label {...props} ref={ref} className={classes("brick-date-input__label", className)} />;
});
export const DateInputSegmentGroup = forwardRef<HTMLDivElement, ComponentProps<typeof AtomDateInput.SegmentGroup>>(function DateInputSegmentGroup({ className, ...props }, ref) {
  return <AtomDateInput.SegmentGroup {...props} ref={ref} className={classes("brick-date-input__group", className)} />;
});
export const DateInputSegment = AtomDateInput.Segment;
export const DateInputSegments = AtomDateInput.Segments;
export const DateInputHiddenInput = AtomDateInput.HiddenInput;
export const DateInputContext = AtomDateInput.Context;
export function DateClearIcon() {
  return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}
export const DateInputClearTrigger: ForwardRefExoticComponent<ComponentProps<typeof AtomDateInput.ClearTrigger> & RefAttributes<HTMLButtonElement>> = forwardRef<HTMLButtonElement, ComponentProps<typeof AtomDateInput.ClearTrigger>>(function DateInputClearTrigger({ className, children, ...props }, ref) {
  const { localeText } = useLocaleContext();
  return <AtomDateInput.ClearTrigger aria-label={localeText.clearDate} {...props} ref={ref} className={classes(props.asChild || props.render ? "brick-date-input__clear" : "brick-date-input__action", className)}>{children ?? <DateClearIcon />}</AtomDateInput.ClearTrigger>;
});
export type DateInputRootProviderProps = ComponentProps<typeof AtomDateInput.RootProvider> & DateInputRecipeProps;
export const DateInputRootProvider = forwardRef<HTMLDivElement, DateInputRootProviderProps>(function DateInputRootProvider(provided, ref) {
  const { size = "lg", variant = "outline", tone = "neutral", shape = "rounded", radius, style, className, ...props } = { ...provided, ...mergeDateFieldRecipe(useContext(Presentation), provided) };
  return <AtomDateInput.RootProvider {...props} ref={ref} data-tone={tone}
    style={radiusStyle(variant === "underline" ? undefined : radius, "--brick-date-input-radius", style)}
    className={classes("brick-date-input brick-control-size", className)} {...controlSizeDataAttributes(size)} {...fieldVariantAttributes(variant)} data-shape={radius === undefined ? shape : "rounded"} />;
});
export const DateInputRoot = forwardRef<HTMLDivElement, DateInputRootProps>(function DateInputRoot(provided, ref) {
  const { size = "lg", variant = "outline", tone = "neutral", shape = "rounded", radius, style, className, children, locale, dir, invalidMessage, ...props } = { ...provided, ...mergeDateFieldRecipe(useContext(Presentation), provided) };
  const inherited = useLocaleContext();
  const range = props.selectionMode === "range";
  return <AtomDateInput.Root {...props} ref={ref} data-tone={tone} locale={locale ?? inherited.locale} dir={dir ?? inherited.dir}
    invalidMessage={invalidMessage ?? inherited.localeText.invalidDate}
    style={radiusStyle(variant === "underline" ? undefined : radius, "--brick-date-input-radius", style)}
    className={classes("brick-date-input brick-control-size", className)} {...controlSizeDataAttributes(size)} {...fieldVariantAttributes(variant)} data-shape={radius === undefined ? shape : "rounded"}>
    {children ?? <><DateInputControl>
      <DateInputSegmentGroup aria-label={range ? inherited.localeText.startDate : props["aria-label"]} aria-labelledby={range ? undefined : props["aria-labelledby"]}><DateInputSegments /></DateInputSegmentGroup>
      {range && <><span aria-hidden="true">–</span><DateInputSegmentGroup index={1} aria-label={inherited.localeText.endDate}><DateInputSegments index={1} /></DateInputSegmentGroup></>}
    </DateInputControl><DateInputHiddenInput />{range && <DateInputHiddenInput index={1} />}</>}
  </AtomDateInput.Root>;
});
export const DateInput: Readonly<{ PropsProvider: typeof DateInputPropsProvider; Root: typeof DateInputRoot; RootProvider: typeof DateInputRootProvider; Control: typeof DateInputControl; Label: typeof DateInputLabel; SegmentGroup: typeof DateInputSegmentGroup; Segment: typeof DateInputSegment; Segments: typeof DateInputSegments; ClearTrigger: typeof DateInputClearTrigger; HiddenInput: typeof DateInputHiddenInput; Context: typeof DateInputContext }> = Object.freeze({ PropsProvider: DateInputPropsProvider, Root: DateInputRoot, RootProvider: DateInputRootProvider, Control: DateInputControl, Label: DateInputLabel, SegmentGroup: DateInputSegmentGroup, Segment: DateInputSegment, Segments: DateInputSegments, ClearTrigger: DateInputClearTrigger, HiddenInput: DateInputHiddenInput, Context: DateInputContext });
