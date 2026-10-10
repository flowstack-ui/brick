import { useId } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import cardImages, { type CardImages } from "react-payment-inputs/images";
import { Field, Frame, Input } from "@flowstack-ui/brick";

export function InputCardNumber() {
  const id = useId();
  const { getCardNumberProps, getCardImageProps } = usePaymentInputs();
  return (
    <Frame maxInlineSize="24rem">
      <Field.Root id={id}>
        <Field.Label>Test card number</Field.Label>
        <Input
          {...getCardNumberProps()}
          id={`${id}-control`}
          type="text"
          endAdornment={
            <svg
              {...getCardImageProps({
                images: cardImages as unknown as CardImages,
              })}
              aria-hidden="true"
            />
          }
        />
        <Field.Description>
          Formatting only. Use synthetic test data; nothing is submitted.
        </Field.Description>
      </Field.Root>
    </Frame>
  );
}
