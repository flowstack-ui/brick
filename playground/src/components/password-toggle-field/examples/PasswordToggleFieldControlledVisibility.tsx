import { useState } from "react";
import { Field, Frame, PasswordToggleField, Text } from "@flowstack-ui/brick";

export function PasswordToggleFieldControlledVisibility() {
  const [visible, setVisible] = useState(false);
  return (
    <Frame maxInlineSize="24rem">
      <Field.Root>
        <Field.Label>Password</Field.Label>
        <PasswordToggleField.Root
          onVisibleChange={setVisible}
          visible={visible}
        >
          <PasswordToggleField.Input autoComplete="current-password" />
          <PasswordToggleField.Toggle />
        </PasswordToggleField.Root>
        <output>
          <Text as="span" variant="body-sm" tone="secondary">
            Visibility: {visible ? "shown" : "hidden"}
          </Text>
        </output>
      </Field.Root>
    </Frame>
  );
}
