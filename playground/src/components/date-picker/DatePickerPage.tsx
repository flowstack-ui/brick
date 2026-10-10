import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { DatePickerEvidence } from "./DatePickerEvidence.js";
import { DatePickerBasic } from "./examples/DatePickerBasic.js";
import source from "./examples/DatePickerBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { datePickerScenarios } from "./DatePickerEvidence.js";
export function DatePickerPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <DatePickerEvidence />;
  return <VStack gap={12} data-component-page="date-picker"><ExamplePreview label="Date picker basic" source={source}><DatePickerBasic /></ExamplePreview>
    <OwnerDocumentation name="DatePicker" usage={'<DatePicker.Root referenceDate={referenceDate} entryMode="text">\n  <DatePicker.Label>Delivery date</DatePicker.Label>\n  <DatePicker.Control>\n    <DatePicker.TextInput />\n    <DatePicker.Trigger />\n  </DatePicker.Control>\n  <DatePicker.Portal>\n    <DatePicker.Content aria-label="Delivery calendar">\n      <DatePicker.Calendar />\n    </DatePicker.Content>\n  </DatePicker.Portal>\n</DatePicker.Root>'}
      usageDescription="Choose segmented entry, strict text entry, or a button-only calendar. Supply a stable reference date for server and client rendering." examples={examples} parts={parts} />
  </VStack>;
}
