import { Badge, For, HStack, Icon, type BadgeSize } from "@flowstack-ui/brick";
import { Check } from "lucide-react";
export function BadgeShapes() {
  const sizes: BadgeSize[] = ["xs", "sm", "md", "lg", "xl"];
  return (
    <HStack gap={4} wrap>
      <Badge>Rounded</Badge>
      <Badge shape="pill">Pill</Badge>
      <Badge shape="circle">A</Badge>
      <For each={sizes}>
        {(size) => (
          <Badge key={size} shape="circle" size={size} tone="success">
            <Icon label={`Verified ${size}`} size="inherit">
              <Check />
            </Icon>
          </Badge>
        )}
      </For>
    </HStack>
  );
}
