import { Field, Frame, Input } from "@flowstack-ui/brick";
export function InputResponsive() {
  return (
    <Frame maxInlineSize="24rem">
      <Field.Root>
        <Field.Label>Project name</Field.Label>
        <Input
          size={{ initial: "lg", md: "md" }}
          variant={{ initial: "outline", md: "subtle" }}
        />
      </Field.Root>
    </Frame>
  );
}
