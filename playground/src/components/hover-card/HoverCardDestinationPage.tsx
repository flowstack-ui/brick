import { Button } from "@flowstack-ui/brick";
import "./hover-card-destination.playground.css";

export function HoverCardDestinationPage() {
  const resource =
    new URLSearchParams(window.location.search).get("resource") ?? "preview";

  return (
    <main
      className="hover-card-destination"
      data-testid="hover-card-destination"
    >
      <p>Hover Card destination</p>
      <h1>{resource.replace(/-/g, " ")}</h1>
      <p>
        This focused route confirms that touch and activation preserve the
        trigger link&apos;s native navigation.
      </p>
      <Button asChild>
        <a href="/hover-card">Return to Hover Card</a>
      </Button>
    </main>
  );
}
