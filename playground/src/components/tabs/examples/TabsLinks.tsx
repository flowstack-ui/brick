import { Tabs, Text } from "@flowstack-ui/brick";

export function TabsLinks() {
  return (
    <Tabs.Root
      defaultValue="members"
      navigate={({ value }) => history.replaceState(null, "", "#tab-" + value)}
    >
      <Tabs.List ariaLabel="URL-backed project sections">
        <Tabs.Trigger value="members" asChild>
          <a href="#tab-members">Members</a>
        </Tabs.Trigger>
        <Tabs.Trigger value="projects" asChild>
          <a href="#tab-projects">Projects</a>
        </Tabs.Trigger>
        <Tabs.Trigger value="settings" disabled asChild>
          <a href="#tab-settings">Settings</a>
        </Tabs.Trigger>
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
