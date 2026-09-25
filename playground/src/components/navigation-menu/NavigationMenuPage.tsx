import { Paragraph, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { NavigationMenuEvidence } from "./NavigationMenuEvidence.js";
import { Basic, basicSource, examples, parts, usage } from "./documentation.js";
export { navigationMenuScenarios } from "./NavigationMenuEvidence.js";
export function NavigationMenuPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <NavigationMenuEvidence />;
  return (
    <VStack gap={12} data-component-page="navigation-menu">
      <ExamplePreview label="NavigationMenu basic" source={basicSource}>
        <Basic />
      </ExamplePreview>
      <OwnerDocumentation
        name="NavigationMenu"
        usage={usage}
        examples={examples}
        parts={parts}
        guide={
          <VStack gap="3">
            <Paragraph tone="secondary">
              NavigationMenu is site navigation: links navigate, triggers
              disclose. Use Menu or Menubar for commands, and NavList for an
              always-visible list of destinations.
            </Paragraph>
          </VStack>
        }
        usageDescription="Use native links and disclosure buttons for navigation, not menuitem roles. The shared viewport is optional; application code owns routing and narrow-screen alternatives."
      />
    </VStack>
  );
}
