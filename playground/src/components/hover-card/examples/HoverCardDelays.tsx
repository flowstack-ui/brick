import { HoverCard, Link } from "@flowstack-ui/brick";
export function HoverCardDelays() {
  return (
    <HoverCard.Root openDelay={200} closeDelay={500}>
      <HoverCard.Trigger asChild>
        <Link href="/hover-card/destination?resource=delays">
          Quick preview
        </Link>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content>
          Opens after 200ms; closes after 500ms.
          <HoverCard.Arrow />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
