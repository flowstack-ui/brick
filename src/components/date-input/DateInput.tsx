"use client";
import { radiusStyle, type RadiusShapeProps } from "../_radius/Radius.js";

import { forwardRef, type ComponentProps } from "react";
import { DateInput as AtomDateInput, type DateInputRootProps as AtomRootProps } from "@flowstack-ui/atom/date-input";
import { controlSizeDataAttributes, type ResponsiveControlSize } from "../_control-size/ControlSize.js";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";

export type DateInputVariant = "outline" | "soft" | "underline";
export type DateInputShape = "sharp" | "rounded" | "pill";
export type DateInputRecipeProps = { size?: ResponsiveControlSize } & (
  ({ variant?: "outline" | "soft" } & RadiusShapeProps<DateInputShape>) | { variant: "underline"; shape?: never; radius?: never }
);
export type DateInputRootProps = AtomRootProps & DateInputRecipeProps;
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
export const DateInputClearTrigger = forwardRef<HTMLButtonElement, ComponentProps<typeof AtomDateInput.ClearTrigger>>(function DateInputClearTrigger({ className, children, ...props }, ref) {
  const { localeText } = useLocaleContext();
  return <AtomDateInput.ClearTrigger aria-label={localeText.clearDate} {...props} ref={ref} className={classes("brick-date-input__action", className)}>{children ?? <DateClearIcon />}</AtomDateInput.ClearTrigger>;
});
export const DateInputRoot = forwardRef<HTMLDivElement, DateInputRootProps>(function DateInputRoot({ size = "lg", variant = "outline", shape = "rounded", radius, style, className, children, locale, dir, invalidMessage, ...props }, ref) {
  const inherited = useLocaleContext();
  const range = props.selectionMode === "range";
  return <AtomDateInput.Root {...props} ref={ref} locale={locale ?? inherited.locale} dir={dir ?? inherited.dir}
    invalidMessage={invalidMessage ?? inherited.localeText.invalidDate}
    style={radiusStyle(variant === "underline" ? undefined : radius, "--brick-date-input-radius", style)}
    className={classes("brick-date-input brick-control-size", className)} {...controlSizeDataAttributes(size)} data-variant={variant} data-shape={radius === undefined ? shape : "rounded"}>
    {children ?? <><DateInputControl>
      <DateInputSegmentGroup aria-label={range ? inherited.localeText.startDate : props["aria-label"]} aria-labelledby={range ? undefined : props["aria-labelledby"]}><DateInputSegments /></DateInputSegmentGroup>
      {range && <><span aria-hidden="true">–</span><DateInputSegmentGroup index={1} aria-label={inherited.localeText.endDate}><DateInputSegments index={1} /></DateInputSegmentGroup></>}
    </DateInputControl><DateInputHiddenInput />{range && <DateInputHiddenInput index={1} />}</>}
  </AtomDateInput.Root>;
});
export const DateInput = Object.freeze({ Root: DateInputRoot, Control: DateInputControl, Label: DateInputLabel, SegmentGroup: DateInputSegmentGroup, Segment: DateInputSegment, Segments: DateInputSegments, ClearTrigger: DateInputClearTrigger, HiddenInput: DateInputHiddenInput, Context: DateInputContext });
