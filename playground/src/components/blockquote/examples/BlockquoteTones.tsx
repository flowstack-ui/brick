import {
  Blockquote,
  For,
  Text,
  VStack,
  type BlockquoteTone,
} from "@flowstack-ui/brick";
const tones: BlockquoteTone[] = [
  "neutral",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
];
export function BlockquoteTones() {
  return (
    <VStack gap="6">
      <For each={tones}>
        {(tone) => (
          <VStack key={tone} gap="2">
            <Text tone="secondary" variant="body-sm">
              {tone}
            </Text>
            <Blockquote.Root tone={tone}>
              <Blockquote.Icon />
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
