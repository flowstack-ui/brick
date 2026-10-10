import { Button, For, HStack, Steps } from "@flowstack-ui/brick";
export function StepsOptional() {
  return (
    <Steps.Root count={3} isStepSkippable={(index) => index === 1}>
      <Steps.List aria-label="Profile setup">
        <For each={["Account", "Details (optional)", "Review"]}>
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
