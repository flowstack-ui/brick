import { Field, Frame, Input, NativeSelect } from "@flowstack-ui/brick";

export function InputDomainSelect() {
  return (
    <Frame maxInlineSize="28rem">
      <Field.Root>
        <Field.Label>Domain name</Field.Label>
        <Input
          placeholder="your-site"
          startAdornment="https://"
          style={{ paddingInlineEnd: 0 }}
          endAdornment={
            <NativeSelect.Root fullWidth={false} variant="plain" size="xs">
              <NativeSelect.Field
                aria-label="Domain extension"
                id="input-domain-extension"
                defaultValue=".com"
              >
                <option>.com</option>
                <option>.org</option>
                <option>.net</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          }
        />
        <Field.Description>
          Choose the extension separately. The address uses HTTPS.
        </Field.Description>
      </Field.Root>
    </Frame>
  );
}
