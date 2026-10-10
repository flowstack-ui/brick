import { Field, Frame, Textarea } from "@flowstack-ui/brick";

export function TextareaResponsive() {
  return (
    <Frame maxInlineSize="32rem">
      <Field.Root>
        <Field.Label>Responsive notes</Field.Label>
        <Textarea.Root
          size={{ initial: "lg", md: "md" }}
          variant={{ initial: "underline", md: "outline", xl: "subtle" }}
        />
      </Field.Root>
    </Frame>
  );
}
