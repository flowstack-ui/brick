import { Tabs, Text, VStack } from "@flowstack-ui/brick";

export function TabsAlignment() {
  return (
    <VStack gap="8">
      <Tabs.Root defaultValue="members" fullWidth variant="subtle">
        <Tabs.List ariaLabel="Project sections">
          <Tabs.Trigger value="members">Members</Tabs.Trigger>
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
      <Tabs.Root defaultValue="members">
        <Tabs.List ariaLabel="Project sections" justify="end">
          <Tabs.Trigger value="members">Members</Tabs.Trigger>
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
    </VStack>
  );
}
