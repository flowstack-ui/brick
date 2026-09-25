import {
  Avatar,
  For,
  HStack,
  Text,
  VStack,
  type Radius,
} from "@flowstack-ui/brick";

const radii: Radius[] = ["none", "sm", "control", "full"];
export function AvatarRadius() {
  return (
    <HStack gap="6" wrap="wrap">
      <For each={radii}>
        {(radius) => (
          <VStack key={radius} gap="2" align="center">
            <Avatar alt="Ada Lovelace" fallback="AL" radius={radius} />
            <Text variant="body-sm" tone="secondary">
              {radius}
            </Text>
          </VStack>
        )}
      </For>
    </HStack>
  );
}
