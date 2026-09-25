import {
  For,
  Frame,
  HStack,
  Icon,
  IconButton,
  NavList,
  Paragraph,
  ScrollArea,
  Sidebar,
  Surface,
  Text,
  VStack,
  useSidebarContext,
} from "@flowstack-ui/brick";
import { Folder, House, PanelLeft, Settings } from "lucide-react";

function StateContents() {
  const { state } = useSidebarContext();
  const compact = state === "rail";
  return (
    <>
      <Sidebar.Panel aria-label={`${state} navigation`}>
        <Sidebar.Header>
          <Text weight="semibold" aria-label="Workspace">
            {compact ? "W" : "Workspace"}
          </Text>
        </Sidebar.Header>
        <Sidebar.Content inset="none">
          <NavList.Root size="sm" aria-label={`${state} pages`}>
            <NavList.List>
              <For
                each={[
                  { label: "Overview", icon: House, href: "#usage" },
                  { label: "Projects", icon: Folder, href: "#examples" },
                  { label: "Settings", icon: Settings, href: "#props" },
                ]}
              >
                {({ label, icon: ItemIcon, href }) => (
                  <NavList.Item key={label}>
                    <NavList.Link href={href} aria-label={label}>
                      <HStack gap="2">
                        <Icon size="sm">
                          <ItemIcon />
                        </Icon>
                        {!compact && <Text>{label}</Text>}
                      </HStack>
                    </NavList.Link>
                  </NavList.Item>
                )}
              </For>
            </NavList.List>
          </NavList.Root>
        </Sidebar.Content>
      </Sidebar.Panel>
      <Sidebar.Main asChild>
        <Surface level="transparent" inset="md">
          <VStack align="start" gap="3">
            <Sidebar.Trigger asChild>
              <IconButton size="sm" aria-label={`Toggle ${state} sidebar`}>
                <PanelLeft />
              </IconButton>
            </Sidebar.Trigger>
            <Text weight="semibold">{state}</Text>
            <Paragraph tone="secondary" variant="body-sm">
              {state === "expanded"
                ? "Full navigation with icons and labels."
                : compact
                  ? "A compact icon rail keeps navigation available."
                  : "Navigation is hidden. Main uses the available width."}
            </Paragraph>
          </VStack>
        </Surface>
      </Sidebar.Main>
    </>
  );
}

export function SidebarStates() {
  return (
    <ScrollArea.Root orientation="horizontal">
      <ScrollArea.Viewport focusable aria-label="Sidebar example">
        <Frame minInlineSize="34rem">
          <VStack gap="6">
            <For each={["expanded", "rail", "offcanvas"] as const}>
              {(state) => (
                <Surface key={state} level="transparent" bordered>
                  <Sidebar.Root
                    defaultState={state}
                    collapsedState={state === "rail" ? "rail" : "offcanvas"}
                    size="sm"
                  >
                    <StateContents />
                  </Sidebar.Root>
                </Surface>
              )}
            </For>
          </VStack>
        </Frame>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
}
