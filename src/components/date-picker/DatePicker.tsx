"use client";
import { radiusStyle, type Radius } from "../_radius/Radius.js";

import { createContext, useContext, forwardRef, type ComponentProps, type ReactNode, type ForwardRefExoticComponent, type RefAttributes } from "react";
import { DatePicker as AtomDatePicker, useDatePicker as useAtomDatePicker, type DatePickerRootProps as AtomRootProps } from "@flowstack-ui/atom/date-picker";
import { controlSizeDataAttributes } from "../_control-size/ControlSize.js";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";
import { CalendarDefaultContent, calendarSizeAttributes, type CalendarRecipeProps } from "../calendar/Calendar.js";
import { DateClearIcon, mergeDateFieldRecipe, type DateInputRecipeProps } from "../date-input/DateInput.js";
import { fieldVariantAttributes } from "../_field-variant/FieldVariant.js";
export { useDatePickerContext, type UseDatePickerReturn } from "@flowstack-ui/atom/date-picker";
export function useDatePicker(props: AtomRootProps): ReturnType<typeof useAtomDatePicker> {
  const inherited = useLocaleContext();
  return useAtomDatePicker({ ...props, locale: props.locale ?? inherited.locale, dir: props.dir ?? inherited.dir,
    invalidMessage: props.invalidMessage ?? inherited.localeText.invalidDate, startLabel: props.startLabel ?? inherited.localeText.startDate, endLabel: props.endLabel ?? inherited.localeText.endDate });
}

