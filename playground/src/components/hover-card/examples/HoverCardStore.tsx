import {
  Button,
  HoverCard,
  HStack,
  Link,
  useHoverCard,
} from "@flowstack-ui/brick";
export function HoverCardStore() {
  const preview = useHoverCard();
  return (
    <HoverCard.RootProvider value={preview}>
      <HStack gap={4}>
        <HoverCard.Trigger asChild>
          <Link href="/hover-card/destination?resource=store">
            Project notes
          </Link>
        </HoverCard.Trigger>
        <Button
          variant="outline"
          size="sm"
          onClick={() => preview.setOpen(!preview.open)}
        >
          Toggle preview
        </Button>
      </HStack>
      <HoverCard.Portal>
        <HoverCard.Content>
          A controller can also coordinate this passive preview.
          <HoverCard.Arrow />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.RootProvider>
  );
}
