import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import { GroupBasic } from "./examples/GroupBasic.js";
import source from "./examples/GroupBasic.tsx?raw";
import { GroupDocumentation } from "./GroupDocumentation.js";
import { GroupEvidence, groupScenarios } from "./GroupEvidence.js";
export { groupScenarios } from "./GroupEvidence.js";
export function GroupPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <GroupEvidence />;
  return (
    <VStack data-component-page="group" gap={6}>
      <Scenario {...groupScenarios[0]} hideHeading>
        <ExamplePreview label="Group" source={source}>
          <GroupBasic />
        </ExamplePreview>
      </Scenario>
      <GroupDocumentation />
    </VStack>
  );
}
