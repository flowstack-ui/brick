import {
  For,
  HoverCard,
  HStack,
  Link,
  Paragraph,
  Text,
  VStack,
} from "@flowstack-ui/brick";
const values = ["top", "right", "bottom", "left"] as const;
export function HoverCardPlacement() {
  return (
    <HStack gap={6} wrap="wrap">
      <For each={values}>
        {(value) => (
          <HoverCard.Root key={value}>
            <HoverCard.Trigger asChild>
              <Link href={`/hover-card/destination?resource=${value}`}>
                {value}
              </Link>
            </HoverCard.Trigger>
            <HoverCard.Portal>
              <HoverCard.Content side={value}>
                <VStack gap={2}>
                  <Text weight="semibold">{value}</Text>
                  <Paragraph variant="body-sm" tone="secondary">
                    A concise profile preview with a stable destination.
                  </Paragraph>
                </VStack>
                <HoverCard.Arrow />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>
        )}
      </For>
    </HStack>
  );
}
