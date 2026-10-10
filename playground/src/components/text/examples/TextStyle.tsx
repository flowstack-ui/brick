import { For, Paragraph, VStack } from "@flowstack-ui/brick";

export function TextStyle() {
  return (
    <VStack gap={4}>
      <Paragraph fontStyle="italic">
        Italic appearance does not add semantic emphasis.
      </Paragraph>
      <Paragraph numeric="tabular-nums">Tabular numbers: 123,456.78</Paragraph>
      <For each={["solid", "double", "dotted", "dashed", "wavy"] as const}>
        {(decorationStyle) => (
          <Paragraph
            key={decorationStyle}
            decoration="underline"
            decorationStyle={decorationStyle}
          >
            {decorationStyle}
          </Paragraph>
        )}
      </For>
      <Paragraph decoration="line-through">A visual deletion</Paragraph>
      <Paragraph>
        Use <em>em</em> or <strong>strong</strong> when the content needs
        emphasis.
      </Paragraph>
    </VStack>
  );
}
