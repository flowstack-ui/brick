import { Button, For, HStack, Steps, Text } from "@flowstack-ui/brick";
const stages = ["Account", "Details", "Review"];
export function StepsBasic() {
  return (
    <Steps.Root count={stages.length}>
      <Steps.List aria-label="Setup progress">
        <For each={stages}>
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
      <For each={stages}>
        {(title, index) => (
          <Steps.Content key={title} index={index}>
            <Text>{title} information</Text>
          </Steps.Content>
        )}
      </For>
      <Steps.CompletedContent aria-label="Setup complete">
        <Text>All steps completed.</Text>
      </Steps.CompletedContent>
      <HStack gap={2}>
        <Steps.PrevTrigger asChild>
          <Button variant="outline" size="sm">
            Back
          </Button>
        </Steps.PrevTrigger>
        <Steps.NextTrigger asChild>
          <Button size="sm">Next</Button>
        </Steps.NextTrigger>
      </HStack>
    </Steps.Root>
  );
}
