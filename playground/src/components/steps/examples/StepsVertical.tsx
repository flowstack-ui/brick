import { Button, For, HStack, Steps, Text, VStack } from "@flowstack-ui/brick";
export function StepsVertical() {
  return (
    <Steps.Root
      count={3}
      orientation="vertical"
      layout={{ initial: "stacked", md: "side" }}
    >
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
      <VStack gap={4}>
        <For each={["Account", "Details", "Review"]}>
          {(title, index) => (
            <Steps.Content key={title} index={index}>
              <Text>{title} information</Text>
            </Steps.Content>
          )}
        </For>
        <Steps.CompletedContent aria-label="Complete">
          <Text>Ready.</Text>
        </Steps.CompletedContent>
        <HStack gap={2}>
          <Steps.PrevTrigger asChild>
            <Button size="sm" variant="outline">
              Back
            </Button>
          </Steps.PrevTrigger>
          <Steps.NextTrigger asChild>
            <Button size="sm">Next</Button>
          </Steps.NextTrigger>
        </HStack>
      </VStack>
    </Steps.Root>
  );
}
