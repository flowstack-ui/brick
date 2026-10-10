import { useState } from "react";
import { passwordStrength } from "check-password-strength";
import {
  Field,
  Frame,
  HStack,
  PasswordToggleField,
  Text,
  VStack,
} from "@flowstack-ui/brick";

function StrengthMeter({
  value,
  max,
  label,
}: {
  value: number;
  max: number;
  label: string;
}) {
  return (
    <VStack gap={2}>
      <HStack aria-hidden="true" className="password-strength-segments" gap={2}>
        {Array.from({ length: max }, (_, index) => (
          <span data-active={index <= value ? "" : undefined} key={index} />
        ))}
      </HStack>
      <meter
        aria-label="Password strength"
        max={max - 1}
        min={0}
        value={Math.max(0, value)}
      />
      <Text variant="body-sm" tone="secondary">
        {label}
      </Text>
    </VStack>
  );
}

export function PasswordToggleFieldStrength() {
  const [password, setPassword] = useState("");
  const result = passwordStrength(password);
  const label = password ? result.value : "No password entered";
  const visualValue = password ? result.id : -1;
  return (
    <Frame maxInlineSize="24rem">
      <Field.Root>
        <Field.Label>New password</Field.Label>
        <PasswordToggleField.Root>
          <PasswordToggleField.Input
            autoComplete="new-password"
            onChange={(event) => setPassword(event.currentTarget.value)}
            value={password}
          />
          <PasswordToggleField.Toggle />
        </PasswordToggleField.Root>
        <StrengthMeter label={label} max={4} value={visualValue} />
        <Field.Description>
          This local heuristic is illustrative, not a security guarantee or
          server policy.
        </Field.Description>
      </Field.Root>
    </Frame>
  );
}
