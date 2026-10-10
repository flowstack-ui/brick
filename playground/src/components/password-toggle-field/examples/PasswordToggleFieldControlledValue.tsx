import { useState } from "react";
import { Field, Frame, PasswordToggleField } from "@flowstack-ui/brick";

export function PasswordToggleFieldControlledValue() {
  const [password, setPassword] = useState("");
  return (
    <Frame maxInlineSize="24rem">
      <Field.Root>
        <Field.Label>Password</Field.Label>
        <PasswordToggleField.Root>
          <PasswordToggleField.Input
            autoComplete="current-password"
            onChange={(event) => setPassword(event.currentTarget.value)}
            value={password}
          />
          <PasswordToggleField.Toggle />
        </PasswordToggleField.Root>
        <Field.Description>
          The application owns the value; feedback never echoes it.
        </Field.Description>
      </Field.Root>
    </Frame>
  );
}
