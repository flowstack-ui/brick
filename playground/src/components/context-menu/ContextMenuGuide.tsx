import { DocsSection } from "../../shared/DocsSection.js";
import { ExampleSource } from "../../shared/ExampleSource.js";

export function ContextMenuGuide() {
  return (
    <>
      <DocsSection
        id="highlight-style"
        title="Highlight style"
        level={3}
        description="Use variant and tone for highlighted commands. Plain removes decorative hover fill without removing keyboard focus."
      >
        <ExampleSource
          label="Context menu highlight style"
          source={`<ContextMenu.Root variant="plain" tone="neutral">
  {/* Target and content */}
</ContextMenu.Root>`}
        />
      </DocsSection>
      <DocsSection
        id="target-composition"
        title="Target composition"
        level={3}
        description="Keep the target's own semantics with asChild and make it keyboard-focusable. Provide visible actions too, as in the basic example; right-click must not be the only way to act."
      >
        <ExampleSource
          label="Context menu target"
          source={`<ContextMenu.Trigger asChild>
  <Surface as="article" aria-label="Quarterly report" tabIndex={0} bordered inset="lg">
    <Text>Quarterly report</Text>
  </Surface>
</ContextMenu.Trigger>`}
        />
      </DocsSection>
    </>
  );
}
