import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { FormEvidence } from "./FormEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { formScenarios } from "./FormEvidence.js";
export function FormPage() {
const preview = usePreviewContext();
if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <FormEvidence />;
return <VStack gap={12} data-component-page="form"><ExamplePreview label="Form basic" source={basicSource}><Basic /></ExamplePreview><OwnerDocumentation name="Form" usage={"<Form><Field.Root>…</Field.Root><Button type=\"submit\">Save</Button></Form>"} examples={examples} parts={parts} /></VStack>;
}
