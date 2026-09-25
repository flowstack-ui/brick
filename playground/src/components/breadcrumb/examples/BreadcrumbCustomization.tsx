import { Breadcrumb } from "@flowstack-ui/brick";
import type { CSSProperties } from "react";

export function BreadcrumbCustomization() {
  return (
    <Breadcrumb.Root
      aria-label="Customization path"
      variant="underline"
      style={
        {
          "--brick-breadcrumb-foreground": "var(--brick-color-accent-text)",
          "--brick-breadcrumb-decoration-color": "currentColor",
          "--brick-breadcrumb-link-gap": "var(--brick-space-3)",
          "--brick-breadcrumb-current-font-weight":
            "var(--brick-font-weight-medium)",
        } as CSSProperties
      }
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
          <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
