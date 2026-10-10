import { Paragraph, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { CollapsibleEvidence } from "./CollapsibleEvidence.js";
import { collapsibleExamples } from "./documentation.js";
import { collapsibleParts } from "./parts.js";
import { CollapsibleBasic } from "./examples/CollapsibleBasic.js";
import source from "./examples/CollapsibleBasic.tsx?raw";
export { collapsibleScenarios } from "./CollapsibleEvidence.js";

export function CollapsiblePage() {
  const preview = usePreviewContext();
  if (
    preview ||
    new URLSearchParams(window.location.search).get("qualification") === "1"
  )
    return <CollapsibleEvidence />;
  return (
    <VStack gap={12} data-component-page="collapsible">
      <ExamplePreview label="Collapsible basic" source={source}>
        <CollapsibleBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="Collapsible"
        usage={
          "<Collapsible.Root>\n  <Collapsible.Trigger>Details<Collapsible.Indicator /></Collapsible.Trigger>\n  <Collapsible.Content>\n    <Collapsible.ContentInner>Content</Collapsible.ContentInner>\n  </Collapsible.Content>\n</Collapsible.Root>"
        }
        examples={collapsibleExamples}
        parts={collapsibleParts}
      />
      <DocsSection
        id="guide"
        title="Guide"
        level={2}
        description="Separate behavior, visibility and visual ownership."
      >
        <Paragraph tone="secondary">
          Root defaults to lazy mounting and unmounting after exit. Set
          unmountOnExit=false to preserve a form value; set lazyMount=false as
          well to render retained content before its first opening. keepMounted
          remains a deprecated compatibility override, not a second mounting
          system.
        </Paragraph>
        <Paragraph tone="secondary">
          A partial preview stays mounted but is entirely inert and hidden from
          assistive technology while collapsed. Put the trigger and any summary
          that must remain readable outside Content. Do not put required links
          or actions in the closed preview.
        </Paragraph>
        <Paragraph tone="secondary">
          Content owns clipping and measured motion. ContentInner owns padding.
          Root unstyled removes the containing recipe only; Trigger unstyled
          delegates trigger visuals explicitly. Never stack two finished recipes
          on the same trigger without unstyled.
        </Paragraph>
        <Paragraph tone="secondary">
          Use onOpenChange for requested state changes and onExitComplete for a
          completed exit. Reopening cancels exit completion. React 19.2 or newer
          can pause hidden effects with Activity; earlier React versions use
          the display-none fallback and retain state without pausing effects.
          IDs and visibility are rendered without browser breakpoint detection.
        </Paragraph>
      </DocsSection>
    </VStack>
  );
}
