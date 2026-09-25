import { Badge, For, HStack, type BadgeSize } from "@flowstack-ui/brick";
export function BadgeSizes() {
  const values: BadgeSize[] = ["xs", "sm", "md", "lg", "xl"];
  return (
    <HStack gap={4} wrap>
      <For each={values}>
        {(value) => (
          <Badge key={value} size={value}>
            {value}
          </Badge>
        )}
      </For>
    </HStack>
  );
}
