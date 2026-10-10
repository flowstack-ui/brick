import { forwardRef, useState, type AnchorHTMLAttributes } from "react";
import { Breadcrumb, Paragraph, VStack } from "@flowstack-ui/brick";

// A small application router adapter: real routers must likewise retain native links.
const RouteLink = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement> & { navigate: (href: string) => void }
>(function RouteLink({ navigate, href, onClick, ...props }, ref) {
  return (
    <a
      {...props}
      href={href}
      ref={ref}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          props.target === "_blank" ||
          props.download !== undefined ||
          !href
        )
          return;
        event.preventDefault();
        navigate(href);
      }}
    />
  );
});
export function BreadcrumbRouting() {
  const [route, setRoute] = useState("/docs/breadcrumb");
  return (
    <VStack gap={3}>
      <Breadcrumb.Root aria-label="Router path">
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link asChild href="/docs">
              <RouteLink navigate={setRoute}>Docs</RouteLink>
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <Paragraph>Selected route: {route}</Paragraph>
    </VStack>
  );
}
