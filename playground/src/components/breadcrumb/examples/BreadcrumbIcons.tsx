import { Breadcrumb, Icon } from "@flowstack-ui/brick";

export function BreadcrumbIcons() {
  return (
    <Breadcrumb.Root aria-label="Icons path">
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#home">
            <Icon size="inherit">
              <svg viewBox="0 0 24 24">
                <path
                  d="m3 10 9-7 9 7v10h-6v-6H9v6H3Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </Icon>
            Home
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#library">
            Library
            <Icon size="inherit">
              <svg viewBox="0 0 24 24">
                <path
                  d="M7 17 17 7M7 7h10v10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </Icon>
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Design systems</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
