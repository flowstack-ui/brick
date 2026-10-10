import {
  Blockquote,
  For,
  VStack,
  type BlockquoteAlign,
} from "@flowstack-ui/brick";
const alignments: BlockquoteAlign[] = ["start", "center", "end"];
export function BlockquoteAlignment() {
  return (
    <VStack gap="6">
      <For each={alignments}>
        {(align) => (
          <Blockquote.Root key={align} align={align} variant="plain">
            <Blockquote.Icon />
            <Blockquote.Content>
              Good design makes the right choice easier to discover, understand,
              and repeat.
            </Blockquote.Content>
            <Blockquote.Caption>{align}</Blockquote.Caption>
          </Blockquote.Root>
        )}
      </For>
    </VStack>
  );
}
