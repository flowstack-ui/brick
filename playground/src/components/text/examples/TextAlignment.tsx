import { For, Paragraph, VStack } from "@flowstack-ui/brick";

export function TextAlignment() {
  return (
    <VStack gap={4}>
      <For each={["start", "center", "end", "justify"] as const}>
        {(align) => (
          <Paragraph key={align} align={align}>
            {align}: A useful interface keeps information understandable,
            respects the reading direction and allows enough space for
            translated text.
          </Paragraph>
        )}
      </For>
    </VStack>
  );
}
