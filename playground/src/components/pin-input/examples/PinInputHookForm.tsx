import { useState } from "react";
import {
  PinInput,
  VStack,
  HStack,
  Field,
  Text,
  Button,
} from "@flowstack-ui/brick";
import { Controller, useForm } from "react-hook-form";
export function PinInputHookForm() {
  const { control, handleSubmit } = useForm<{ code: string[] }>({
    defaultValues: { code: [] },
  });
  const [message, setMessage] = useState("");
  return (
    <form onSubmit={handleSubmit(() => setMessage("Code submitted"))}>
      <VStack gap={4}>
        <Controller
          name="code"
          control={control}
          rules={{
            validate: (value) =>
              value.filter(Boolean).length === 4 || "Enter four digits",
          }}
          render={({ field, fieldState }) => (
            <Field.Root invalid={fieldState.invalid}>
              <Field.Label>Verification code</Field.Label>
              <PinInput.Root
                length={4}
                name={field.name}
                value={field.value}
                onValueChange={(details) => field.onChange(details.value)}
                onBlur={field.onBlur}
              >
                <PinInput.Control>
                  {[0, 1, 2, 3].map((index) => (
                    <PinInput.Input
                      key={index}
                      index={index}
                      ref={index === 0 ? field.ref : undefined}
                    />
                  ))}
                </PinInput.Control>
              </PinInput.Root>
              <Field.Error>{fieldState.error?.message}</Field.Error>
            </Field.Root>
          )}
        />
        <HStack>
          <Button type="submit">Submit</Button>
        </HStack>
        <Text role="status">{message}</Text>
      </VStack>
    </form>
  );
}
