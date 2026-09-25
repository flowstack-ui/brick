import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { DateInputEvidence } from "./DateInputEvidence.js";
import { DateInputBasic } from "./examples/DateInputBasic.js";
import source from "./examples/DateInputBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { dateInputScenarios } from "./DateInputEvidence.js";
export function DateInputPage() {
 const preview = usePreviewContext();
 if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <DateInputEvidence />;
 return <VStack gap={12} data-component-page="date-input"><ExamplePreview label="DateInput basic" source={source}><DateInputBasic /></ExamplePreview><OwnerDocumentation name="DateInput" usage={'<DateInput.Root referenceDate={referenceDate} aria-label="Review date" />'} usageDescription="Supply a stable reference date shared by server and client." examples={examples} parts={parts} /></VStack>;
}
