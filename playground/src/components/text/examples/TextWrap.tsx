import { For, Frame, Paragraph, VStack } from "@flowstack-ui/brick";

export function TextWrap() {
  return (
    <Frame maxInlineSize={320}>
      <VStack gap={4}>
        <For each={["wrap", "balance", "pretty"] as const}>
          {(wrap) => (
            <Paragraph key={wrap} wrap={wrap}>
              {wrap}: Thoughtful line breaks make longer descriptions easier to
              read.
            </Paragraph>
          )}
        </For>
        <Paragraph transform="uppercase">
          A deliberate visual transform
        </Paragraph>
      </VStack>
    </Frame>
  );
}
