import { DocsSection } from "../../shared/DocsSection.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
export function MenubarGuide() {
  return (
    <>
      <DocsSection
        id="strip-style"
        title="Strip style"
        level={3}
        description="barVariant styles the strip; triggerVariant styles its hover and open states. Plain removes decorative trigger fill while preserving keyboard focus."
      >
        <ExampleSource
          label="Menubar strip style"
          source={`<Menubar.Root aria-label="Document commands" barVariant="plain" triggerVariant="plain">
  {/* Menu scopes, triggers and content */}
</Menubar.Root>`}
        />
      </DocsSection>
      <DocsSection
        id="popup-style"
        title="Popup style"
        level={3}
        description="variant and tone control popup highlights independently of the strip. Use menuSize when popup rows need a different density from the top-level commands."
      >
        <ExampleSource
          label="Menubar popup style"
          source={`<Menubar.Root aria-label="Document commands" size="lg" menuSize="sm" variant="subtle" tone="accent">
  {/* Menu scopes, triggers and content */}
</Menubar.Root>`}
        />
      </DocsSection>
    </>
  );
}
