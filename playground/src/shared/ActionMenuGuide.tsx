import { Code, Paragraph } from "@flowstack-ui/brick";

export function ActionMenuGuide() {
  return (
    <>
      <Paragraph tone="secondary">
        Use DropdownMenu for visible-button commands, ContextMenu for
        supplemental contextual commands and Menubar for persistent application
        command categories. Use NavigationMenu for site navigation and Select
        for a form value.
      </Paragraph>
      <Paragraph tone="secondary">
        Choose size, variant and tone before local styling. Content and
        SubContent own panel inset; itemInset removes only inline row padding.
        Use leadingSpace="reserve" to align mixed icon and choice rows. Root
        supplies context and is not a popup styling host.
      </Paragraph>
      <Paragraph tone="secondary">
        Root tone chooses the highlight palette. Set tone on an individual Item
        when its resting text also needs semantic color. Pointer opening focuses
        the popup without selecting a row; keyboard opening enters its first or
        last command.
      </Paragraph>
      <Paragraph tone="secondary">
        The <Code>plain</Code> variant removes decorative pointer fill, not
        keyboard focus. A selected checkbox or radio remains distinct from the
        currently highlighted command. Shortcut text is a hint; application
        hotkeys are not registered automatically.
      </Paragraph>
      <Paragraph tone="secondary">
        Keep one interactive host per command. Compose a real Link with asChild
        for destinations. Important contextual actions need a visible
        alternative. Preserve Atom positioning and dismissal; do not add
        document listeners or duplicate menu behavior in a wrapper.
      </Paragraph>
      <Paragraph tone="secondary">
        A portal outside a local Appearance boundary needs that boundary on its
        painted content or a container inside the scope. Test both appearance
        modes when supplying custom foreground/background tokens.
      </Paragraph>
    </>
  );
}
