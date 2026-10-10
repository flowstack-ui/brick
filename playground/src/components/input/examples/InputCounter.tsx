import { useState } from "react";
import { Field, Frame, Input, Text } from "@flowstack-ui/brick";
export function InputCounter() {
  const [value, setValue] = useState("");
  return (
    <Frame maxInlineSize="24rem">
      <Field.Root>
        <Field.Label>Project name</Field.Label>
        <Input
          value={value}
          onValueChange={setValue}
          maxLength={40}
          endAdornment={
            <Text tone="secondary" variant="body-sm" aria-hidden="true">
              {value.length} / 40
            </Text>
          }
        />
        <Field.Description>Use up to 40 characters.</Field.Description>
      </Field.Root>
    </Frame>
  );
}
