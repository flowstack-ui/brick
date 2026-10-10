import { useState } from "react";
import { Button, For, HStack, Steps, Text } from "@flowstack-ui/brick";
export function StepsValidation() {
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <Steps.Root
      count={3}
      linear
      isStepValid={(index) => index !== 0 || valid}
      onStepInvalid={() => setMessage("Confirm the account before continuing.")}
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
      <Text role="status">
        {message || "Confirm your account to continue."}
      </Text>
      <HStack gap={2}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setValid(true);
            setMessage("Account confirmed.");
          }}
          disabled={valid}
        >
          Confirm account
        </Button>
        <Steps.NextTrigger asChild>
          <Button size="sm">Next</Button>
        </Steps.NextTrigger>
      </HStack>
    </Steps.Root>
  );
}
