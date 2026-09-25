import { For, Menubar, VStack } from "@flowstack-ui/brick";

export function MenubarRadius() {
  return (
    <VStack gap="4" align="start">
      <For each={["none", "sm", "surface"] as const}>
        {(radius) => (
          <Menubar.Root
            key={radius}
            aria-label={`${radius} radius`}
            radius={radius}
            barVariant="surface"
          >
            <Menubar.Menu value="file">
              <Menubar.Trigger>{radius}</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item value="new">New document</Menubar.Item>
                <Menubar.Item value="save">Save document</Menubar.Item>
              </Menubar.Content>
            </Menubar.Menu>
          </Menubar.Root>
        )}
      </For>
    </VStack>
  );
}
