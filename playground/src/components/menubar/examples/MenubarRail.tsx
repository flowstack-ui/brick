import { For, Menubar, Paragraph, VStack } from "@flowstack-ui/brick";
export function MenubarRail() {
  return (
    <VStack gap="6">
      <For each={["plain", "surface"] as const}>
        {(barVariant) => (
          <VStack key={barVariant} gap="2" align="start">
            <Paragraph tone="secondary">{barVariant}</Paragraph>
            <Menubar.Root
              aria-label={barVariant + " commands"}
              barVariant={barVariant}
              size="lg"
              menuSize="sm"
            >
              <Menubar.Menu value="file">
                <Menubar.Trigger>File</Menubar.Trigger>
                <Menubar.Content>
                  <Menubar.Item value="new">New file</Menubar.Item>
                  <Menubar.Item value="open">Open file</Menubar.Item>
                </Menubar.Content>
              </Menubar.Menu>
              <Menubar.Menu value="edit">
                <Menubar.Trigger>Edit</Menubar.Trigger>
                <Menubar.Content>
                  <Menubar.Item value="undo">Undo</Menubar.Item>
                </Menubar.Content>
              </Menubar.Menu>
            </Menubar.Root>
          </VStack>
        )}
      </For>
    </VStack>
  );
}
