import { Badge, For, HStack, type BadgeTone } from "@flowstack-ui/brick";
export function BadgeTones() {
  const values: BadgeTone[] = [
    "neutral",
    "accent",
    "info",
    "success",
    "warning",
    "danger",
  ];
  return (
    <HStack gap={4} wrap>
      <For each={values}>
        {(value) => (
          <Badge key={value} tone={value}>
            {value}
          </Badge>
        )}
      </For>
    </HStack>
  );
}
