import { For, Steps, VStack } from "@flowstack-ui/brick";
export function StepsDescriptions() {
  return (
    <Steps.Root count={3} defaultStep={1}>
      <Steps.List aria-label="Project setup">
        <For each={["Account", "Details", "Review"]}>
          {(title, index) => (
            <Steps.Item key={title} index={index}>
              <Steps.Trigger>
                <Steps.Indicator />
                <VStack gap={1} align="start">
                  <Steps.Title>{title}</Steps.Title>
                  <Steps.Description>
                    Step {index + 1} details
                  </Steps.Description>
                </VStack>
              </Steps.Trigger>
              <Steps.Separator />
            </Steps.Item>
          )}
        </For>
      </Steps.List>
    </Steps.Root>
  );
}
