import { Tabs, Input, Text } from "@flowstack-ui/brick";

export function TabsLifecycle() {
  return (
    <Tabs.Root defaultValue="members" lazyMount unmountOnExit={false}>
      <Tabs.List ariaLabel="Project sections">
        <Tabs.Trigger value="members">Members</Tabs.Trigger>
        <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="members" spacing="adjacent">
        <Input
          aria-label="Team name"
          placeholder="This draft survives tab changes"
        />
      </Tabs.Content>
      <Tabs.Content value="projects" spacing="adjacent">
        <Text>Return to Members to see your draft.</Text>
      </Tabs.Content>
      <Tabs.Content value="settings" spacing="adjacent">
        <Text>Retained panels are hidden and inert.</Text>
      </Tabs.Content>
    </Tabs.Root>
  );
}
