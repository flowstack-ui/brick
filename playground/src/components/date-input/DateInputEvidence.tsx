import { useState } from "react";
import { Button, DateInput, For, Form, HStack, Input, LocaleProvider, Text, VStack, parseDate, parseZonedDateTime, type DateValue } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";
const referenceDate = parseDate("2026-09-05");
export const dateInputScenarios = [
  { id: "date-input.sizes", number: 1, title: "Shared sizes", description: "Seven control heights with coordinated type; touch-capable devices retain a readable editing floor." },
  { id: "date-input.recipes", number: 2, title: "Recipes and states", description: "Transparent outline, soft surface, underline and explicit unavailable states." },
  { id: "date-input.forms", number: 3, title: "Forms and date-time", description: "Canonical serialization, required entry and uncontrolled reset." },
  { id: "date-input.locale", number: 4, title: "Localized range", description: "Locale-ordered endpoints remain individually named." },
  { id: "date-input.granularity", number: 5, title: "Granularity", description: "Day, hour, minute and second precision use the same date-time value." },
  { id: "date-input.format", number: 6, title: "Display options", description: "Leading zeros, hour cycles and time-zone visibility without changing canonical values." },
  { id: "date-input.controlled", number: 7, title: "Controlled and clear", description: "A controlled date with a non-submitting clear action and external reset." },
  { id: "date-input.constraints", number: 8, title: "Constraints and responsive shape", description: "Explicit bounds, unavailable dates and responsive density use public props." },
] as const;
const appointment = parseZonedDateTime("2026-09-05T14:30:45[America/New_York]");
function ControlledDate() {
  const [value, setValue] = useState<DateValue | null>(referenceDate);
  return <VStack gap="3"><DateInput.Root referenceDate={referenceDate} value={value} onValueChange={setValue}>
    <DateInput.Label>Review date</DateInput.Label><DateInput.Control><DateInput.SegmentGroup><DateInput.Segments /></DateInput.SegmentGroup><DateInput.ClearTrigger /></DateInput.Control>
  </DateInput.Root><Text role="status" variant="body-sm">{value?.toString() ?? "No review date"}</Text><Button variant="outline" onClick={() => setValue(referenceDate)}>Reset review date</Button></VStack>;
}
export function DateInputEvidence() { return <VStack gap="6" data-component-page="date-input">
  <Scenario {...dateInputScenarios[0]}><VStack gap="3" data-testid="date-sizes"><For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const}>{size => <Specimen key={size} label={size}><HStack gap="3" wrap><DateInput.Root size={size} referenceDate={referenceDate} defaultValue={referenceDate} aria-label={`${size} date`} /><Input size={size} fullWidth={false} aria-label={`${size} comparison`} placeholder="Text" /><Button size={size}>Action</Button></HStack></Specimen>}</For></VStack></Scenario>
  <Scenario {...dateInputScenarios[1]}><VStack gap="3"><For each={["outline", "soft", "underline", "surface"] as const}>{variant => <Specimen key={variant} label={variant}><DateInput.Root {...(variant === "underline" ? { variant: "underline" as const } : { variant })} referenceDate={referenceDate} aria-label={`${variant} date`} /></Specimen>}</For><DateInput.Root referenceDate={referenceDate} disabled aria-label="Disabled date" /><DateInput.Root referenceDate={referenceDate} readOnly defaultValue={referenceDate} aria-label="Read-only date" /><DateInput.Root referenceDate={referenceDate} invalid defaultValue={referenceDate} aria-label="Invalid date" /></VStack></Scenario>
  <Scenario {...dateInputScenarios[2]}><Specimen label="Appointment"><Form><VStack gap="3"><DateInput.Root referenceDate={referenceDate} required name="appointment" aria-label="Appointment" /><DateInput.Root referenceDate={referenceDate} defaultValue={parseZonedDateTime("2026-09-05T14:30[America/New_York]")} granularity="minute" name="zoned" aria-label="Zoned appointment" /><HStack gap="3"><Button type="submit">Validate dates</Button><Button type="reset" variant="outline">Reset dates</Button></HStack></VStack></Form></Specimen></Scenario>
  <Scenario {...dateInputScenarios[3]}><Specimen label="French range"><LocaleProvider locale="fr-FR" localeText={{ startDate: "Début", endDate: "Fin" }}><DateInput.Root referenceDate={referenceDate} selectionMode="range" defaultValue={{ start: referenceDate, end: referenceDate.add({ days: 3 }) }} /></LocaleProvider></Specimen></Scenario>
  <Scenario {...dateInputScenarios[4]}><VStack gap="4"><For each={["day", "hour", "minute", "second"] as const}>{granularity => <Specimen key={granularity} label={granularity}><DateInput.Root referenceDate={referenceDate} defaultValue={appointment} granularity={granularity} aria-label={`${granularity} precision`} /></Specimen>}</For></VStack></Scenario>
  <Scenario {...dateInputScenarios[5]}><VStack gap="4">
    <Specimen label="Leading zeros"><DateInput.Root referenceDate={referenceDate} defaultValue={referenceDate} shouldForceLeadingZeros aria-label="Leading zeros" /></Specimen>
    <Specimen label="24-hour clock"><DateInput.Root referenceDate={referenceDate} defaultValue={appointment} granularity="minute" hourCycle={24} aria-label="24-hour appointment" /></Specimen>
    <Specimen label="Hidden time zone"><DateInput.Root referenceDate={referenceDate} defaultValue={appointment} granularity="minute" hideTimeZone aria-label="Hidden-zone appointment" /></Specimen>
    <Specimen label="Arabic calendar locale"><LocaleProvider locale="ar-EG"><DateInput.Root referenceDate={referenceDate} defaultValue={referenceDate} aria-label="تاريخ المراجعة" /></LocaleProvider></Specimen>
  </VStack></Scenario>
  <Scenario {...dateInputScenarios[6]}><Specimen label="Controlled"><ControlledDate /></Specimen></Scenario>
  <Scenario {...dateInputScenarios[7]}><VStack gap="4"><Specimen label="September window"><DateInput.Root referenceDate={referenceDate} defaultValue={referenceDate} min={parseDate("2026-09-01")} max={parseDate("2026-09-30")} isDateUnavailable={date => date.day === 12} aria-label="Bounded date" /></Specimen>
    <For each={["sharp", "rounded", "pill"] as const}>{shape => <Specimen key={shape} label={shape}><DateInput.Root referenceDate={referenceDate} defaultValue={referenceDate} shape={shape} size={{ initial: "md", lg: "xl" }} aria-label={`${shape} responsive date`} /></Specimen>}</For>
  </VStack></Scenario>
</VStack>; }
