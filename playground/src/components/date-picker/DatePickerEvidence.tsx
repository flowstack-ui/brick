import { useState } from "react";
import { Button, Calendar, DatePicker, Dialog, For, HStack, LocaleProvider, Text, VStack, parseDate, type DateValue } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";
const referenceDate = parseDate("2026-09-05");
export const datePickerScenarios = [
  { id: "date-picker.single", number: 1, title: "Date entry and popup", description: "One shared value with calendar selection, clear and focus return." },
  { id: "date-picker.range", number: 2, title: "Date range", description: "Two months, named endpoints and selection through a complete range." },
  { id: "date-picker.multiple", number: 3, title: "Multiple and locale", description: "Localized display with repeated canonical form values." },
  { id: "date-picker.nested", number: 4, title: "Nested overlay", description: "Only the topmost date popup handles its dismissal." },
  { id: "date-picker.controlled", number: 5, title: "Controlled selection", description: "Application-owned value and opening, with an external reset." },
  { id: "date-picker.constraints", number: 6, title: "Availability and states", description: "September delivery window, unavailable Sundays and independent control states." },
  { id: "date-picker.custom", number: 7, title: "Custom trigger and views", description: "Button composition with month and year navigation inside the calendar." },
] as const;
function ControlledPicker() {
  const [value, setValue] = useState<DateValue | null>(referenceDate);
  const [open, setOpen] = useState(false);
  return <VStack gap="3"><DatePicker.Root referenceDate={referenceDate} value={value} onValueChange={setValue} open={open} onOpenChange={setOpen}>
    <DatePicker.Label>Appointment</DatePicker.Label><DatePicker.Control><DatePicker.Input /><DatePicker.ClearTrigger /><DatePicker.Trigger aria-label="Choose appointment" /></DatePicker.Control>
    <DatePicker.Portal><DatePicker.Content aria-label="Appointment calendar"><DatePicker.Calendar /></DatePicker.Content></DatePicker.Portal>
  </DatePicker.Root><Text role="status" variant="body-sm">{value?.toString() ?? "No appointment selected"}</Text>
    <HStack gap="2" wrap><Button variant="outline" onClick={() => setValue(referenceDate)}>Reset appointment</Button><Button variant="ghost" onClick={() => setOpen(true)}>Open appointment calendar</Button></HStack>
  </VStack>;
}
function SinglePicker({ variant = "outline" }: { variant?: "outline" | "surface" | "soft" | "underline" } = {}) { return <DatePicker.Root {...(variant === "underline" ? { variant: "underline" as const } : { variant })} referenceDate={referenceDate} name={variant === "outline" ? "delivery" : `delivery-${variant}`}><DatePicker.Label>Delivery date</DatePicker.Label><DatePicker.Control><DatePicker.Input /><DatePicker.ClearTrigger /><DatePicker.Trigger aria-label={variant === "outline" ? "Choose date" : `Choose ${variant} date`} /></DatePicker.Control><DatePicker.Portal><DatePicker.Content aria-label={variant === "outline" ? "Delivery calendar" : `${variant} delivery calendar`}><DatePicker.Calendar /></DatePicker.Content></DatePicker.Portal></DatePicker.Root>; }
export function DatePickerEvidence() { return <VStack gap="6" data-component-page="date-picker">
  <Scenario {...datePickerScenarios[0]}><VStack gap="4"><For each={["outline", "surface", "soft", "underline"] as const}>{variant => <Specimen key={variant} label={variant}><SinglePicker variant={variant} /></Specimen>}</For></VStack></Scenario>
  <Scenario {...datePickerScenarios[1]}><Specimen label="Travel"><DatePicker.Root referenceDate={referenceDate} selectionMode="range" numOfMonths={2} name="travel"><DatePicker.Label>Travel dates</DatePicker.Label><DatePicker.Control><DatePicker.Input /><DatePicker.Trigger aria-label="Choose travel dates" /></DatePicker.Control><DatePicker.Portal><DatePicker.Content aria-label="Travel calendar"><DatePicker.Calendar density="compact" /></DatePicker.Content></DatePicker.Portal></DatePicker.Root></Specimen></Scenario>
  <Scenario {...datePickerScenarios[2]}><Specimen label="French meeting dates"><LocaleProvider locale="fr-FR" localeText={{ chooseDate: "Choisir les dates" }}><DatePicker.Root referenceDate={referenceDate} selectionMode="multiple" defaultValue={[referenceDate]} name="meetings"><DatePicker.Label>Réunions</DatePicker.Label><DatePicker.Control><DatePicker.ValueText /><DatePicker.Trigger /></DatePicker.Control><DatePicker.HiddenInput /><DatePicker.Portal><DatePicker.Content aria-label="Calendrier des réunions"><DatePicker.Calendar><Calendar.Header><Calendar.PrevTrigger aria-label="Précédent" /><Calendar.ViewTrigger /><Calendar.NextTrigger aria-label="Suivant" /></Calendar.Header><Calendar.Grid /></DatePicker.Calendar></DatePicker.Content></DatePicker.Portal></DatePicker.Root></LocaleProvider></Specimen></Scenario>
  <Scenario {...datePickerScenarios[3]}><Specimen label="Dialog"><Dialog.Root><Dialog.Trigger asChild><Button>Schedule in dialog</Button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay /><Dialog.Content><Dialog.Header><Dialog.Title>Schedule delivery</Dialog.Title></Dialog.Header><Dialog.Body><SinglePicker /></Dialog.Body><Dialog.Footer><Dialog.Close asChild><Button variant="outline">Close schedule</Button></Dialog.Close></Dialog.Footer></Dialog.Content></Dialog.Portal></Dialog.Root></Specimen></Scenario>
  <Scenario {...datePickerScenarios[4]}><Specimen label="Controlled"><ControlledPicker /></Specimen></Scenario>
  <Scenario {...datePickerScenarios[5]}><VStack gap="4"><For each={["available", "disabled", "readOnly", "invalid"] as const}>{state => <Specimen key={state} label={state}>
    <DatePicker.Root referenceDate={referenceDate} defaultValue={referenceDate} min={parseDate("2026-09-01")} max={parseDate("2026-09-30")} isDateUnavailable={date => [6, 13, 20, 27].includes(date.day)} disabled={state === "disabled"} readOnly={state === "readOnly"} invalid={state === "invalid"}>
      <DatePicker.Label>{state} delivery</DatePicker.Label><DatePicker.Control><DatePicker.Input /><DatePicker.Trigger aria-label={`Choose ${state} delivery`} /></DatePicker.Control>
      <DatePicker.Portal><DatePicker.Content aria-label={`${state} delivery calendar`}><DatePicker.Calendar /></DatePicker.Content></DatePicker.Portal>
    </DatePicker.Root>
  </Specimen>}</For></VStack></Scenario>
  <Scenario {...datePickerScenarios[6]}><Specimen label="Button trigger"><DatePicker.Root referenceDate={referenceDate} defaultValue={referenceDate}>
    <DatePicker.Trigger asChild aria-label="Choose project date"><Button variant="outline">Choose project date</Button></DatePicker.Trigger>
    <DatePicker.Portal><DatePicker.Content aria-label="Project calendar"><DatePicker.Calendar>
      <Calendar.Header><Calendar.PrevTrigger /><Calendar.MonthSelect /><Calendar.YearSelect /><Calendar.NextTrigger /></Calendar.Header><Calendar.Grid />
    </DatePicker.Calendar></DatePicker.Content></DatePicker.Portal>
  </DatePicker.Root></Specimen></Scenario>
</VStack>; }
