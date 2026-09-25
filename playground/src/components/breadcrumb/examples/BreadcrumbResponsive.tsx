import { Breadcrumb, Frame } from "@flowstack-ui/brick";

export function BreadcrumbResponsive() {
  return (
    <Frame maxInlineSize="28rem">
      <Breadcrumb.Root
        aria-label="Responsive path"
        size={{ initial: "sm", md: "lg", xl: "md" }}
        variant={{ initial: "underline", md: "plain" }}
      >
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
            <Breadcrumb.Page>
              An international publishing workspace with a long current title
            </Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </Frame>
  );
}
