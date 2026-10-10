import { useForm } from "react-hook-form";
import {
  Button,
  Field,
  Frame,
  HStack,
  Textarea,
  VStack,
} from "@flowstack-ui/brick";

type Values = { summary: string };
export function TextareaHookForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Values>({ defaultValues: { summary: "" } });
  return (
    <Frame maxInlineSize="32rem">
      <form noValidate onSubmit={handleSubmit(() => undefined)}>
        <VStack gap="4">
          <Field.Root invalid={!!errors.summary}>
            <Field.Label>Project summary</Field.Label>
            <Textarea.Root
              {...register("summary", {
                required: "Enter a project summary.",
                minLength: {
                  value: 20,
                  message: "Use at least twenty characters.",
                },
              })}
            />
            <Field.Error>{errors.summary?.message}</Field.Error>
          </Field.Root>
          <HStack gap="2">
            <Button type="submit">
              {isSubmitSuccessful ? "Saved" : "Save"}
            </Button>
            <Button type="button" variant="outline" onClick={() => reset()}>
              Reset
            </Button>
          </HStack>
        </VStack>
      </form>
    </Frame>
  );
}
