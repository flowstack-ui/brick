import {
  Avatar,
  For,
  HStack,
  Text,
  VStack,
  type AvatarVariant,
  type AvatarTone,
} from "@flowstack-ui/brick";

const variants: AvatarVariant[] = ["subtle", "solid", "outline"];
const tones: AvatarTone[] = ["neutral", "accent", "contrast"];
export function AvatarRecipes() {
  return (
    <VStack gap="6">
      <For each={variants}>
        {(variant) => (
          <VStack key={variant} gap="3">
            <Text variant="body-sm" tone="secondary">
              {variant}
            </Text>
            <HStack gap="6" wrap="wrap">
              <For each={tones}>
                {(tone) => (
                  <VStack key={tone} gap="2" align="center">
                    <Avatar
                      alt="Ada Lovelace"
                      fallback="AL"
                      tone={tone}
                      variant={variant}
                    />
                    <Text variant="body-sm" tone="secondary">
                      {tone}
                    </Text>
                  </VStack>
                )}
              </For>
            </HStack>
          </VStack>
        )}
      </For>
    </VStack>
  );
}
