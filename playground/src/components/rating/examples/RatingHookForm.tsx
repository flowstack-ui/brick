import { Controller, useForm } from "react-hook-form";
import { Rating, Button, VStack, Text } from "@flowstack-ui/brick";
export function RatingHookForm() {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: { score: 0 },
  });
  return (
    <form onSubmit={handleSubmit(() => {})}>
      <VStack gap="4">
        <Controller
          name="score"
          control={control}
          rules={{ min: { value: 1, message: "Choose a score." } }}
          render={({ field, fieldState }) => (
            <Rating.Root
              ref={field.ref}
              value={field.value}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              invalid={fieldState.invalid}
              aria-describedby={
                fieldState.invalid ? "rating-rhf-error" : undefined
              }
            >
              <Rating.Label>Product rating</Rating.Label>
              <Rating.Control />
            </Rating.Root>
          )}
        />
        <Text id="rating-rhf-error">
          {formState.errors.score?.message ??
            (formState.isSubmitSuccessful
              ? "Saved"
              : "Choose a score to continue.")}
        </Text>
        <Button type="submit">Save rating</Button>
      </VStack>
    </form>
  );
}
