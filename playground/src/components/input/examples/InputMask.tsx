import { useMaskInput } from "use-mask-input";
import { Field, Frame, Input } from "@flowstack-ui/brick";
export function InputMask() {
  const ref = useMaskInput({
    mask: "(999) 999-9999",
    options: {
      showMaskOnHover: false,
      showMaskOnFocus: false,
      positionCaretOnClick: "none",
    },
  });
  return (
    <Frame maxInlineSize="24rem">
      <Field.Root>
        <Field.Label>US phone number</Field.Label>
        <Input
          ref={ref}
          type="tel"
          name="phone"
          autoComplete="tel-national"
          placeholder="(555) 555-0123"
        />
        <Field.Description>
          Use the ten-digit national format. The submitted value includes
          formatting.
        </Field.Description>
      </Field.Root>
    </Frame>
  );
}
