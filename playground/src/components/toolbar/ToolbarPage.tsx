import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ToolbarEvidence } from "./ToolbarEvidence.js";
import { ToolbarBasic } from "./examples/ToolbarBasic.js";
import source from "./examples/ToolbarBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { toolbarScenarios } from "./ToolbarEvidence.js";
export function ToolbarPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    new URLSearchParams(window.location.search).get("qualification") === "1"
  )
    return <ToolbarEvidence />;
  return (
    <VStack gap={12} data-component-page="toolbar">
      <ExamplePreview label="Toolbar basic" source={source}>
        <ToolbarBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="Toolbar"
        usage={
          '<Toolbar.Root aria-label="Document tools">\n  <Toolbar.Button>Save</Toolbar.Button>\n  <Toolbar.Separator />\n  <Toolbar.Link href="/help">Help</Toolbar.Link>\n</Toolbar.Root>'
        }
        usageDescription="Group related commands into one keyboard entry point. Use arrow keys to move between controls."
        examples={examples}
        parts={parts}
      />
    </VStack>
  );
}
