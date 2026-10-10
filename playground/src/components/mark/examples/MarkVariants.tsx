import { For, Mark, Paragraph, VStack } from "@flowstack-ui/brick";
export function MarkVariants() {
  return (
    <VStack gap="6">
      <For each={["subtle", "solid", "text", "plain"] as const}>
        {(variant) => (
          <Paragraph key={variant}>
            The <Mark variant={variant}>{variant} variant</Mark> marks a
            relevant passage.
          </Paragraph>
        )}
      </For>
    </VStack>
  );
}
