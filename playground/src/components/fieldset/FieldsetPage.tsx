import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { FieldsetEvidence } from "./FieldsetEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { fieldsetScenarios } from "./FieldsetEvidence.js";
export function FieldsetPage() {
const preview = usePreviewContext();
if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <FieldsetEvidence />;
return <VStack gap={12} data-component-page="fieldset"><ExamplePreview label="Fieldset basic" source={basicSource}><Basic /></ExamplePreview><OwnerDocumentation name="Fieldset" usage={"<Fieldset.Root>…</Fieldset.Root>"} examples={examples} parts={parts} /></VStack>;
}
