import {
  Avatar,
  AvatarGroup,
  For,
  HStack,
  Text,
  VStack,
  type AvatarGroupStacking,
} from "@flowstack-ui/brick";

const values: AvatarGroupStacking[] = ["first-on-top", "last-on-top"];
export function AvatarGroupStacking() {
  return (
    <HStack gap="8" wrap="wrap">
      <For each={values}>
        {(stacking) => (
          <VStack key={stacking} gap="3">
            <Text variant="body-sm" tone="secondary">
              {stacking}
            </Text>
            <AvatarGroup stacking={stacking} overlap="lg">
              <Avatar alt="Ada Lovelace" fallback="AL" tone="accent" />
              <Avatar alt="Grace Hopper" fallback="GH" />
              <Avatar alt="Katherine Johnson" fallback="KJ" />
            </AvatarGroup>
          </VStack>
        )}
      </For>
    </HStack>
  );
}
