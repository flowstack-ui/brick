"use client";

import { forwardRef, type ComponentProps } from "react";
import { Calendar as AtomCalendar, useCalendar as useAtomCalendar, type CalendarRootProps as AtomRootProps } from "@flowstack-ui/atom/calendar";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";
import { type ResponsiveControlSize, controlSizeDataAttributes } from "../_control-size/ControlSize.js";

export type CalendarDensity = "compact" | "comfortable";
export type CalendarSize = ResponsiveControlSize;
export type CalendarTone = "neutral" | "accent" | "contrast";
export type CalendarRecipeProps = { density?: CalendarDensity; size?: CalendarSize; tone?: CalendarTone };
export type CalendarRootProps = AtomRootProps & CalendarRecipeProps;
export { useCalendarContext, type UseCalendarReturn } from "@flowstack-ui/atom/calendar";
export function useCalendar(props: AtomRootProps): ReturnType<typeof useAtomCalendar> {
  const inherited = useLocaleContext();
  return useAtomCalendar({ ...props, locale: props.locale ?? inherited.locale, dir: props.dir ?? inherited.dir });
}
const classes = (base: string, extra?: string) => [base, extra].filter(Boolean).join(" ");
export function calendarSizeAttributes(size: CalendarSize | undefined, density: CalendarDensity) {
  const initial = density === "compact" ? "sm" : "md";
  return controlSizeDataAttributes(typeof size === "object" ? { initial, ...size } : size ?? initial);
}

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
export const CalendarView = AtomCalendar.View;
export const CalendarViewControl = CalendarHeader;
export const CalendarRangeText = forwardRef<HTMLSpanElement, ComponentProps<typeof AtomCalendar.RangeText>>(function CalendarRangeText({ className, ...props }, ref) {
  return <AtomCalendar.RangeText {...props} ref={ref} className={classes("brick-calendar__range-text", className)} />;
});
export const CalendarTable = forwardRef<HTMLTableElement, ComponentProps<typeof AtomCalendar.Table>>(function CalendarTable({ className, ...props }, ref) {
  return <AtomCalendar.Table {...props} ref={ref} className={classes("brick-calendar__grid", className)} />;
});
export const CalendarTableHead = AtomCalendar.TableHead;
export const CalendarTableBody = AtomCalendar.TableBody;
export const CalendarTableRow = AtomCalendar.TableRow;
export const CalendarTableHeader = AtomCalendar.TableHeader;
export const CalendarTableCell = AtomCalendar.TableCell;
export const CalendarTableCellTrigger = AtomCalendar.TableCellTrigger;
export const CalendarDayTable = forwardRef<HTMLTableElement, ComponentProps<typeof AtomCalendar.DayTable>>(function CalendarDayTable({ className, ...props }, ref) {
  return <AtomCalendar.DayTable {...props} ref={ref} className={classes("brick-calendar__grid", className)} />;
});
export const CalendarMonthTable = forwardRef<HTMLTableElement, ComponentProps<typeof AtomCalendar.MonthTable>>(function CalendarMonthTable({ className, ...props }, ref) {
  return <AtomCalendar.MonthTable {...props} ref={ref} className={classes("brick-calendar__grid", className)} />;
});
export const CalendarYearTable = forwardRef<HTMLTableElement, ComponentProps<typeof AtomCalendar.YearTable>>(function CalendarYearTable({ className, ...props }, ref) {
  return <AtomCalendar.YearTable {...props} ref={ref} className={classes("brick-calendar__grid", className)} />;
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
export const CalendarRoot = forwardRef<HTMLDivElement, CalendarRootProps>(function CalendarRoot({ className, density = "comfortable", size, tone = "accent", children, locale, dir, ...props }, ref) {
  const inherited = useLocaleContext();
  return <AtomCalendar.Root {...props} ref={ref} locale={locale ?? inherited.locale} dir={dir ?? inherited.dir}
    className={classes("brick-calendar brick-control-size", className)} data-density={density} data-tone={tone} {...calendarSizeAttributes(size, density)}>
    {children ?? <CalendarDefaultContent months={props.numOfMonths} />}
  </AtomCalendar.Root>;
});
export type CalendarRootProviderProps = ComponentProps<typeof AtomCalendar.RootProvider> & CalendarRecipeProps;
export const CalendarRootProvider = forwardRef<HTMLDivElement, CalendarRootProviderProps>(function CalendarRootProvider({ className, density = "comfortable", size, tone = "accent", children, ...props }, ref) {
  let months = 1;
  const { start, end } = props.value.visibleRange;
  while (start.add({ months }).compare(end) <= 0) months++;
  return <AtomCalendar.RootProvider {...props} ref={ref} className={classes("brick-calendar brick-control-size", className)} data-density={density} data-tone={tone} {...calendarSizeAttributes(size, density)}>{children ?? <CalendarDefaultContent months={months} />}</AtomCalendar.RootProvider>;
});
export const CalendarContext = AtomCalendar.Context;
export const Calendar = Object.freeze({ Root: CalendarRoot, RootProvider: CalendarRootProvider, Header: CalendarHeader, View: CalendarView, ViewControl: CalendarViewControl, RangeText: CalendarRangeText, Table: CalendarTable, TableHead: CalendarTableHead, TableBody: CalendarTableBody, TableRow: CalendarTableRow, TableHeader: CalendarTableHeader, TableCell: CalendarTableCell, TableCellTrigger: CalendarTableCellTrigger, DayTable: CalendarDayTable, MonthTable: CalendarMonthTable, YearTable: CalendarYearTable, PrevTrigger: CalendarPrevTrigger, NextTrigger: CalendarNextTrigger, ViewTrigger: CalendarViewTrigger, Grid: CalendarGrid, MonthSelect: CalendarMonthSelect, YearSelect: CalendarYearSelect, Context: CalendarContext });
