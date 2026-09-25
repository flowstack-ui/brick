import { Field, Frame, Input } from "@flowstack-ui/brick";
export function InputClear() {
  return (
    <Frame maxInlineSize="24rem">
      <Field.Root>
        <Field.Label>Search</Field.Label>
        <Input
          type="search"
          clearable
          defaultValue="Design system"
          clearLabel="Clear search"
        />
      </Field.Root>
    </Frame>
  );
}
