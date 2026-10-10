import { HoverCard, Link } from "@flowstack-ui/brick";
export function HoverCardRetained() {
  return (
    <HoverCard.Root lazyMount={false} unmountOnExit={false}>
      <HoverCard.Trigger asChild>
        <Link href="/hover-card/destination?resource=retained">
          Retained preview
        </Link>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content>
          The same content remains mounted while hidden.
          <HoverCard.Arrow />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
