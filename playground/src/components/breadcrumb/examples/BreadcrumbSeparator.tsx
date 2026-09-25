import { Breadcrumb } from "@flowstack-ui/brick";

export function BreadcrumbSeparator() {
  return (
    <Breadcrumb.Root aria-label="Separator path">
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#docs">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>/</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#components">Components</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>/</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
