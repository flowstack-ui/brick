import { VStack } from "@flowstack-ui/brick";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import {
  examples,
  parts,
  ToggleTipBasic,
  ToggleTipBasicSource,
} from "./documentation.js";
export const toggleTipScenarios = [
  {
    id: "toggle-tip.basic",
    number: 1,
    title: "Basic",
    description: "Compact click-open help.",
  },
];
export function ToggleTipPage() {
  const preview = usePreviewContext();
  if (preview || new URLSearchParams(window.location.search).get("qualification") === "1") {
    return (
      <Scenario {...toggleTipScenarios[0]}>
        <ToggleTipBasic />
      </Scenario>
    );
  }
  return (
    <VStack gap={12} data-component-page="toggle-tip">
      <ExamplePreview label="Toggle Tip basic" source={ToggleTipBasicSource}>
        <ToggleTipBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="ToggleTip"
        usage={ToggleTipBasicSource}
        usageDescription="Use ToggleTip for optional click-open help. Body owns padding and scrolling. Give Content a Title or accessible label and keep essential instructions visible. Use Popover for larger forms."
        examples={examples}
        parts={parts}
      />
    </VStack>
  );
}
