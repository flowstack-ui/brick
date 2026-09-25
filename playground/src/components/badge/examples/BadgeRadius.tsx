import { Badge, For, HStack, type Radius } from "@flowstack-ui/brick";
export function BadgeRadius() {
  const values: Radius[] = ["none", "xs", "sm", "md", "control", "full"];
  return (
    <HStack gap={4} wrap>
      <For each={values}>
        {(radius) => (
          <Badge key={radius} radius={radius}>
            {radius}
          </Badge>
        )}
      </For>
    </HStack>
  );
}
