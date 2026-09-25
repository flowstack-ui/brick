import { HoverCard, Link } from "@flowstack-ui/brick";
export function HoverCardDismissal() {
  return (
    <HoverCard.Root onPointerDownOutside={(event) => event.preventDefault()}>
      <HoverCard.Trigger asChild>
        <Link href="/hover-card/destination?resource=dismissal">
          Outside event handling
        </Link>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content>
          Outside pointer dismissal is prevented. Escape and leaving the hover
          region still close the preview.
          <HoverCard.Arrow />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
