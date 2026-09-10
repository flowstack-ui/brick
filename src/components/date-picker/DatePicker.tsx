"use client";
import { radiusStyle, type Radius } from "../_radius/Radius.js";

import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { DatePicker as AtomDatePicker, type DatePickerRootProps as AtomRootProps } from "@flowstack-ui/atom/date-picker";
import { controlSizeDataAttributes } from "../_control-size/ControlSize.js";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";
import { CalendarDefaultContent, type CalendarDensity, type CalendarSize } from "../calendar/Calendar.js";
import { DateClearIcon, type DateInputRecipeProps } from "../date-input/DateInput.js";

export type DatePickerRootProps = AtomRootProps & DateInputRecipeProps;
export type DatePickerContentProps = ComponentProps<typeof AtomDatePicker.Content> & { appearance?: "light" | "dark"; radius?: Radius };
export type DatePickerCalendarProps = ComponentProps<typeof AtomDatePicker.Calendar> & { density?: CalendarDensity; size?: CalendarSize };
const classes = (base: string, extra?: string) => [base, extra].filter(Boolean).join(" ");
export const DatePickerRoot = forwardRef<HTMLDivElement, DatePickerRootProps>(function DatePickerRoot({ size = "lg", variant = "outline", shape = "rounded", radius, style, className, locale, dir, invalidMessage, startLabel, endLabel, ...props }, ref) {
  const inherited = useLocaleContext();
  return <AtomDatePicker.Root {...props} ref={ref} locale={locale ?? inherited.locale} dir={dir ?? inherited.dir}
    invalidMessage={invalidMessage ?? inherited.localeText.invalidDate} startLabel={startLabel ?? inherited.localeText.startDate} endLabel={endLabel ?? inherited.localeText.endDate}
    style={radiusStyle(variant === "underline" ? undefined : radius, "--brick-date-input-radius", style)}
    className={classes("brick-date-picker brick-control-size", className)} {...controlSizeDataAttributes(size)} data-variant={variant} data-shape={radius === undefined ? shape : "rounded"} />;
});
export const DatePickerLabel = forwardRef<HTMLLabelElement, ComponentProps<typeof AtomDatePicker.Label>>(function DatePickerLabel({ className, ...props }, ref) {
  return <AtomDatePicker.Label {...props} className={classes("brick-date-input__label", className)} ref={ref} />;
});
export const DatePickerControl = forwardRef<HTMLDivElement, ComponentProps<typeof AtomDatePicker.Control>>(function DatePickerControl({ className, ...props }, ref) {
  return <AtomDatePicker.Control {...props} className={classes("brick-date-input__control", className)} ref={ref} />;
});
export const DatePickerInput = forwardRef<HTMLDivElement, ComponentProps<typeof AtomDatePicker.Input>>(function DatePickerInput({ className, ...props }, ref) {
  return <AtomDatePicker.Input {...props} className={classes("brick-date-picker__input", className)} ref={ref} />;
});
export const DatePickerTrigger = forwardRef<HTMLElement, Omit<ComponentProps<typeof AtomDatePicker.Trigger>, "children"> & { children?: ReactNode }>(function DatePickerTrigger({ className, children, ...props }, ref) {
  const { localeText } = useLocaleContext();
  return <AtomDatePicker.Trigger aria-label={localeText.chooseDate} {...props} className={classes(props.asChild || props.render ? "brick-date-picker__trigger" : "brick-date-input__action", className)} ref={ref}>
    {children ?? <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></svg>}
  </AtomDatePicker.Trigger>;
});
export const DatePickerClearTrigger = forwardRef<HTMLButtonElement, ComponentProps<typeof AtomDatePicker.ClearTrigger>>(function DatePickerClearTrigger({ className, children, ...props }, ref) {
  const { localeText } = useLocaleContext();
  return <AtomDatePicker.ClearTrigger aria-label={localeText.clearDate} {...props} className={classes("brick-date-input__action", className)} ref={ref}>{children ?? <DateClearIcon />}</AtomDatePicker.ClearTrigger>;
});
export const DatePickerContent = forwardRef<HTMLDivElement, DatePickerContentProps>(function DatePickerContent({ className, appearance, radius, style, sideOffset = 8, ...props }, ref) {
  return <AtomDatePicker.Content {...props} ref={ref} style={radiusStyle(radius, "--brick-popover-radius", style)} sideOffset={sideOffset} data-brick-appearance={appearance} className={classes("brick-popover brick-date-picker__content", className)} />;
});
export const DatePickerCalendar = forwardRef<HTMLDivElement, DatePickerCalendarProps>(function DatePickerCalendar({ className, children, density = "comfortable", size, ...props }, ref) {
  return <AtomDatePicker.Calendar {...props} ref={ref} className={classes("brick-calendar brick-control-size", className)} data-density={density} {...controlSizeDataAttributes(size ?? (density === "compact" ? "sm" : "md"))}>
    {children ?? <AtomDatePicker.Context>{({ props: options }) => <CalendarDefaultContent months={options.numOfMonths} />}</AtomDatePicker.Context>}
  </AtomDatePicker.Calendar>;
});
export const DatePickerPortal = AtomDatePicker.Portal;
export const DatePickerContext = AtomDatePicker.Context;
export const DatePickerValueText = AtomDatePicker.ValueText;
export const DatePickerHiddenInput = AtomDatePicker.HiddenInput;
export const DatePicker = Object.freeze({ Root: DatePickerRoot, Label: DatePickerLabel, Control: DatePickerControl, Input: DatePickerInput, Trigger: DatePickerTrigger, ClearTrigger: DatePickerClearTrigger, Portal: DatePickerPortal, Content: DatePickerContent, Calendar: DatePickerCalendar, Context: DatePickerContext, ValueText: DatePickerValueText, HiddenInput: DatePickerHiddenInput });
