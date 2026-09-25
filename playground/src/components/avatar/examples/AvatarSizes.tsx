import {
  Avatar,
  For,
  HStack,
  Text,
  VStack,
  type AvatarSize,
} from "@flowstack-ui/brick";

const sizes: AvatarSize[] = [
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
];
export function AvatarSizes() {
  return (
    <HStack gap="6" wrap="wrap">
      <For each={sizes}>
        {(size) => (
          <VStack key={size} gap="2" align="center">
            <Avatar alt="Ada Lovelace" fallback="AL" size={size} />
            <Text variant="body-sm" tone="secondary">
              {size}
            </Text>
          </VStack>
        )}
      </For>
    </HStack>
  );
}
