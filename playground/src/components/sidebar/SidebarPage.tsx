import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import { SidebarBasic } from "./examples/SidebarBasic.js";
import source from "./examples/SidebarBasic.tsx?raw";
import { SidebarDocumentation } from "./SidebarDocumentation.js";
import { SidebarEvidence, sidebarScenarios } from "./SidebarEvidence.js";
export { sidebarScenarios } from "./SidebarEvidence.js";
export function SidebarPage() {
  const preview = usePreviewContext();
  const qualification =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("qualification") === "1";
  if (preview || qualification) return <SidebarEvidence />;
  return (
    <VStack data-component-page="sidebar" gap="6">
      <Scenario {...sidebarScenarios[0]} hideHeading>
        <ExamplePreview label="Sidebar" source={source}>
          <SidebarBasic />
        </ExamplePreview>
      </Scenario>
      <SidebarDocumentation />
    </VStack>
  );
}
