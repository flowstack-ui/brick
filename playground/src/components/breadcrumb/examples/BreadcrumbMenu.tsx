import { Breadcrumb, DropdownMenu, Icon, Link } from "@flowstack-ui/brick";

export function BreadcrumbMenu() {
  return (
    <Breadcrumb.Root aria-label="Menu path">
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#docs">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Breadcrumb.Trigger>
                Components
                <Icon size="inherit">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="m5 9 7 7 7-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </Icon>
              </Breadcrumb.Trigger>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content>
                <DropdownMenu.Item value="Overview" asChild>
                  <Link variant="plain" href="#overview">
                    Overview
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item value="Components" asChild>
                  <Link variant="plain" href="#components">
                    Components
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item value="Releases" asChild>
                  <Link variant="plain" href="#releases">
                    Releases
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
