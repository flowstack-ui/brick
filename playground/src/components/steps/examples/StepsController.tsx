import {
  Button,
  For,
  HStack,
  Steps,
  Text,
  useSteps,
} from "@flowstack-ui/brick";
export function StepsController() {
  const steps = useSteps({ count: 3 });
  return (
    <Steps.RootProvider value={steps}>
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
      <Text>{Math.round(steps.percent)}% complete</Text>
      <HStack gap={2}>
        <Button
          size="sm"
          variant="outline"
          disabled={!steps.hasPrevStep}
          onClick={steps.goToPrevStep}
        >
          Back
        </Button>
        <Button
          size="sm"
          disabled={!steps.hasNextStep}
          onClick={steps.goToNextStep}
        >
          Next
        </Button>
        <Button size="sm" variant="ghost" onClick={steps.resetStep}>
          Reset
        </Button>
      </HStack>
    </Steps.RootProvider>
  );
}
