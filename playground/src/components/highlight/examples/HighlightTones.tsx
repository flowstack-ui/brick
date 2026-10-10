import {
  For,
  Highlight,
  HStack,
  Paragraph,
  VStack,
  type HighlightTone,
} from "@flowstack-ui/brick";
const tones: HighlightTone[] = [
  "accent",
  "neutral",
  "info",
  "success",
  "warning",
  "danger",
];
export function HighlightTones() {
  return (
    <VStack gap="4">
      <For each={tones}>
        {(tone) => (
          <HStack key={tone} gap="4" wrap>
            <Paragraph>
              <Highlight text={tone} query={tone} tone={tone} />
            </Paragraph>
            <Paragraph>
              <Highlight text={tone} query={tone} tone={tone} variant="solid" />
            </Paragraph>
          </HStack>
        )}
      </For>
    </VStack>
  );
}
