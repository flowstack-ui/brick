import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Field,
  Form,
  PasswordToggleField,
  Text,
  VStack,
} from "@flowstack-ui/brick";

interface PasswordFormValues {
  registered: string;
  controlled: string;
}

export function PasswordToggleFieldHookForm() {
  const [status, setStatus] = useState("Not submitted");
  const { control, handleSubmit, register, reset } =
    useForm<PasswordFormValues>({
      defaultValues: { controlled: "", registered: "" },
    });
  return (
    <Form
      aria-label="Hook form password example"
      onSubmit={handleSubmit(() => setStatus("Submitted safely"))}
    >
      <VStack gap={5}>
        <Field.Root>
          <Field.Label>Registered password</Field.Label>
          <PasswordToggleField.Root>
            <PasswordToggleField.Input
              autoComplete="current-password"
              {...register("registered", { required: true })}
            />
            <PasswordToggleField.Toggle />
          </PasswordToggleField.Root>
        </Field.Root>
        <Controller
          control={control}
          name="controlled"
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Field.Root invalid={fieldState.invalid}>
              <Field.Label>Controlled password</Field.Label>
              <PasswordToggleField.Root>
                <PasswordToggleField.Input
                  {...field}
                  autoComplete="new-password"
                />
                <PasswordToggleField.Toggle />
              </PasswordToggleField.Root>
              <Field.Error>Enter a controlled password.</Field.Error>
            </Field.Root>
          )}
        />
        <Button type="submit">Sign in</Button>
        <Button type="button" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
        <output>
          <Text as="span" variant="body-sm" tone="secondary">
            {status}
          </Text>
        </output>
      </VStack>
    </Form>
  );
}
