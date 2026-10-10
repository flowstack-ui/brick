import { Tabs, Tooltip } from "@flowstack-ui/brick";
export function TooltipTabs() {
  return (
    <Tabs.Root defaultValue="members">
      <Tabs.List ariaLabel="Workspace sections">
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Tabs.Trigger value="members">Members</Tabs.Trigger>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content>Manage workspace members</Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content>Browse shared projects</Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="members">Your workspace members</Tabs.Content>
      <Tabs.Content value="projects">Your shared projects</Tabs.Content>
    </Tabs.Root>
  );
}
