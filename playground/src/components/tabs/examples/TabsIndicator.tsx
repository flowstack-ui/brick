import { Tabs, Text } from "@flowstack-ui/brick";

export function TabsIndicator() {
  return (
    <Tabs.Root defaultValue="members" variant="plain" tone="neutral">
      <Tabs.List
        ariaLabel="Project sections"
        radius="full"
        triggerRadius="full"
      >
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
  );
}