export type DatePickerRootProps = AtomRootProps & DateInputRecipeProps;
export type DatePickerPropsProviderProps = DateInputRecipeProps & { children?: ReactNode };
const Presentation = createContext<DateInputRecipeProps>({});
export function DatePickerPropsProvider({ children, ...props }: DatePickerPropsProviderProps) {
  const inherited = useContext(Presentation);
  return <Presentation.Provider value={mergeDateFieldRecipe(inherited, props)}>{children}</Presentation.Provider>;
}
export type DatePickerContentProps = ComponentProps<typeof AtomDatePicker.Content> & { appearance?: "light" | "dark"; radius?: Radius };
export type DatePickerCalendarProps = ComponentProps<typeof AtomDatePicker.Calendar> & CalendarRecipeProps;
const classes = (base: string, extra?: string) => [base, extra].filter(Boolean).join(" ");
export const DatePickerRoot = forwardRef<HTMLDivElement, DatePickerRootProps>(function DatePickerRoot(provided, ref) {
  const { size = "lg", variant = "outline", tone = "neutral", shape = "rounded", radius, style, className, locale, dir, invalidMessage, startLabel, endLabel, ...props } = { ...provided, ...mergeDateFieldRecipe(useContext(Presentation), provided) };
  const inherited = useLocaleContext();
  return <AtomDatePicker.Root {...props} ref={ref} data-tone={tone} locale={locale ?? inherited.locale} dir={dir ?? inherited.dir}
    invalidMessage={invalidMessage ?? inherited.localeText.invalidDate} startLabel={startLabel ?? inherited.localeText.startDate} endLabel={endLabel ?? inherited.localeText.endDate}
    style={radiusStyle(variant === "underline" ? undefined : radius, "--brick-date-input-radius", style)}
    className={classes("brick-date-picker brick-control-size", className)} {...controlSizeDataAttributes(size)} {...fieldVariantAttributes(variant)} data-shape={radius === undefined ? shape : "rounded"} />;
});
export const DatePickerLabel = forwardRef<HTMLLabelElement, ComponentProps<typeof AtomDatePicker.Label>>(function DatePickerLabel({ className, ...props }, ref) {
  return <AtomDatePicker.Label {...props} className={classes("brick-date-input__label", className)} ref={ref} />;
});
export const DatePickerControl = forwardRef<HTMLDivElement, ComponentProps<typeof AtomDatePicker.Control>>(function DatePickerControl({ className, ...props }, ref) {
  return <AtomDatePicker.Control {...props} className={classes("brick-date-input__control brick-date-picker__control", className)} ref={ref} />;
});
export const DatePickerInput = forwardRef<HTMLDivElement, ComponentProps<typeof AtomDatePicker.Input>>(function DatePickerInput({ className, ...props }, ref) {
  return <AtomDatePicker.Input {...props} className={classes("brick-date-picker__input", className)} ref={ref} />;
});
export const DatePickerTextInput = forwardRef<HTMLInputElement, ComponentProps<typeof AtomDatePicker.TextInput>>(function DatePickerTextInput({ className, ...props }, ref) {
  return <AtomDatePicker.TextInput {...props} ref={ref} className={classes("brick-date-picker__text-input", className)} />;
});
export const DatePickerIndicatorGroup = forwardRef<HTMLDivElement, ComponentProps<typeof AtomDatePicker.IndicatorGroup>>(function DatePickerIndicatorGroup({ className, ...props }, ref) {
  return <AtomDatePicker.IndicatorGroup {...props} ref={ref} className={classes("brick-date-picker__indicators", className)} />;
});
export const DatePickerPresetTrigger: typeof AtomDatePicker.PresetTrigger = AtomDatePicker.PresetTrigger;
export type DatePickerRootProviderProps = ComponentProps<typeof AtomDatePicker.RootProvider> & DateInputRecipeProps;
export const DatePickerRootProvider = forwardRef<HTMLDivElement, DatePickerRootProviderProps>(function DatePickerRootProvider(provided, ref) {
  const { size = "lg", variant = "outline", tone = "neutral", shape = "rounded", radius, style, className, ...props } = { ...provided, ...mergeDateFieldRecipe(useContext(Presentation), provided) };
  return <AtomDatePicker.RootProvider {...props} ref={ref} data-tone={tone}
    style={radiusStyle(variant === "underline" ? undefined : radius, "--brick-date-input-radius", style)}
    className={classes("brick-date-picker brick-control-size", className)} {...controlSizeDataAttributes(size)} {...fieldVariantAttributes(variant)} data-shape={radius === undefined ? shape : "rounded"} />;
});
export const DatePickerTrigger = forwardRef<HTMLElement, Omit<ComponentProps<typeof AtomDatePicker.Trigger>, "children"> & { children?: ReactNode }>(function DatePickerTrigger({ className, children, ...props }, ref) {
  const { localeText } = useLocaleContext();
  return <AtomDatePicker.Trigger aria-label={localeText.chooseDate} {...props} className={classes(props.asChild || props.render ? "brick-date-picker__trigger" : "brick-date-input__action", className)} ref={ref}>
    {children ?? <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></svg>}
  </AtomDatePicker.Trigger>;
});
export const DatePickerClearTrigger: ForwardRefExoticComponent<ComponentProps<typeof AtomDatePicker.ClearTrigger> & RefAttributes<HTMLButtonElement>> = forwardRef<HTMLButtonElement, ComponentProps<typeof AtomDatePicker.ClearTrigger>>(function DatePickerClearTrigger({ className, children, ...props }, ref) {
  const { localeText } = useLocaleContext();
  return <AtomDatePicker.ClearTrigger aria-label={localeText.clearDate} {...props} className={classes(props.asChild || props.render ? "brick-date-picker__clear" : "brick-date-input__action", className)} ref={ref}>{children ?? <DateClearIcon />}</AtomDatePicker.ClearTrigger>;
});
export const DatePickerContent = forwardRef<HTMLDivElement, DatePickerContentProps>(function DatePickerContent({ className, appearance, radius, style, sideOffset = 8, ...props }, ref) {
  return <AtomDatePicker.Content {...props} ref={ref} style={radiusStyle(radius, "--brick-popover-radius", style)} sideOffset={sideOffset} data-brick-appearance={appearance} className={classes("brick-popover brick-date-picker__content", className)} />;
});
export const DatePickerCalendar = forwardRef<HTMLDivElement, DatePickerCalendarProps>(function DatePickerCalendar({ className, children, density = "comfortable", size, tone = "accent", ...props }, ref) {
  return <AtomDatePicker.Calendar {...props} ref={ref} className={classes("brick-calendar brick-control-size", className)} data-density={density} data-tone={tone} {...calendarSizeAttributes(size, density)}>
    {children ?? <AtomDatePicker.Context>{({ props: options }) => <CalendarDefaultContent months={options.numOfMonths} />}</AtomDatePicker.Context>}
  </AtomDatePicker.Calendar>;
});
export const DatePickerPortal = AtomDatePicker.Portal;
export const DatePickerContext = AtomDatePicker.Context;
export const DatePickerValueText = AtomDatePicker.ValueText;
export const DatePickerHiddenInput: typeof AtomDatePicker.HiddenInput = AtomDatePicker.HiddenInput;
export const DatePicker: Readonly<{ PropsProvider: typeof DatePickerPropsProvider; Root: typeof DatePickerRoot; RootProvider: typeof DatePickerRootProvider; TextInput: typeof DatePickerTextInput; IndicatorGroup: typeof DatePickerIndicatorGroup; PresetTrigger: typeof DatePickerPresetTrigger; Label: typeof DatePickerLabel; Control: typeof DatePickerControl; Input: typeof DatePickerInput; Trigger: typeof DatePickerTrigger; ClearTrigger: typeof DatePickerClearTrigger; Portal: typeof DatePickerPortal; Content: typeof DatePickerContent; Calendar: typeof DatePickerCalendar; Context: typeof DatePickerContext; ValueText: typeof DatePickerValueText; HiddenInput: typeof DatePickerHiddenInput }> = Object.freeze({ PropsProvider: DatePickerPropsProvider, Root: DatePickerRoot, RootProvider: DatePickerRootProvider, TextInput: DatePickerTextInput, IndicatorGroup: DatePickerIndicatorGroup, PresetTrigger: DatePickerPresetTrigger, Label: DatePickerLabel, Control: DatePickerControl, Input: DatePickerInput, Trigger: DatePickerTrigger, ClearTrigger: DatePickerClearTrigger, Portal: DatePickerPortal, Content: DatePickerContent, Calendar: DatePickerCalendar, Context: DatePickerContext, ValueText: DatePickerValueText, HiddenInput: DatePickerHiddenInput });
