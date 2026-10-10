import { For, Tabs, Text, VStack, type TabsSize } from "@flowstack-ui/brick";

export function TabsSizes() {
  return (
    <VStack gap="8">
      <For each={["sm", "md", "lg"] as TabsSize[]}>
        {(size) => (
          <Tabs.Root key={size} defaultValue="members" size={size}>
            <Tabs.List ariaLabel={size}>
              <Tabs.Trigger value="members">{size}</Tabs.Trigger>
              <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
              <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.ContentGroup>
              <Tabs.Content value="members" spacing="adjacent">
                <Text>Manage the people on your team.</Text>
              </Tabs.Content>
              <Tabs.Content value="projects" spacing="adjacent">
                <Text>Explore your active projects.</Text>
              </Tabs.Content>
              <Tabs.Content value="settings" spacing="adjacent">
                <Text>Update your project preferences.</Text>
              </Tabs.Content>
            </Tabs.ContentGroup>
          </Tabs.Root>
        )}
      </For>
    </VStack>
  );
}
