import { For, Tabs, Text, VStack, type TabsVariant } from "@flowstack-ui/brick";

export function TabsVariants() {
  return (
    <VStack gap="8">
      <For
        each={
          [
            "line",
            "subtle",
            "solid",
            "outline",
            "plain",
            "enclosed",
          ] as TabsVariant[]
        }
      >
        {(variant) => (
          <Tabs.Root key={variant} defaultValue="members" variant={variant}>
            <Tabs.List ariaLabel={variant}>
              <Tabs.Trigger value="members">{variant}</Tabs.Trigger>
              <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
              <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.ContentGroup>
              <Tabs.Content
                value="members"
                spacing={variant === "enclosed" ? "inset" : "adjacent"}
              >
                <Text>Manage the people on your team.</Text>
              </Tabs.Content>
              <Tabs.Content
                value="projects"
                spacing={variant === "enclosed" ? "inset" : "adjacent"}
              >
                <Text>Explore your active projects.</Text>
              </Tabs.Content>
              <Tabs.Content
                value="settings"
                spacing={variant === "enclosed" ? "inset" : "adjacent"}
              >
                <Text>Update your project preferences.</Text>
              </Tabs.Content>
            </Tabs.ContentGroup>
          </Tabs.Root>
        )}
      </For>
    </VStack>
  );
}
