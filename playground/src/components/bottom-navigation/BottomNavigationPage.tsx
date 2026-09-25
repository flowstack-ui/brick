import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { BottomNavigationEvidence } from "./BottomNavigationEvidence.js";
import { BottomNavigationBasic } from "./examples/BottomNavigationBasic.js";
import source from "./examples/BottomNavigationBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { bottomNavigationScenarios } from "./BottomNavigationEvidence.js";
export function BottomNavigationPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <BottomNavigationEvidence />;
  return (
    <VStack gap={12} data-component-page="bottom-navigation">
      <ExamplePreview label="Bottom Navigation basic" source={source}>
        <BottomNavigationBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="BottomNavigation"
        usage={
          '<BottomNavigation.Root aria-label="Primary destinations">\n  <BottomNavigation.Item href="/home" value="home">\n    <BottomNavigation.Label>Home</BottomNavigation.Label>\n  </BottomNavigation.Item>\n</BottomNavigation.Root>'
        }
        usageDescription="Use three to five stable destinations. Keep links for routes, buttons for view changes, and labels accessible in every presentation."
        examples={examples}
        parts={parts}
      />
    </VStack>
  );
}
