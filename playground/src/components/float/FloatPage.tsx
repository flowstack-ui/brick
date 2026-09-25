import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import { FloatBasic } from "./examples/FloatBasic.js";
import source from "./examples/FloatBasic.tsx?raw";
import { FloatDocumentation } from "./FloatDocumentation.js";
import { FloatEvidence } from "./FloatEvidence.js";
export const floatScenarios = [{ id: "float.basic", number: 1, title: "Float", description: "Edge attachment without allocating layout space." }];
export function FloatPage() {
 const preview = usePreviewContext();
 if (preview || new URLSearchParams(window.location.search).get("qualification") === "1") return <FloatEvidence />;
 return <VStack data-component-page="float" gap={6}><Scenario {...floatScenarios[0]} hideHeading><ExamplePreview label="Float" source={source}><FloatBasic /></ExamplePreview></Scenario><FloatDocumentation /></VStack>;
}
