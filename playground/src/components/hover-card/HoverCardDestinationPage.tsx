import { Link, Text } from "@flowstack-ui/brick";
import "./hover-card-destination.playground.css";

export function HoverCardDestinationPage() {
  const resource =
    new URLSearchParams(window.location.search).get("resource") ?? "preview";

  return (
    <main
      className="hover-card-destination"
      data-testid="hover-card-destination"
    >
      <Text variant="caption">Hover Card destination</Text>
      <Text as="h1" variant="display">{resource.replace(/-/g, " ")}</Text>
      <Text as="p" tone="secondary">
        This focused route confirms that touch and activation preserve the
        trigger link&apos;s native navigation.
      </Text>
      <Link href="/hover-card">Return to Hover Card</Link>
    </main>
  );
}
