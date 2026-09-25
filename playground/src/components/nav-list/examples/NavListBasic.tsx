import { Frame, NavList } from "@flowstack-ui/brick";

export function NavListBasic() {
  return (
    <Frame maxInlineSize="20rem">
      <NavList.Root aria-label="Workspace">
        <NavList.List>
          <NavList.Item>
            <NavList.Link href="#overview" active>
              Overview
            </NavList.Link>
          </NavList.Item>
          <NavList.Item>
            <NavList.Link href="#members">Members</NavList.Link>
          </NavList.Item>
          <NavList.Item>
            <NavList.Link href="#settings">Settings</NavList.Link>
          </NavList.Item>
        </NavList.List>
      </NavList.Root>
    </Frame>
  );
}
