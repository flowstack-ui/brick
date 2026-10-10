import { usePaymentInputs } from "react-payment-inputs";
import { useId } from "react";
import cardImages, { type CardImages } from "react-payment-inputs/images";
import { Field, Frame, Group, Input, VStack } from "@flowstack-ui/brick";
export function InputPayment() {
  const id = useId();
  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs();
  return (
    <Frame maxInlineSize="24rem">
      <VStack gap="4">
        <Field.Root id={id}>
          <Field.Label>Test card details</Field.Label>
          <Group attached orientation="vertical" align="stretch">
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
            <Group attached grow>
              <Input
                {...getExpiryDateProps()}
                id={`${id}-expiry`}
                type="text"
                style={{ borderStartStartRadius: 0, borderStartEndRadius: 0 }}
              />
              <Input
                {...getCVCProps()}
                id={`${id}-cvc`}
                type="text"
                style={{ borderStartStartRadius: 0, borderStartEndRadius: 0 }}
              />
            </Group>
          </Group>
          <Field.Description>
            Formatting demo only. Use synthetic test data; nothing is submitted.
          </Field.Description>
        </Field.Root>
      </VStack>
    </Frame>
  );
}
