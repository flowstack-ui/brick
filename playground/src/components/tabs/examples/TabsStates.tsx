import { Tabs, Text, Icon } from "@flowstack-ui/brick";
import { Users } from "lucide-react";
export function TabsStates() {
  return (
    <Tabs.Root defaultValue="members">
      <Tabs.List ariaLabel="Team sections">
        <Tabs.Trigger value="members">
          <Icon size="sm">
            <Users />
          </Icon>
          Members
        </Tabs.Trigger>
        <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
        <Tabs.Trigger value="settings" disabled>
          Settings
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
