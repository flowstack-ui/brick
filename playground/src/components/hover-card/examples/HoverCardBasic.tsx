import {
  Avatar,
  HoverCard,
  HStack,
  Link,
  Paragraph,
  Text,
  VStack,
} from "@flowstack-ui/brick";
export function HoverCardBasic() {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <Link href="/hover-card/destination?resource=ada">Ada Lovelace</Link>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content>
          <HStack align="start" gap={4}>
            <Avatar fallback="AL" alt="" />
            <VStack gap={2}>
              <Text weight="semibold">Ada Lovelace</Text>
              <Paragraph variant="body-sm" tone="secondary">
                Mathematician and early computing author.
              </Paragraph>
              <Text variant="body-sm" tone="secondary">
                Analytical Engine · Research
              </Text>
            </VStack>
          </HStack>
          <HoverCard.Arrow />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
