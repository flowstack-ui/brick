import {
  For,
  Highlight,
  Paragraph,
  VStack,
  type HighlightVariant,
} from "@flowstack-ui/brick";
const variants: HighlightVariant[] = [
  "subtle",
  "solid",
  "underline",
  "text",
  "plain",
];
export function HighlightVariants() {
  return (
    <VStack gap="4">
      <For each={variants}>
        {(variant) => (
          <Paragraph key={variant}>
            <Highlight query={variant} text={variant} variant={variant} />
          </Paragraph>
        )}
      </For>
    </VStack>
  );
}
