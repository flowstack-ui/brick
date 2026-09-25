import {
  For,
  HoverCard,
  HStack,
  Link,
  Paragraph,
  Text,
  VStack,
} from "@flowstack-ui/brick";
const people = [
  {
    id: "ada",
    name: "Ada Lovelace",
    description: "Mathematician and early computing author.",
  },
  {
    id: "grace",
    name: "Grace Hopper",
    description: "Computer scientist and compiler pioneer.",
  },
  {
    id: "katherine",
    name: "Katherine Johnson",
    description: "Mathematician and aerospace researcher.",
  },
];
export function HoverCardMultiple() {
  return (
    <HoverCard.Root>
      <HStack gap={6} wrap="wrap">
        <For each={people}>
          {(person) => (
            <HoverCard.Trigger key={person.id} value={person.id} asChild>
              <Link href={`/hover-card/destination?resource=${person.id}`}>
                {person.name}
              </Link>
            </HoverCard.Trigger>
          )}
        </For>
      </HStack>
      <HoverCard.Portal>
        <HoverCard.Content>
          <HoverCard.Context>
            {({ triggerValue }) => {
              const person = people.find((item) => item.id === triggerValue);
              return (
                <VStack gap={2}>
                  <Text weight="semibold">{person?.name}</Text>
                  <Paragraph variant="body-sm" tone="secondary">
                    {person?.description}
                  </Paragraph>
                </VStack>
              );
            }}
          </HoverCard.Context>
          <HoverCard.Arrow />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
