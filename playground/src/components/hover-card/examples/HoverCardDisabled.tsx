import { HoverCard, Link } from "@flowstack-ui/brick";
export function HoverCardDisabled() {
  return (
    <HoverCard.Root disabled>
      <HoverCard.Trigger asChild>
        <Link href="/hover-card/destination?resource=disabled">
          Visit the full profile
        </Link>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content>This preview will not open.</HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
