import { Frame, NavList } from "@flowstack-ui/brick";

export function NavListComposition() {
  return (
    <Frame maxInlineSize="20rem">
      <NavList.Root aria-label="Composed destinations">
        <NavList.List>
          <NavList.Item>
            <NavList.Link asChild aria-current="page">
              <a href="#composition">Current destination</a>
            </NavList.Link>
          </NavList.Item>
          <NavList.Item>
            <NavList.Link asChild disabled>
              <a href="#unavailable">Unavailable destination</a>
            </NavList.Link>
          </NavList.Item>
        </NavList.List>
      </NavList.Root>
    </Frame>
  );
}
