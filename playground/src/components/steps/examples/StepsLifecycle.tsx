import { Button, For, HStack, Input, Steps } from "@flowstack-ui/brick";
export function StepsLifecycle() {
  return (
    <Steps.Root count={3}>
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
      <Steps.Content index={0}>
        <Input
          aria-label="Retained name"
          placeholder="This value is retained"
        />
      </Steps.Content>
      <Steps.Content index={1} keepMounted={false}>
        <Input
          aria-label="Temporary note"
          placeholder="This value resets when leaving"
        />
      </Steps.Content>
      <Steps.Content index={2}>
        <Input aria-label="Review note" placeholder="Review" />
      </Steps.Content>
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
    </Steps.Root>
  );
}
