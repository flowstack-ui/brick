import { useState } from "react";
import { Button, Calendar, For, HStack, LocaleProvider, Text, VStack, parseDate, type DateValue } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";
const referenceDate = parseDate("2026-09-05");
export const calendarScenarios = [
  { id: "calendar.density", number: 1, title: "Density", description: "Two grid densities with stable square targets and deterministic today." },
  { id: "calendar.selection", number: 2, title: "Selection and constraints", description: "Range, multiple selection and unavailable days share the same date engine." },
  { id: "calendar.locale", number: 3, title: "Locale and direction", description: "Localized digits, right-to-left navigation and multiple month grids." },
  { id: "calendar.sizes", number: 4, title: "Sizes", description: "Seven coordinated cell and text sizes; density remains a supported shorthand." },
  { id: "calendar.views", number: 5, title: "Views and week numbers", description: "Month/year controls, fixed weeks and optional week-number columns." },
  { id: "calendar.controlled", number: 6, title: "Controlled date", description: "Selection can be reset outside the calendar." },
  { id: "calendar.content", number: 7, title: "Custom days and outside dates", description: "Public day rendering and outside-day visibility preserve the semantic grid." },
  { id: "calendar.states", number: 8, title: "States and bounds", description: "Disabled, read-only and bounded selection are independently visible." },
] as const;
function ControlledCalendar() {
  const [value, setValue] = useState<DateValue | null>(referenceDate);
  return <VStack gap="3"><Calendar.Root referenceDate={referenceDate} value={value} onValueChange={setValue} aria-label="Controlled review date" />
    <Text role="status" variant="body-sm">{value?.toString() ?? "No review date"}</Text><Button variant="outline" onClick={() => setValue(referenceDate)}>Reset calendar</Button></VStack>;
}
export function CalendarEvidence() { return <VStack gap="6" data-component-page="calendar">
  <Scenario {...calendarScenarios[0]}><HStack align="start" gap="4" wrap><For each={["comfortable", "compact"] as const}>{density => <Specimen key={density} label={density}><Calendar.Root data-testid={`calendar-${density}`} referenceDate={referenceDate} density={density} defaultValue={referenceDate} aria-label={`${density} calendar`} /></Specimen>}</For></HStack></Scenario>
  <Scenario {...calendarScenarios[1]}><HStack align="start" gap="4" wrap><Specimen label="Range"><Calendar.Root referenceDate={referenceDate} selectionMode="range" defaultValue={{ start: referenceDate, end: referenceDate.add({ days: 3 }) }} aria-label="Travel dates" isDateUnavailable={date => date.day === 12} /></Specimen><Specimen label="Multiple"><Calendar.Root referenceDate={referenceDate} selectionMode="multiple" defaultValue={[referenceDate, referenceDate.add({ days: 2 })]} aria-label="Meeting days" /></Specimen></HStack></Scenario>
  <Scenario {...calendarScenarios[2]}><Specimen label="Arabic months"><LocaleProvider locale="ar-EG"><Calendar.Root referenceDate={referenceDate} numOfMonths={2} density="compact" aria-label="التاريخ" /></LocaleProvider></Specimen></Scenario>
  <Scenario {...calendarScenarios[3]}><VStack gap="4"><For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const}>{size => <Specimen key={size} label={size}><Calendar.Root size={size} referenceDate={referenceDate} defaultValue={referenceDate} aria-label={`${size} calendar`} /></Specimen>}</For></VStack></Scenario>
  <Scenario {...calendarScenarios[4]}><VStack gap="4"><Specimen label="Week numbers"><Calendar.Root referenceDate={referenceDate} showWeekNumbers fixedWeeks aria-label="Numbered weeks">
    <Calendar.Header><Calendar.PrevTrigger /><Calendar.MonthSelect /><Calendar.YearSelect /><Calendar.NextTrigger /></Calendar.Header><Calendar.Grid />
  </Calendar.Root></Specimen><For each={["month", "year"] as const}>{view => <Specimen key={view} label={`${view} view`}><Calendar.Root referenceDate={referenceDate} defaultView={view} aria-label={`${view} selection`} /></Specimen>}</For></VStack></Scenario>
  <Scenario {...calendarScenarios[5]}><Specimen label="Controlled"><ControlledCalendar /></Specimen></Scenario>
  <Scenario {...calendarScenarios[6]}><Specimen label="No outside dates"><Calendar.Root referenceDate={referenceDate} aria-label="Custom days">
    <Calendar.Header><Calendar.PrevTrigger /><Calendar.ViewTrigger /><Calendar.NextTrigger /></Calendar.Header><Calendar.Grid hideOutsideDays renderDay={date => <Text as="span" variant="body-sm" weight={date.day === 15 ? "bold" : "regular"}>{date.day}</Text>} />
  </Calendar.Root></Specimen></Scenario>
  <Scenario {...calendarScenarios[7]}><VStack gap="4"><For each={["disabled", "readOnly", "bounded"] as const}>{state => <Specimen key={state} label={state}><Calendar.Root referenceDate={referenceDate} defaultValue={referenceDate} disabled={state === "disabled"} readOnly={state === "readOnly"} min={parseDate("2026-09-01")} max={parseDate("2026-09-30")} aria-label={`${state} calendar`} /></Specimen>}</For>
    <Specimen label="Two meeting dates maximum"><Calendar.Root referenceDate={referenceDate} selectionMode="multiple" maxSelectedDates={2} defaultValue={[referenceDate]} aria-label="Limited meetings" /></Specimen>
  </VStack></Scenario>
</VStack>; }
