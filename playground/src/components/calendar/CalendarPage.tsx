import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { CalendarEvidence } from "./CalendarEvidence.js";
import { CalendarBasic } from "./examples/CalendarBasic.js";
import source from "./examples/CalendarBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { calendarScenarios } from "./CalendarEvidence.js";
export function CalendarPage() {
 const preview = usePreviewContext();
 if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <CalendarEvidence />;
 return <VStack gap={12} data-component-page="calendar"><ExamplePreview label="Calendar basic" source={source}><CalendarBasic /></ExamplePreview><OwnerDocumentation name="Calendar" usage={'<Calendar.Root referenceDate={referenceDate} aria-label="Review date" />'} usageDescription="Supply a stable reference date shared by server and client." examples={examples} parts={parts} /></VStack>;
}
