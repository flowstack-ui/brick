import { Button, Field, Frame, Input, Kbd, VStack } from "@flowstack-ui/brick";
import { useState } from "react";
export function InputElements() {
  const [visible, setVisible] = useState(false);
  return (
    <Frame maxInlineSize="28rem">
      <VStack gap="4">
        <Input
          aria-label="Website"
          startAdornment="https://"
          placeholder="example.com"
        />
        <Input
          aria-label="Search"
          type="search"
          endAdornment={<Kbd>⌘ K</Kbd>}
        />
        <Input
          aria-label="Amount in US dollars"
          inputMode="decimal"
          startAdornment="$"
          endAdornment="USD"
        />
        <Field.Root>
          <Field.Label>API key</Field.Label>
          <Input
            type={visible ? "text" : "password"}
            defaultValue="example-key"
            endAdornment={
              <Button
                size="xs"
                variant="ghost"
                onClick={() => setVisible(!visible)}
              >
                {visible ? "Hide key" : "Show key"}
              </Button>
            }
          />
          <Field.Description>
            The suffix is an independently focusable action.
          </Field.Description>
        </Field.Root>
      </VStack>
    </Frame>
  );
}
