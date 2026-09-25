import { Controller, useForm } from "react-hook-form";
import {
  RadioGroup,
  HStack,
  VStack,
  Button,
  Fieldset,
} from "@flowstack-ui/brick";

export function RadioGroupHookForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<{ channel: string }>({ defaultValues: { channel: "" } });
  return (
    <form noValidate onSubmit={handleSubmit(() => undefined)}>
      <VStack gap="4">
        <Fieldset.Root invalid={!!errors.channel}>
          <Fieldset.Legend>Preferred contact method</Fieldset.Legend>
          <Controller
            name="channel"
            control={control}
            rules={{ required: "Choose a contact method." }}
            render={({ field }) => (
              <RadioGroup.Root
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
              >
                <RadioGroup.Item value="email" ref={field.ref}>
                  Email
                </RadioGroup.Item>
                <RadioGroup.Item value="sms">Text message</RadioGroup.Item>
              </RadioGroup.Root>
            )}
          />
          <Fieldset.Error>{errors.channel?.message}</Fieldset.Error>
        </Fieldset.Root>
        <HStack gap="2">
          <Button type="submit">{isSubmitSuccessful ? "Saved" : "Save"}</Button>
          <Button variant="outline" onClick={() => reset()}>
            Reset
          </Button>
        </HStack>
      </VStack>
    </form>
  );
}
