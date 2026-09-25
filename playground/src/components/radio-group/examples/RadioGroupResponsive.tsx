import { useRef } from "react";
import { RadioGroup, VStack, Button } from "@flowstack-ui/brick";

export function RadioGroupResponsive() {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <VStack gap="4">
      <RadioGroup.Root
        aria-label="Responsive delivery"
        size={{ initial: "sm", md: "lg" }}
        variant={{ initial: "subtle", md: "outline" }}
        defaultValue="email"
      >
        <RadioGroup.ItemRoot value="email">
          <RadioGroup.ItemHiddenInput ref={ref} />
          <RadioGroup.ItemControl>
            <RadioGroup.ItemIndicator />
          </RadioGroup.ItemControl>
          <RadioGroup.ItemText>Email</RadioGroup.ItemText>
        </RadioGroup.ItemRoot>
        <RadioGroup.Item value="sms">Text message</RadioGroup.Item>
      </RadioGroup.Root>
      <Button variant="outline" onClick={() => ref.current?.focus()}>
        Focus email
      </Button>
    </VStack>
  );
}
