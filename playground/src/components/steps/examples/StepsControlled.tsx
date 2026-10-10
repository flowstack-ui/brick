import { useState } from "react";
import { Button, For, HStack, Steps, Text } from "@flowstack-ui/brick";
export function StepsControlled() {
  const [step, setStep] = useState(0);
  return (
    <Steps.Root count={3} step={step} onStepChange={setStep}>
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
      <Text>Current stage: {step + 1}</Text>
      <HStack gap={2}>
        <Steps.PrevTrigger asChild>
          <Button variant="outline" size="sm">
            Back
          </Button>
        </Steps.PrevTrigger>
        <Steps.NextTrigger asChild>
          <Button size="sm">Next</Button>
        </Steps.NextTrigger>
        <Button size="sm" variant="ghost" onClick={() => setStep(0)}>
          Reset
        </Button>
      </HStack>
    </Steps.Root>
  );
}
