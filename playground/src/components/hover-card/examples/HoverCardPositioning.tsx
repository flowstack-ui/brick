import { HoverCard, Link } from "@flowstack-ui/brick";
export function HoverCardPositioning() {
  return (
    <HoverCard.Root
      positioning={{
        placement: "bottom-start",
        strategy: "fixed",
        gutter: 12,
        sameWidth: true,
        fitViewport: true,
      }}
    >
      <HoverCard.Trigger asChild>
        <Link href="/hover-card/destination?resource=width">
          A preview matching its trigger width
        </Link>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content>
          This preview follows the trigger's width.
          <HoverCard.Arrow />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
