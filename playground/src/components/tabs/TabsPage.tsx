import { Paragraph, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { TabsEvidence } from "./TabsEvidence.js";
import { TabsBasic } from "./examples/TabsBasic.js";
import source from "./examples/TabsBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { tabsScenarios } from "./TabsEvidence.js";
export function TabsPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <TabsEvidence />;
  return (
    <VStack gap={12} data-component-page="tabs">
      <ExamplePreview label="Tabs basic" source={source}>
        <TabsBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="Tabs"
        usage={
          '<Tabs.Root defaultValue="members">\n  <Tabs.List ariaLabel="Project sections">\n    <Tabs.Trigger value="members">Members</Tabs.Trigger>\n  </Tabs.List>\n  <Tabs.Content value="members">Team members</Tabs.Content>\n</Tabs.Root>'
        }
        usageDescription="Use matching values to connect each tab to its related panel."
        examples={examples}
        parts={parts}
        guide={
          <Paragraph tone="secondary">
            Use manual activation for expensive panels. Keep ordinary site
            navigation as links; URL-backed peer panels can use composed
            anchors. Soft remains an alias of subtle. Solid is the inset
            elevated selector; enclosed also borders the panel.
          </Paragraph>
        }
      />
    </VStack>
  );
}
