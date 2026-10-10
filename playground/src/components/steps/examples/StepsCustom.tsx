import { Button, For, HStack, Steps } from "@flowstack-ui/brick";
import { Check, Circle } from "lucide-react";
export function StepsCustom() {
  return (
    <Steps.Root count={3} defaultStep={1}>
      <Steps.List aria-label="Custom indicators">
        <For each={["Account", "Details", "Review"]}>
          {(title, index) => (
            <Steps.Item key={title} index={index}>
              <Steps.Trigger>
                <Steps.Indicator radius="control">
                  <Steps.Status
                    complete={<Check aria-hidden="true" />}
                    current={<Steps.Number />}
                    incomplete={<Circle aria-hidden="true" />}
                  />
                </Steps.Indicator>
                <Steps.Title>{title}</Steps.Title>
              </Steps.Trigger>
              <Steps.Separator />
            </Steps.Item>
          )}
        </For>
      </Steps.List>
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
