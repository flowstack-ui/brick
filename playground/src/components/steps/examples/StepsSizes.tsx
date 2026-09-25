import { For, Steps, Text, VStack } from "@flowstack-ui/brick";
export function StepsSizes() {
  return (
    <VStack gap={6}>
      <For each={["xs", "sm", "md", "lg"] as const}>
        {(size) => (
          <VStack key={size} gap={3}>
            <Text>{size}</Text>
            <Steps.Root count={3} defaultStep={1} size={size}>
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
