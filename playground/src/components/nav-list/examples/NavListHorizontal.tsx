import { NavList } from "@flowstack-ui/brick";

export function NavListHorizontal() {
  return (
    <NavList.Root
      aria-label="Product pages"
      orientation="horizontal"
      density="compact"
      tone="neutral"
    >
      <NavList.List>
        <NavList.Item>
          <NavList.Link href="#horizontal" active>
            Overview
          </NavList.Link>
        </NavList.Item>
        <NavList.Item>
          <NavList.Link href="#usage">Activity</NavList.Link>
        </NavList.Item>
        <NavList.Item>
          <NavList.Link href="#content">Members</NavList.Link>
        </NavList.Item>
      </NavList.List>
    </NavList.Root>
  );
}
