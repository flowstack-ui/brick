import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { AppBarEvidence } from "./AppBarEvidence.js";
import { AppBarBasic } from "./examples/AppBarBasic.js";
import source from "./examples/AppBarBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { appBarScenarios } from "./AppBarEvidence.js";
export function AppBarPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <AppBarEvidence />;
  return (
    <VStack gap={12} data-component-page="app-bar">
      <ExamplePreview label="AppBar basic" source={source}>
        <AppBarBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="AppBar"
        usage={
          "<AppBar.Root>\n  <AppBar.Toolbar>\n    <AppBar.Start>Brand</AppBar.Start>\n    <AppBar.End>Actions</AppBar.End>\n  </AppBar.Toolbar>\n</AppBar.Root>"
        }
        usageDescription="AppBar owns the top surface and row alignment. Compose navigation, controls and responsive visibility with their dedicated owners."
        examples={examples}
        parts={parts}
      />
    </VStack>
  );
}
