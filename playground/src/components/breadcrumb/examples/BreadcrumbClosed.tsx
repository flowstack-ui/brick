import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Breadcrumb, For, type BreadcrumbRootProps } from "@flowstack-ui/brick";

type PathItem = { id: string; title: ReactNode; href: string };
export function PathBreadcrumb({
  items,
  separator,
  separatorGap,
  linkCurrent = false,
  ...props
}: BreadcrumbRootProps & {
  items: readonly PathItem[];
  separator?: ReactNode;
  separatorGap?: CSSProperties["gap"];
  linkCurrent?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <Breadcrumb.Root aria-label="Closed path" {...props}>
      <Breadcrumb.List
        style={
          separatorGap === undefined
            ? undefined
            : ({
                "--brick-breadcrumb-list-gap":
                  typeof separatorGap === "number"
                    ? `${separatorGap}px`
                    : separatorGap,
              } as CSSProperties)
        }
      >
        <For each={items}>
          {(item, index) => (
            <Fragment key={item.id}>
              {index > 0 && (
                <Breadcrumb.Separator>{separator}</Breadcrumb.Separator>
              )}
              <Breadcrumb.Item>
                {index < items.length - 1 ? (
                  <Breadcrumb.Link href={item.href}>
                    {item.title}
                  </Breadcrumb.Link>
                ) : linkCurrent ? (
                  <Breadcrumb.Page asChild>
                    <a href={item.href}>{item.title}</a>
                  </Breadcrumb.Page>
                ) : (
                  <Breadcrumb.Page>{item.title}</Breadcrumb.Page>
                )}
              </Breadcrumb.Item>
            </Fragment>
          )}
        </For>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
export function BreadcrumbClosed() {
  return (
    <PathBreadcrumb
      items={[
        { id: "docs", title: "Docs", href: "#docs" },
        { id: "components", title: "Components", href: "#components" },
        { id: "breadcrumb", title: "Breadcrumb", href: "#breadcrumb" },
      ]}
    />
  );
}
