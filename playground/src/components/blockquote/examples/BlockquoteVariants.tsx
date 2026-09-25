import {
  Blockquote,
  For,
  Text,
  VStack,
  type BlockquoteVariant,
} from "@flowstack-ui/brick";
const variants: BlockquoteVariant[] = [
  "subtle",
  "solid",
  "surface",
  "plain",
  "accent",
];
export function BlockquoteVariants() {
  return (
    <VStack gap="6">
      <For each={variants}>
        {(variant) => (
          <VStack key={variant} gap="2">
            <Text tone="secondary" variant="body-sm">
              {variant}
            </Text>
            <Blockquote.Root variant={variant} tone="accent">
              <Blockquote.Content>
                Good design makes the right choice easier to discover,
                understand, and repeat.
              </Blockquote.Content>
            </Blockquote.Root>
          </VStack>
        )}
      </For>
    </VStack>
  );
}
