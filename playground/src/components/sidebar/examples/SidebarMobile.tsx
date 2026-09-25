import { Button, CloseButton, Drawer, NavList } from "@flowstack-ui/brick";

export function SidebarMobile() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline">Open mobile navigation</Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Workspace navigation</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <NavList.Root aria-label="Mobile workspace">
                <NavList.List>
                  <NavList.Item>
                    <NavList.Link href="#usage">Overview</NavList.Link>
                  </NavList.Item>
                  <NavList.Item>
                    <NavList.Link href="#examples">Projects</NavList.Link>
                  </NavList.Item>
                </NavList.List>
              </NavList.Root>
            </Drawer.Body>
            <Drawer.Close asChild placement="corner">
              <CloseButton aria-label="Close navigation" />
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
