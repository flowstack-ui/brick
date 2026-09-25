import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ActionBarEvidence } from "./ActionBarEvidence.js";
import { ActionBarBasic } from "./examples/ActionBarBasic.js";
import source from "./examples/ActionBarBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { actionBarScenarios } from "./ActionBarEvidence.js";
export function ActionBarPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <ActionBarEvidence />;
  return (
    <VStack gap={12} data-component-page="action-bar">
      <ExamplePreview label="Action Bar basic" source={source}>
        <ActionBarBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="ActionBar"
        usageDescription="Display temporary actions for selected items. The application owns selection and what each action does."
        usage={
          '<ActionBar.Root open={open} onOpenChange={setOpen}>\n  <ActionBar.Portal>\n    <ActionBar.Positioner>\n      <ActionBar.Content aria-label="Selected items">\n        <Text>2 selected</Text>\n        <ActionBar.Separator />\n        <Button size="sm">Archive</Button>\n      </ActionBar.Content>\n    </ActionBar.Positioner>\n  </ActionBar.Portal>\n</ActionBar.Root>'
        }
        examples={examples}
        parts={parts}
      />
    </VStack>
  );
}
