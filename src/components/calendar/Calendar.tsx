"use client";

import { forwardRef, type ComponentProps } from "react";
import { Calendar as AtomCalendar, type CalendarRootProps as AtomRootProps } from "@flowstack-ui/atom/calendar";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";
import { type ControlSize, controlSizeDataAttributes } from "../_control-size/ControlSize.js";

export type CalendarDensity = "compact" | "comfortable";
export type CalendarSize = ControlSize;
export type CalendarRootProps = AtomRootProps & { density?: CalendarDensity; size?: CalendarSize };
const classes = (base: string, extra?: string) => [base, extra].filter(Boolean).join(" ");

export function CalendarChevron({ next = false }: { next?: boolean }) {
  return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={next ? "m9 6 6 6-6 6" : "m15 6-6 6 6 6"} /></svg>;
}
export const CalendarHeader = forwardRef<HTMLDivElement, ComponentProps<typeof AtomCalendar.Header>>(function CalendarHeader({ className, ...props }, ref) {
  return <AtomCalendar.Header {...props} className={classes("brick-calendar__header", className)} ref={ref} />;
});
export const CalendarPrevTrigger = forwardRef<HTMLButtonElement, ComponentProps<typeof AtomCalendar.PrevTrigger>>(function CalendarPrevTrigger({ children, className, ...props }, ref) {
  return <AtomCalendar.PrevTrigger {...props} className={classes("brick-calendar__navigation", className)} ref={ref}>{children ?? <CalendarChevron />}</AtomCalendar.PrevTrigger>;
});
export const CalendarNextTrigger = forwardRef<HTMLButtonElement, ComponentProps<typeof AtomCalendar.NextTrigger>>(function CalendarNextTrigger({ children, className, ...props }, ref) {
  return <AtomCalendar.NextTrigger {...props} className={classes("brick-calendar__navigation", className)} ref={ref}>{children ?? <CalendarChevron next />}</AtomCalendar.NextTrigger>;
});
export const CalendarViewTrigger = forwardRef<HTMLButtonElement, ComponentProps<typeof AtomCalendar.ViewTrigger>>(function CalendarViewTrigger({ className, ...props }, ref) {
  return <AtomCalendar.ViewTrigger {...props} className={classes("brick-calendar__view", className)} ref={ref} />;
});
export const CalendarGrid = forwardRef<HTMLTableElement, ComponentProps<typeof AtomCalendar.Grid>>(function CalendarGrid({ className, ...props }, ref) {
  return <AtomCalendar.Grid {...props} className={classes("brick-calendar__grid", className)} ref={ref} />;
});
export const CalendarMonthSelect = forwardRef<HTMLSelectElement, ComponentProps<typeof AtomCalendar.MonthSelect>>(function CalendarMonthSelect({ className, ...props }, ref) {
  return <AtomCalendar.MonthSelect {...props} className={classes("brick-calendar__select", className)} ref={ref} />;
});
export const CalendarYearSelect = forwardRef<HTMLSelectElement, ComponentProps<typeof AtomCalendar.YearSelect>>(function CalendarYearSelect({ className, ...props }, ref) {
  return <AtomCalendar.YearSelect {...props} className={classes("brick-calendar__select", className)} ref={ref} />;
});

/** Shared presentation only; Atom remains the calendar and selection owner. */
export function CalendarDefaultContent({ months = 1 }: { months?: number }) {
  return <><CalendarHeader><CalendarPrevTrigger /><CalendarViewTrigger /><CalendarNextTrigger /></CalendarHeader>
    <div className="brick-calendar__months"><AtomCalendar.Context>{({ view }) => Array.from({ length: view === "day" ? months : 1 }, (_, offset) => <CalendarGrid key={offset} monthOffset={offset} />)}</AtomCalendar.Context></div></>;
}
export const CalendarRoot = forwardRef<HTMLDivElement, CalendarRootProps>(function CalendarRoot({ className, density = "comfortable", size, children, locale, dir, ...props }, ref) {
  const inherited = useLocaleContext();
  return <AtomCalendar.Root {...props} ref={ref} locale={locale ?? inherited.locale} dir={dir ?? inherited.dir}
    className={classes("brick-calendar brick-control-size", className)} data-density={density} {...controlSizeDataAttributes(size ?? (density === "compact" ? "sm" : "md"))}>
    {children ?? <CalendarDefaultContent months={props.numOfMonths} />}
  </AtomCalendar.Root>;
});
export const CalendarContext = AtomCalendar.Context;
export const Calendar = Object.freeze({ Root: CalendarRoot, Header: CalendarHeader, PrevTrigger: CalendarPrevTrigger, NextTrigger: CalendarNextTrigger, ViewTrigger: CalendarViewTrigger, Grid: CalendarGrid, MonthSelect: CalendarMonthSelect, YearSelect: CalendarYearSelect, Context: CalendarContext });
