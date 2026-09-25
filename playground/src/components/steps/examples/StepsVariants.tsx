import { For, Steps, Text, VStack } from "@flowstack-ui/brick";
export function StepsVariants() {
  return (
    <VStack gap={6}>
      <For each={["solid", "subtle"] as const}>
        {(variant) => (
          <VStack key={variant} gap={3}>
            <Text>{variant}</Text>
            <Steps.Root count={3} defaultStep={1} variant={variant}>
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
