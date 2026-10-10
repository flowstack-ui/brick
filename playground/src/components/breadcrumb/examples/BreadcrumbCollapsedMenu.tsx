import { Breadcrumb, DropdownMenu, Icon, Link } from "@flowstack-ui/brick";

export function BreadcrumbCollapsedMenu() {
  return (
    <Breadcrumb.Root aria-label="Collapsed path">
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#docs">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Breadcrumb.Trigger aria-label="Show hidden ancestors">
                <Breadcrumb.Ellipsis />
              </Breadcrumb.Trigger>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content>
                <DropdownMenu.Item value="Workspace" asChild>
                  <Link variant="plain" href="#workspace">
                    Workspace
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item value="Library" asChild>
                  <Link variant="plain" href="#library">
                    Library
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item value="Components" asChild>
                  <Link variant="plain" href="#components">
                    Components
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
