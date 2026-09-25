import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { FieldEvidence } from "./FieldEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { fieldScenarios } from "./FieldEvidence.js";
export function FieldPage() {
const preview = usePreviewContext();
if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <FieldEvidence />;
return <VStack gap={12} data-component-page="field"><ExamplePreview label="Field basic" source={basicSource}><Basic /></ExamplePreview><OwnerDocumentation name="Field" usage={"<Field.Root>…</Field.Root>"} examples={examples} parts={parts} /></VStack>;
}
