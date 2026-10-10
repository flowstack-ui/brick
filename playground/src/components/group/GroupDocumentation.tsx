import { For, Paragraph, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { groupSection } from "./sections.js";
import { groupProps } from "./props.js";
import { GroupAttached } from "./examples/GroupAttached.js";
import AttachedSource from "./examples/GroupAttached.tsx?raw";
import { GroupMixed } from "./examples/GroupMixed.js";
import MixedSource from "./examples/GroupMixed.tsx?raw";
import { GroupGrow } from "./examples/GroupGrow.js";
import GrowSource from "./examples/GroupGrow.tsx?raw";
import { GroupVertical } from "./examples/GroupVertical.js";
import VerticalSource from "./examples/GroupVertical.tsx?raw";
import { GroupAlignment } from "./examples/GroupAlignment.js";
import AlignmentSource from "./examples/GroupAlignment.tsx?raw";
import { GroupWrap } from "./examples/GroupWrap.js";
import WrapSource from "./examples/GroupWrap.tsx?raw";
import { GroupStacking } from "./examples/GroupStacking.js";
import StackingSource from "./examples/GroupStacking.tsx?raw";
import { GroupSkip } from "./examples/GroupSkip.js";
import SkipSource from "./examples/GroupSkip.tsx?raw";
import { GroupComposition } from "./examples/GroupComposition.js";
import CompositionSource from "./examples/GroupComposition.tsx?raw";
const examples = [
  {
    id: "attached",
    Demo: GroupAttached,
    source: AttachedSource,
    description:
      "Joined controls share one border seam and retain their outside corners.",
  },
  {
    id: "mixed",
    Demo: GroupMixed,
    source: MixedSource,
    description:
      "Match sizes on adjacent controls. Group owns the seam, not their paint or behavior.",
  },
  {
    id: "grow",
    Demo: GroupGrow,
    source: GrowSource,
    description:
      "Distribute the available width across the participating controls.",
  },
  {
    id: "vertical",
    Demo: GroupVertical,
    source: VerticalSource,
    description:
      "The same controls switch from a vertical to horizontal attached group.",
  },
  {
    id: "alignment",
    Demo: GroupAlignment,
    source: AlignmentSource,
    description:
      "Align mixed-height controls and distribute them within an authored width.",
  },
  {
    id: "wrap",
    Demo: GroupWrap,
    source: WrapSource,
    description:
      "Detached groups can wrap. Attachment follows source order, not individual visual lines.",
  },
  {
    id: "stacking",
    Demo: GroupStacking,
    source: StackingSource,
    description:
      "Choose which neighboring border is on top. Focus always takes precedence.",
  },
  {
    id: "skip",
    Demo: GroupSkip,
    source: SkipSource,
    description:
      "Excluded children remain visible without participating in attachment or growth. Custom components must forward Group metadata.",
  },
  {
    id: "composition",
    Demo: GroupComposition,
    source: CompositionSource,
    description:
      "Use asChild to keep grouping and surface presentation on one host.",
  },
];
export function GroupDocumentation() {
  return (
    <VStack gap={8} startSpacing={8}>
      <DocsSection
        {...groupSection("usage")}
        description="Group creates a compact visual cluster without adding selection or keyboard behavior."
      >
        <ExampleSource
          label="Group import"
          source={'import { Group } from "@flowstack-ui/brick";'}
        />
        <ExampleSource
          label="Group usage"
          source={
            '<Group attached>\n  <Button variant="outline">Save</Button>\n  <Button variant="outline">Preview</Button>\n</Group>'
          }
        />
      </DocsSection>
      <DocsSection {...groupSection("examples")}>
        <VStack gap={16}>
          <For each={examples}>
            {({ id, Demo, source, description }) => (
              <DocsSection
                key={id}
                {...groupSection(id)}
                description={description}
              >
                <ExamplePreview label={groupSection(id).title} source={source}>
                  <Demo />
                </ExamplePreview>
              </DocsSection>
            )}
          </For>
        </VStack>
      </DocsSection>
      <DocsSection {...groupSection("guide")}>
        <Paragraph tone="secondary">
          Use Stack for general layout, Toolbar for roving keyboard focus and
          ToggleGroup for pressed selection. Group never supplies a role or
          accessible name; author a named group only when the relationship
          warrants it.
        </Paragraph>
        <Paragraph tone="secondary">
          Attachment targets direct hosts. Wrappers become the visual item. With
          skip or stacking, custom children must forward data attributes and
          style. Fragments are flattened; excluded children stay in place.
          Attached wrapping does not detect visual row boundaries, so detached
          wrapping is usually clearer.
        </Paragraph>
      </DocsSection>
      <DocsSection
        {...groupSection("props")}
        description="These props configure Group. Child sizes, colors and behaviors remain on the individual controls."
      >
        <PropsTable label="Group props" rows={groupProps} />
      </DocsSection>
    </VStack>
  );
}
