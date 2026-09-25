import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Field,
  Frame,
  HStack,
  Input,
  VStack,
} from "@flowstack-ui/brick";
export function InputHookForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({ defaultValues: { email: "" } });
  return (
    <Frame maxInlineSize="24rem">
      <form onSubmit={handleSubmit(() => undefined)} noValidate>
        <VStack gap="4">
          <Controller
            name="email"
            control={control}
            rules={{ required: "Enter your email address." }}
            render={({ field, fieldState }) => (
              <Field.Root invalid={!!fieldState.error}>
                <Field.Label>Email</Field.Label>
                <Input {...field} type="email" autoComplete="email" />
                <Field.Error>{fieldState.error?.message}</Field.Error>
              </Field.Root>
            )}
          />
          <HStack gap="2">
            <Button type="submit">
              {isSubmitSuccessful ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" onClick={() => reset()}>
              Reset
            </Button>
          </HStack>
        </VStack>
      </form>
    </Frame>
  );
}
