import { Text, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { SwitchEvidence } from "./SwitchEvidence.js";
import { SwitchBasic } from "./examples/SwitchBasic.js";
import source from "./examples/SwitchBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { switchScenarios } from "./SwitchEvidence.js";

export function SwitchPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) {
    return <SwitchEvidence />;
  }
  return (
    <VStack gap={12} data-component-page="switch">
      <ExamplePreview label="Switch basic" source={source}><SwitchBasic /></ExamplePreview>
      <OwnerDocumentation
        name="Switch"
        usage={`<Switch.Field>\n  <Switch.Control />\n  <Switch.Label>Weekly reports</Switch.Label>\n  <Switch.HiddenInput name="reports" />\n</Switch.Field>`}
        usageDescription="Use Switch.Field for compound composition with one Control and one HiddenInput. Existing Switch.Root remains the standalone button-compatible API with an automatic proxy and explicit Thumb."
        examples={examples}
        parts={parts}
        guide={
          <VStack align="start" gap="3">
            <Text>Switches apply settings immediately. Use one state owner and exactly one native input: Root manages its proxy; Field requires one HiddenInput.</Text>
            <Text>Keep labels and links outside Control. Indicators are decorative. Tone selects paint; invalid communicates validation independently.</Text>
            <Text>FLOWSTACK keeps a boolean callback, Field naming and token-based customization instead of Chakra's details callback, Root naming and universal style props.</Text>
          </VStack>
        }
      />
    </VStack>
  );
}
