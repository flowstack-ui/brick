import { For, Steps, Text, VStack } from "@flowstack-ui/brick";
export function StepsTones() {
  return (
    <VStack gap={6}>
      <For each={["accent", "neutral"] as const}>
        {(tone) => (
          <VStack key={tone} gap={3}>
            <Text>{tone}</Text>
            <Steps.Root count={3} defaultStep={1} tone={tone}>
              <Steps.List aria-label="Workflow">
                <For each={["Account", "Details", "Review"]}>
                  {(title, index) => (
                    <Steps.Item key={title} index={index}>
                      <Steps.Trigger>
                        <Steps.Indicator />
                        <Steps.Title>{title}</Steps.Title>
                      </Steps.Trigger>
                      <Steps.Separator />
                    </Steps.Item>
                  )}
                </For>
              </Steps.List>
            </Steps.Root>
          </VStack>
        )}
      </For>
    </VStack>
  );
}
