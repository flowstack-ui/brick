import { DocsSection } from "../../shared/DocsSection.js";
import { ExampleSource } from "../../shared/ExampleSource.js";

export function DropdownMenuGuide() {
  return (
    <>
      <DocsSection
        id="highlight-style"
        title="Highlight style"
        level={3}
        description="Use variant and tone to change highlighted items. The plain variant removes the hover fill while preserving keyboard focus."
      >
        <ExampleSource
          label="Menu highlight style"
          source={`<DropdownMenu.Root variant="plain" tone="neutral">
  {/* Trigger and content */}
</DropdownMenu.Root>`}
        />
      </DocsSection>
      <DocsSection
        id="trigger-composition"
        title="Trigger composition"
        level={3}
        description="Use asChild with Button for a finished command trigger. For an avatar, place it directly inside the named Trigger; do not add a second button."
      >
        <ExampleSource
          label="Avatar menu trigger"
          source={`<DropdownMenu.Trigger aria-label="Account actions">
  <Avatar alt="Jordan Lee" fallback="JL" size="sm" />
</DropdownMenu.Trigger>`}
        />
      </DocsSection>
    </>
  );
}
