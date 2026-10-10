import {
  Tabs,
  Text,
  Button,
  HStack,
  VStack,
  useTabs,
} from "@flowstack-ui/brick";

export function TabsController() {
  const tabs = useTabs({ defaultValue: "members" });
  return (
    <VStack gap="4">
      <Tabs.RootProvider value={tabs}>
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
        <Tabs.Context>
          {(state) => <Text tone="secondary">Selected: {state.value}</Text>}
        </Tabs.Context>
      </Tabs.RootProvider>
      <HStack>
        <Button variant="outline" onClick={() => tabs.setValue("projects")}>
          Open projects
        </Button>
      </HStack>
    </VStack>
  );
}
