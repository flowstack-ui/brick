import { Breadcrumb } from "@flowstack-ui/brick";

export function BreadcrumbCurrent() {
  return (
    <Breadcrumb.Root aria-label="Current path" variant="underline">
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#docs">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#components">Components</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page asChild>
            <a href="#current">Breadcrumb</a>
          </Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
