import { Frame, NavList } from "@flowstack-ui/brick";

export function NavListGroups() {
  return (
    <Frame maxInlineSize="20rem">
      <NavList.Root aria-label="Grouped settings" density="compact" gap="6">
        <NavList.Section>
          <NavList.SectionLabel>Account</NavList.SectionLabel>
          <NavList.SectionContent indent="none">
            <NavList.List>
              <NavList.Item>
                <NavList.Link active href="#groups">
                  Profile
                </NavList.Link>
              </NavList.Item>
              <NavList.Item>
                <NavList.Link href="#usage">Security</NavList.Link>
              </NavList.Item>
            </NavList.List>
          </NavList.SectionContent>
        </NavList.Section>
        <NavList.Section gap="1">
          <NavList.SectionLabel>Workspace</NavList.SectionLabel>
          <NavList.SectionContent indent="none">
            <NavList.List>
              <NavList.Item>
                <NavList.Link href="#content">Members</NavList.Link>
              </NavList.Item>
            </NavList.List>
          </NavList.SectionContent>
        </NavList.Section>
      </NavList.Root>
    </Frame>
  );
}
