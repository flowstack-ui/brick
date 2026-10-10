import { useState } from "react";
import { RadioGroup } from "@flowstack-ui/brick";

export function RadioGroupControlled() {
  const [value, setValue] = useState("email");
  return (
    <RadioGroup.Root
      aria-label="Preferred channel"
      value={value}
      onValueChange={setValue}
    >
      <RadioGroup.Item value="email">Email</RadioGroup.Item>
      <RadioGroup.Item value="sms">Text message</RadioGroup.Item>
    </RadioGroup.Root>
  );
}
