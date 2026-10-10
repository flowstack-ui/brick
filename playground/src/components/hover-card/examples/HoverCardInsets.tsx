import {
  For,
  HoverCard,
  HStack,
  Link,
  Paragraph,
  Text,
  VStack,
} from "@flowstack-ui/brick";
const values = ["xs", "sm", "md", "lg"] as const;
export function HoverCardInsets() {
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
              <HoverCard.Content inset={value}>
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
