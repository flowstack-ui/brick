import { Badge, For, HStack, type BadgeVariant } from "@flowstack-ui/brick";
export function BadgeVariants() {
  const values: BadgeVariant[] = [
    "soft",
    "solid",
    "outline",
    "surface",
    "plain",
  ];
  return (
    <HStack gap={4} wrap>
      <For each={values}>
        {(value) => (
          <Badge key={value} variant={value}>
            {value}
          </Badge>
        )}
      </For>
    </HStack>
  );
}
