import {
  Badge,
  For,
  HStack,
  Icon,
  VStack,
  type BadgeSize,
} from "@flowstack-ui/brick";
import { Check } from "lucide-react";
export function BadgeIcons() {
  const sizes: BadgeSize[] = ["xs", "sm", "md", "lg"];
  return (
    <VStack gap={4}>
      <For each={sizes}>
        {(size) => (
          <HStack key={size} gap={4} wrap>
            <Badge size={size} tone="success">
              <Icon size="inherit">
                <Check />
              </Icon>
              Verified
            </Badge>
            <Badge size={size} tone="success">
              Verified
              <Icon size="inherit">
                <Check />
              </Icon>
            </Badge>
          </HStack>
        )}
      </For>
    </VStack>
  );
}
