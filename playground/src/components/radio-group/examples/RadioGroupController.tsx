import {
  RadioGroup,
  HStack,
  VStack,
  Button,
  useRadioGroup,
} from "@flowstack-ui/brick";

export function RadioGroupController() {
  const controller = useRadioGroup({ defaultValue: "email" });
  return (
    <VStack gap="4">
      <RadioGroup.RootProvider
        controller={controller}
        aria-label="Controller channel"
      >
        <RadioGroup.Item value="email">Email</RadioGroup.Item>
        <RadioGroup.Item value="sms">Text message</RadioGroup.Item>
      </RadioGroup.RootProvider>
      <HStack gap="2">
        <Button variant="outline" onClick={() => controller.setValue("sms")}>
          Choose text message
        </Button>
        <Button variant="outline" onClick={controller.reset}>
          Reset
        </Button>
      </HStack>
    </VStack>
  );
}
