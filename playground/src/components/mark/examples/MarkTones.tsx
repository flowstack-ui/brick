import { For, Mark, Paragraph, VStack } from "@flowstack-ui/brick";
export function MarkTones() {
  return (
    <VStack gap="4">
      <For
        each={
          ["accent", "neutral", "info", "success", "warning", "danger"] as const
        }
      >
        {(tone) => (
          <Paragraph key={tone}>
            Highlight the <Mark tone={tone}>{tone} passage</Mark>.
          </Paragraph>
        )}
      </For>
    </VStack>
  );
}
