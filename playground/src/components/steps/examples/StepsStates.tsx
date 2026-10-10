import { For, Steps, Text, VStack } from "@flowstack-ui/brick";
export function StepsStates() {
  return (
    <VStack gap={6}>
      <VStack gap={3}>
        <Text>Disabled</Text>
        <Steps.Root count={3} disabled>
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
      <VStack gap={3}>
        <Text>Completed</Text>
        <Steps.Root count={3} defaultStep={3}>
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
          <Steps.CompletedContent aria-label="Workflow complete">
            <Text>All stages are complete.</Text>
          </Steps.CompletedContent>
        </Steps.Root>
      </VStack>
    </VStack>
  );
}
